/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'React Spotlight Tour',
  tagline: 'Self-configuring product tour library for React',
  url: 'https://reverecre.github.io/react-spotlight-tour',
  baseUrl: '/react-spotlight-tour/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'RevereCRE', // Usually your GitHub org/user name.
  projectName: 'react-spotlight-tour', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'React Spotlight Tour',
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/RevereCRE/react-spotlight-tour',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Revere CRE, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/RevereCRE/react-spotlight-tour/edit/main/website/',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/RevereCRE/react-spotlight-tour/edit/main/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
