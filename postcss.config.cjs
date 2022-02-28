const postcss_import = require("postcss-import")
const tailwindcss = require("tailwindcss")
const tailwindcss_nesting = require("tailwindcss/nesting")
const autoprefixer = require("autoprefixer")

module.exports = {
	plugins: [
		postcss_import,
		tailwindcss_nesting,
		tailwindcss("./tailwind.config.cjs"),
		autoprefixer,
	],
}