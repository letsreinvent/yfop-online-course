module.exports = {
	corePlugins: {
		container: false,
	},
	plugins: [
		function ({ addComponents }) {
			addComponents({
				'.container': {
					marginLeft: 'auto',
					marginRight: 'auto',
					maxWidth: '100%',
					'@screen sm': {
						maxWidth: '640px',
					},
					'@screen md': {
						maxWidth: '768px',
					},
					'@screen lg': {
						maxWidth: '1024px',
					},
					'@screen xl': {
						maxWidth: '1180px',
					},
				},
			});
		},
	],
	variants: {
		borderWidth: ['responsive', 'last', 'hover', 'focus'],
	},
	purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.js',
    './node_modules/@coursemaker/**/*.html',
    './node_modules/@coursemaker/**/*.vue',
    './node_modules/@coursemaker/**/*.js',
    './node_modules/gatsby-plugin-*/**/*.html',
    './node_modules/gatsby-plugin-*/**/*.vue',
    './node_modules/gatsby-plugin-*/**/*.js',
  ],
};
