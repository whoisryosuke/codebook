/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

module.exports = {
  
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // docs folder path relative to website dir.
          path: '../docs',
          // sidebars file relative to website dir.
          sidebarPath: require.resolve('./sidebars.json'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Codebook',
      logo: {
        alt: 'Codebook Logo',
        src: 'img/favicon.png',
      },
      links: [
        {
          to: "docs/getting-started",
          label: "Docs",
          position:'left'
        },
        {
          to: "templates",
          label: "Templates",
          position:'left'
        },
        {
          to: "docs/design-systems/theming/theming-examples",
          label: "Design Systems",
          position:'right'
        },
        {
          to: "docs/js/vanilla/validation",
          label: "JavaScript",
          position:'right'
        },
        {
          to: "docs/js/react/basics",
          label: "React",
          position:'right'
        },
        {
          to: "docs/php/basics",
          label: "PHP",
          position:'right'
        }
      ],
    },
    footer: {
      logo: {
        alt: 'Ryosuke logo',
        src: 'img/logo-ryosuke.svg',
        href: 'https://whoisryosuke.com/',
      },
      copyright: `Copyright © ${new Date().getFullYear()} Ryosuke`,
    },
    image: 'img/favicon.png',
    // When enabled (false), sidebar accordions are always expanded
    // sidebarCollapsible: false,
    
    // Code editor theme
    prism: {
      theme: require('prism-react-renderer/themes/nightOwl'),
    },
  },

  title: "codebook", // Title for your website.
  tagline: "Code snippets and notes by Ryosuke",
  url: "https://code.whoisryosuke.com", // Your website URL
  baseUrl: "/", // Base URL for your project */
  favicon: "img/favicon.ico",

  // // Add custom scripts here that would be placed in <script> tags.
  // scripts: ["https://buttons.github.io/buttons.js"],

  // // On page navigation for the current documentation page.
  // onPageNav: "separate",
  // // No .html extensions for paths.
  // cleanUrl: true,

  // // Open Graph and Twitter card images.
  // ogImage: "img/undraw_online.svg",
  // twitterImage: "img/undraw_tweetstorm.svg",

  // // For sites with a sizable amount of content, set collapsible to true.
  // // Expand/collapse the links and subcategories under categories.
  // docsSideNavCollapsible: true

  // // Show documentation's last contributor's name.
  // // enableUpdateBy: true,

  // // Show documentation's last update time.
  // // enableUpdateTime: true,

  // // You may provide arbitrary config keys to be used as needed by your
  // // template. For example, if you need your repo's URL...
  // //   repoUrl: 'https://github.com/facebook/test-site',
};