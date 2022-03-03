<script lang="ts">
	import { t } from '$lib/i18n';
	import { capitalizeFirstLetter } from '$lib/common';

	import MdEmail from 'svelte-icons/md/MdEmail.svelte';
	import GoMarkGithub from 'svelte-icons/go/GoMarkGithub.svelte';
	import FaLinkedin from 'svelte-icons/fa/FaLinkedin.svelte';
	import FaTwitter from 'svelte-icons/fa/FaTwitter.svelte';
	import FaReddit from 'svelte-icons/fa/FaReddit.svelte';
</script>

<svelte:head>
	<title>{$t('common.title')} - {$t('contact.title')}</title>
	<meta name="description" content={$t('contact.meta')} />
</svelte:head>

<h1>{capitalizeFirstLetter($t('contact.title'))}</h1>

<ul>
	<li aria-label="email" class="email">
		<MdEmail /><span><a href="mailto:me@wjtje.ga">me@wjtje.ga</a></span>
	</li>
	<li aria-label="Github" class="github">
		<GoMarkGithub /><span><a href="https://www.github.com/wjtje">wjtje</a></span>
	</li>
	<li aria-label="LinkedIn" class="linkedin">
		<FaLinkedin /><span><a href="https://www.linkedin.com/in/wjtje/">Wouter van der Wal</a></span>
	</li>
	<li aria-label="Reddit" class="reddit">
		<FaReddit /><span><a href="https://www.reddit.com/u/wjtje">u/wjtje</a></span>
	</li>
	<li aria-label="Twitter" class="twitter">
		<FaTwitter /><span><a href="https://twitter.com/wjtje_wal">@wjtje_wal</a></span>
	</li>
</ul>

<style lang="scss">
	h1 {
		@apply text-4xl pb-4;
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
				@apply hover:text-red-600 dark:hover:text-red-500;
			}

			// Define brands with custom styles
			$brands: linkedin, reddit, twitter;

			@each $brand in $brands {
				&.#{$brand} {
					@apply hover:text-#{$brand}-brand;
				}
			}
		}
	}
</style>
