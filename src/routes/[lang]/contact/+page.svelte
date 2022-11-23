<script lang="ts">
	import { t } from '$lib/i18n';

	import MdEmail from 'svelte-icons/md/MdEmail.svelte';
	import GoMarkGithub from 'svelte-icons/go/GoMarkGithub.svelte';
	import FaLinkedin from 'svelte-icons/fa/FaLinkedin.svelte';
	import FaTwitter from 'svelte-icons/fa/FaTwitter.svelte';
	import FaReddit from 'svelte-icons/fa/FaReddit.svelte';
	import OsmIcon from '$lib/components/icons/OsmIcon.svelte';
	import DiscordIcon from '$lib/components/icons/DiscordIcon.svelte';
	import MastodonIcon from '$lib/components/icons/MastodonIcon.svelte';
	import FaYoutube from 'svelte-icons/fa/FaYoutube.svelte';
	import ContactLink from '$lib/components/contact/ContactLink.svelte';
	import { LinkType } from '$lib/components/contact/linktype';
</script>

<svelte:head>
	<title>{$t('common.title')} - {$t('contact.title')}</title>
	<meta name="description" content={$t('contact.meta')} />
</svelte:head>

<h1>{$t('contact.title')}</h1>

<p>{$t('contact.description')}</p>

<ul>
	<ContactLink type={LinkType.Discord} username="WJTJE#7243" userid="389862864409853952" />
	<ContactLink type={LinkType.Email} username="me@wjtje.dev" />
	<ContactLink type={LinkType.Github} username="wjtje" />
	<ContactLink type={LinkType.LinkedIn} username="wjtje">Wouter van der Wal</ContactLink>
	<ContactLink type={LinkType.OpenStreetMap} username="wjtje" />
	<ContactLink type={LinkType.Reddit} username="wjtje" />
	<ContactLink type={LinkType.Twitter} username="wjtje_wal" />
	<ContactLink type={LinkType.Mastodon} username="@wjtje@social.wjtje.dev">@wjtje</ContactLink>
	<ContactLink type={LinkType.Youtube} username="wjtje" userid="UCIXqIlnYY016Dn1aSuYvTmg" />
</ul>

<style lang="scss">
	p {
		@apply pb-4;
	}
</style>
