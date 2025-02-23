import container from 'markdown-it-container';
import { defineConfig } from 'vitepress';

export default defineConfig({
	base: '/fecsy/',
	lang: 'en-US',
	title: 'Fecsy',
	description:
		'Multi-threaded Entity Component System framework for TS and JS.',
	lastUpdated: true,

	markdown: {
		config(md) {
			md.use(container, 'only-ts').use(container, 'only-js');
		},
	},

	themeConfig: {
		logo: '/logo_small.png',
		repo: 'felixtrz/fecsy',
		docsDir: 'docs',
		docsBranch: 'main',
		editLinks: true,
		editLinkText: 'Edit this page on GitHub',
		lastUpdated: 'Last updated',

		nav: [
			{ text: 'Guide', link: '/guide/introduction', activeMatch: '^/guide/' },
			// TODO: generate API reference docs
			// {text: 'API Reference', link: '/api', activeMatch: '^/api/'},
			{
				text: 'Community',
				items: [
					{ text: 'Discord', link: 'https://discord.gg/X72ct6hZSr' },
					{
						text: 'Issues',
						link: 'https://github.com/felixtrz/fecsy/issues',
					},
				],
			},
			{
				text: 'Release Notes',
				link: 'https://github.com/felixtrz/fecsy/blob/main/CHANGELOG.md',
			},
		],

		sidebar: {
			'/guide/': getGuideSidebar(),
			'/': getGuideSidebar(),
		},

		// algolia: {
		//   appId: '4K8CJKMVMJ',
		//   apiKey: 'f59a14a50a6e068c1f6e556d76f14861',
		//   indexName: 'Becsy'
		// },
	},
});

function getGuideSidebar() {
	return [
		{
			text: 'Introduction',
			children: [
				{ text: 'What is Fecsy?', link: '/guide/introduction' },
				{ text: 'Getting Started', link: '/guide/getting-started' },
				{ text: 'Deploying', link: '/guide/deploying' },
			],
		},
		{
			text: 'Architecture',
			children: [
				{ text: 'Overview', link: '/guide/architecture/overview' },
				{ text: 'World', link: '/guide/architecture/world' },
				{ text: 'Components', link: '/guide/architecture/components' },
				{ text: 'Entities', link: '/guide/architecture/entities' },
				{ text: 'Systems', link: '/guide/architecture/systems' },
				{ text: 'Queries', link: '/guide/architecture/queries' },
			],
		},
		{
			text: 'Examples',
			children: [
				{ text: 'Overview', link: '/guide/examples/overview' },
				{ text: 'Simple moving box', link: '/guide/examples/simple' },
			],
		},
	];
}
