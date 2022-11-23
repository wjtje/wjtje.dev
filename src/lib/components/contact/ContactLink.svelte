<script lang="ts">
	import FaLinkedin from 'svelte-icons/fa/FaLinkedin.svelte';
	import FaReddit from 'svelte-icons/fa/FaReddit.svelte';
	import FaTwitter from 'svelte-icons/fa/FaTwitter.svelte';
	import FaYoutube from 'svelte-icons/fa/FaYoutube.svelte';
	import GoMarkGithub from 'svelte-icons/go/GoMarkGithub.svelte';
	import MdEmail from 'svelte-icons/md/MdEmail.svelte';
	import { bind } from 'svelte/internal';
	import DiscordIcon from '../icons/DiscordIcon.svelte';
	import MastodonIcon from '../icons/MastodonIcon.svelte';
	import OsmIcon from '../icons/OsmIcon.svelte';
	import { LinkType } from './linktype';
	import PostPopover from './PostPopover.svelte';

	export let type: LinkType;
	export let username: string;
	export let userid: string = '';

	let link: string;
	let text: string;
	let icon: any;
	let title: string;
	let popover: boolean = false;

	let postpopover: PostPopover;

	switch (type) {
		case LinkType.Discord:
			link = `https://discord.com/users/${userid}`;
			text = username;
			icon = DiscordIcon;
			title = 'Discord';
			break;
		case LinkType.Email:
			link = `mailto:${username}`;
			text = username;
			icon = MdEmail;
			title = 'E-mail';
			break;
		case LinkType.Github:
			link = `https://github.com/${username}`;
			text = username;
			icon = GoMarkGithub;
			title = 'Github';
			break;
		case LinkType.LinkedIn:
			link = `https://www.linkedin.com/in/${username}`;
			text = username;
			icon = FaLinkedin;
			title = 'LinkedIn';
			break;
		case LinkType.OpenStreetMap:
			link = `https://www.openstreetmap.org/user/${username}`;
			text = username;
			icon = OsmIcon;
			title = 'OpenStreetMap';
			break;
		case LinkType.Reddit:
			link = `https://www.reddit.com/user/${username}`;
			text = `u/${username}`;
			icon = FaReddit;
			title = 'Reddit';
			break;
		case LinkType.Twitter:
			link = `https://twitter.com/${username}`;
			text = `@${username}`;
			icon = FaTwitter;
			title = 'Twitter';
			popover = true;
			break;
		case LinkType.Mastodon:
			// TODO: Add support for instances using a different domain via webfinger
			link = `https://${username.substring(1).split('@')[1]}/@${
				username.substring(1).split('@')[0]
			}`;
			text = `${username}`;
			icon = MastodonIcon;
			title = 'Mastodon';
			break;
		case LinkType.Youtube:
			link = `https://www.youtube.com/channel/${userid}`;
			text = username;
			icon = FaYoutube;
			title = 'Youtube';
			break;
		default:
			link = '';
			text = username;
			icon = null;
			title = '';
	}
</script>

<li
	class={type}
	on:mouseenter={postpopover.toggle}
	on:mouseleave={postpopover.toggle}
	on:focus={postpopover.toggle}
	on:blur={postpopover.toggle}
>
	<svelte:component this={icon} {title} />
	<span><a href={link}><slot>{text}</slot></a></span>
	{#if popover}
		<PostPopover bind:this={postpopover} {type} />
	{/if}
</li>

<style lang="scss">
	li {
		@apply h-8 flex flex-row gap-2 items-center mb-2 transition-[color] duration-200 w-auto;
		:global(svg) {
			@apply h-8 w-8 p-1 fill-current;
		}
		span {
			@apply h-auto whitespace-nowrap;
		}
		// Custom hover effects
		&.email {
			@apply hover:text-red-600 gdark:hover:text-red-500;
		}
		// Define brands with custom styles
		$brands: discord, osm, mastodon, linkedin, reddit, twitter, youtube;
		@each $brand in $brands {
			&.#{$brand} {
				@apply #{'hover:text-' + $brand + '-brand'};
			}
		}
	}
</style>
