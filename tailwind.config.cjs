module.exports = {
	content: ['./src/**/*.{html,svelte,ts,js}'],
	darkMode: 'class',
	theme: {
		extend: {}
	},
	plugins: [require('tailwindcss-global-dark')]
};
