<script lang="ts">
	import { browser } from '$app/environment';
	import { writableLocal } from '$lib/store-localstorage';
	import { NavigationDropdown } from '$lib/components/navigation';
	import { t } from '$lib/i18n';

	// Store the value inside localStorage
	const store = writableLocal('theme', 'system');

	function dropdownAction(e: number) {
		$store = ['light', 'dark', 'system'][e];
	}

	$: {
		if (browser && document) {
			let theme = $store;

			if (theme == 'system') {
				theme =
					window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
						? 'dark'
						: 'light';
			}

			document.documentElement.classList.remove(theme == 'dark' ? 'light' : 'dark');
			document.documentElement.classList.add(theme);
		}
	}
</script>

<NavigationDropdown
	title={$t('navigation.theme')}
	options={[$t('navigation.light'), $t('navigation.dark'), $t('navigation.system')]}
	action={dropdownAction}
	active={['light', 'dark', 'system'].indexOf($store)}
/>
