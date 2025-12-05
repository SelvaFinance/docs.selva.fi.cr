// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;
const fs = require('fs');
const path = require('path');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Selva API Documentation',
  tagline: 'Soluciones Electrónicas Locales de Valor',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.selva.fi.cr',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For custom domain, baseUrl should be '/'
  // Note: This configuration is for the custom domain. If accessed via the original
  // GitHub Pages URL (selvafinance.github.io/docs.selva.fi.cr/), assets may not load
  // correctly. The site should be accessed via the custom domain: https://docs.selva.fi.cr
  baseUrl: '/',

  // GitHub pages deployment config.
  organizationName: 'SelvaFinance',
  projectName: 'docs.selva.fi.cr',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  // Use 'warn' instead of 'throw' to allow build with Scalar route
  // Scalar plugin only creates route for default locale, but it's accessible from all locales
  onBrokenLinks: 'warn',

  markdown: {
    hooks: {
      // Note: This is deprecated in Docusaurus 3.x but still required
      // Will be removed in Docusaurus v4
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    localeConfigs: {
      es: {
        label: 'Español',
        direction: 'ltr',
        htmlLang: 'es-CR',
        calendar: 'gregory',
      },
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
        path: 'en',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/SelvaFinance/docs.selva.fi.cr/tree/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    // Scalar plugin for Spanish (default locale)
    [
      '@scalar/docusaurus',
      {
        id: 'scalar-es',
        label: 'API Reference',
        route: '/scalar',
        showNavLink: false,
        configuration: {
          spec: {
            content: fs.readFileSync(
              path.resolve(__dirname, 'static/openapi/openapi-es.yaml'),
              'utf-8'
            ),
          },
          theme: 'default',
          layout: 'modern',
          defaultLanguage: 'es',
        },
      },
    ],
    // Scalar plugin for English locale
    [
      '@scalar/docusaurus',
      {
        id: 'scalar-en',
        label: 'API Reference',
        route: '/en/scalar',
        showNavLink: false,
        configuration: {
          spec: {
            content: fs.readFileSync(
              path.resolve(__dirname, 'static/openapi/openapi-en.yaml'),
              'utf-8'
            ),
          },
          theme: 'default',
          layout: 'modern',
          defaultLanguage: 'en',
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Selva API',
        logo: {
          alt: 'Selva Logo',
          src: '/selva-logo-full.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentación',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/SelvaFinance/docs.selva.fi.cr',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentación',
            items: [
              {
                label: 'Comenzar',
                to: '/docs/getting-started',
              },
              {
                label: 'Referencia de API',
                to: '/docs/api-reference',
              },
            ],
          },
          {
            title: 'Más',
            items: [
              {
                label: 'Selva Finance',
                href: 'https://selvafinance.com',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/SelvaFinance/docs.selva.fi.cr',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Selva Finance. Construido con Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;

