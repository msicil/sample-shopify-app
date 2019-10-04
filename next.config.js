require('dotenv').config();
const withCSS = require('@zeit/next-css');
const webpack = require('webpack');

const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);

module.exports = withCSS({
	webpack: (config) => {
		const env = { API_KEY: apiKey };
		HACK_removeMinimizeOptionFromCssLoaders(config);
		config.plugins.push(new webpack.DefinePlugin(env));
		return config;
	}
});

function HACK_removeMinimizeOptionFromCssLoaders(config) {
	console.warn('HACK: Removing `minimize` option from `css-loader` entries in Webpack config');
	config.module.rules.forEach((rule) => {
		if (Array.isArray(rule.use)) {
			rule.use.forEach((u) => {
				if (u.loader === 'css-loader' && u.options) {
					delete u.options.minimize;
				}
			});
		}
	});
}
