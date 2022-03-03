module.exports = {
	content: ['./src/**/*.{html,svelte,ts,js}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'reddit-brand': '#ff4500',
				'twitter-brand': '#009EF7',
				'linkedin-brand': '#0A66C2'
			}
		}
	},
	plugins: [require('tailwindcss-global-dark')]
}
