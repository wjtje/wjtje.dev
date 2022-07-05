import { checkCacheState, type RemoteData } from '$lib/api/helper';
import { OSMUsername } from '$lib/common';
import { prisma } from '$lib/prisma';
import type { RequestHandler } from './__types/osm.json';
import { XMLParser } from 'fast-xml-parser';
import type { Changeset, OsmRootObject, ParsedTags } from '$lib/@types/osm';
import { parseOsmEditor } from '$lib/api/parseOsmEditor';

export const get: RequestHandler = async () => {
	// Get information about the cache
	const { id, cacheState } = await checkCacheState('osm');

	if (!cacheState) {
		// Remove old cache
		await prisma.remoteData.deleteMany({
			where: {
				remoteSource: {
					name: 'osm'
				}
			}
		});

		// Get new data from osm
		const response = await fetch(
			`https://api.allorigins.win/get?url=${encodeURIComponent(
				`https://openstreetmap.org/api/0.6/changesets?display_name=${OSMUsername}`
			)}`
		);

		const parser = new XMLParser({
			ignoreAttributes: false
		});

		const osmXml: OsmRootObject = parser.parse(String((await response.json())?.contents) ?? '');

		// Parse the data
		const responseChangesets: Changeset[] = [];

		const length = osmXml.osm.changeset.length < 10 ? osmXml.osm.changeset.length : 10;

		for (let i = 0; i < length; i++) {
			const changeset = osmXml.osm.changeset[i];
			const tags: ParsedTags = {
				comment: '',
				created_by: {
					name: 'Unknown editor'
				},
				source: ''
			};

			changeset.tag.forEach((element) => {
				if (element['@_k'] === 'created_by') {
					tags.created_by = parseOsmEditor(element['@_v']);
				} else {
					tags[element['@_k']] = element['@_v'];
				}
			});

			responseChangesets.push({
				...changeset,
				parsedTags: tags as ParsedTags
			});
		}

		// Save the data in the cache
		await Promise.all(
			responseChangesets.map(async (changeset) => {
				// Create base object
				const data: RemoteData = {
					date: changeset['@_created_at'],
					mainTitle: changeset.parsedTags.comment,
					subTitle: {
						id: 'OsmActivity.defaultText',
						data: {
							id: changeset['@_id'],
							editor: changeset.parsedTags.created_by.name,
							version: changeset.parsedTags.created_by.version
						}
					}
				};

				// Generate correct data for each editor
				switch (changeset.parsedTags.created_by.name) {
					case 'MapComplete':
						data.mainTitle = {
							id: 'OsmActivity.editor.MapComplete.mainText',
							data: {
								count: changeset.parsedTags.answer,
								theme: changeset.parsedTags.theme,
								host: changeset.parsedTags.host
							}
						};
						data.subTitle = {
							id: 'OsmActivity.editor.MapComplete.subText',
							data: {
								id: changeset['@_id'],
								version: changeset.parsedTags.created_by.version
							}
						};
						break;
					case 'StreetComplete':
						data.subTitle = {
							id: 'OsmActivity.editor.StreetComplete.subText',
							data: {
								id: changeset['@_id'],
								version: changeset.parsedTags.created_by.version
							}
						};
						break;
				}

				// Save object inside database
				await prisma.remoteData.create({
					data: {
						date: data.date,
						mainTitle: JSON.stringify(data.mainTitle),
						subTitle: JSON.stringify(data.subTitle),
						image: data.image,
						remoteSourceId: id
					}
				});
			})
		);
	}

	return {
		body: await prisma.remoteData.findMany({
			where: {
				remoteSourceId: id
			},
			take: 10,
			select: {
				mainTitle: true,
				subTitle: true,
				date: true
			},
			orderBy: {
				date: 'desc'
			}
		})
	};
};
