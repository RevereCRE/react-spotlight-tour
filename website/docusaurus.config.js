/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'React Highlights',
  tagline: 'A self-configuring tutorial library for React',
  url: 'https://reverecre.github.io/react-highlights',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'RevereCRE', // Usually your GitHub org/user name.
  projectName: 'react-highlights', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'React Highlights',
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/RevereCRE/react-highlights',
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
            'https://github.com/RevereCRE/react-highlights/edit/main/website/',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/RevereCRE/react-highlights/edit/main/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
