module.exports = {
	content: ['./src/**/*.{html,svelte,ts,js}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'discord-brand': '#5865F2', // https://discord.com/branding
				'mastodon-brand': '#5C50E6',
				'osm-brand': '#7ebc6f',
				'reddit-brand': '#ff4500', // https://www.redditinc.com/brand
				'twitter-brand': '#009EF7', // https://about.twitter.com/en/who-we-are/brand-toolkit
				'linkedin-brand': '#0A66C2', // https://brand.linkedin.com/
				'youtube-brand': '#FF0000' // https://www.youtube.com/brand
			}
		}
	},
	plugins: [require('tailwindcss-global-dark')]
};
