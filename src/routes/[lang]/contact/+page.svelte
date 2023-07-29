<script lang="ts">
	import { t } from '$lib/i18n';

	import MdEmail from 'svelte-icons/md/MdEmail.svelte';
	import GoMarkGithub from 'svelte-icons/go/GoMarkGithub.svelte';
	import FaLinkedin from 'svelte-icons/fa/FaLinkedin.svelte';
	import FaReddit from 'svelte-icons/fa/FaReddit.svelte';
	import OsmIcon from '$lib/components/icons/OsmIcon.svelte';
	import DiscordIcon from '$lib/components/icons/DiscordIcon.svelte';
	import MastodonIcon from '$lib/components/icons/MastodonIcon.svelte';
	import FaYoutube from 'svelte-icons/fa/FaYoutube.svelte';
	import MatrixIcon from '$lib/components/icons/MatrixIcon.svelte';
</script>

<svelte:head>
	<title>{$t('common.title')} - {$t('contact.title')}</title>
	<meta name="description" content={$t('contact.meta')} />
</svelte:head>

<h1>{$t('contact.title')}</h1>

<p>{$t('contact.description')}</p>

<ul>
	<li class="email">
		<MdEmail title="email" />
		<span><a href="mailto:me@wjtje.dev">me@wjtje.dev</a></span>
	</li>
	<li class="github">
		<GoMarkGithub title="Github" />
		<span><a href="https://www.github.com/wjtje">wjtje</a></span>
	</li>
	<li class="linkedin">
		<FaLinkedin title="LinkedIn" />
		<span><a href="https://www.linkedin.com/in/wjtje/">Wouter van der Wal</a></span>
	</li>
	<li class="mastodon">
		<MastodonIcon />
		<span><a rel="me" href="https://social.wjtje.dev/@wjtje">@wjtje@wjtje.dev</a></span>
	</li>
	<li class="matrix">
		<MatrixIcon />
		<span><a href="https://matrix.to/#/@wjtje:wjtje.dev">@wjtje:wjtje.dev</a></span>
	</li>
	<li class="osm">
		<OsmIcon />
		<span><a href="https://www.openstreetmap.org/user/wjtje">wjtje</a></span>
	</li>
	<li class="reddit">
		<FaReddit title="Reddit" /><span><a href="https://www.reddit.com/u/wjtje">u/wjtje</a></span>
	</li>
</ul>

<br />

<ul>
	<li class="discord">
		<DiscordIcon />
		<span><a href="https://discord.com/users/389862864409853952">wjtje</a></span>
	</li>
	<li class="youtube">
		<FaYoutube title="Youtube" />
		<span><a href="https://www.youtube.com/channel/UCIXqIlnYY016Dn1aSuYvTmg">wjtje</a></span>
	</li>
</ul>

<style lang="scss">
	p {
		@apply pb-4;
	}

	ul {
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
			$brands: discord, osm, mastodon, linkedin, reddit, youtube;
			@each $brand in $brands {
				&.#{$brand} {
					@apply #{'hover:text-' + $brand + '-brand'};
				}
			}
		}
	}
</style>
