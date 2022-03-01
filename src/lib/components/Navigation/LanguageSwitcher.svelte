<script lang="ts">
	import Dropdown from '../Dropdown.svelte';
	import { t, locale, locales } from '$lib/i18n';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	$: ({ route } = $page.stuff);
	let active = 0;

	$: {
		$locales.forEach((lc, index) => {
			if (lc == $locale) {
				active = index;
			}
		});
	}

	function dropdownAction(e: number) {
		goto(`/${$locales[e]}${route}`, { noscroll: true });
	}
</script>

<Dropdown
	title={$t('navigation.language')}
	options={$locales.map((lc) => {
		return $t(`lang.${lc}`);
	})}
	action={dropdownAction}
	{active}
/>
