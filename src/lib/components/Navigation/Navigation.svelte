<nav>
	<slot />
</nav>

<style lang="scss">
	nav {
		// Position the navbar at the top of the screen
		@apply sticky top-0 left-0 w-full h-12 z-10;
		// Position the children at the center of the navigation bar
		@apply flex items-center gap-4 px-6;

		@apply border-b-2;
		@apply bg-green-600 border-green-500 text-white;
		@apply gdark:bg-green-700 gdark:border-green-600;
	}
</style>
