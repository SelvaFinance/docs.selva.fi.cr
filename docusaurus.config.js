// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer").themes.github;
const darkCodeTheme = require("prism-react-renderer").themes.dracula;
const fs = require("fs");
const path = require("path");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Selva API Documentation",
  tagline: "Soluciones Electrónicas Locales de Valor",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://docs.selva.fi.cr",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For custom domain, baseUrl should be '/'
  // Note: This configuration is for the custom domain. If accessed via the original
  // GitHub Pages URL (selvafinance.github.io/docs.selva.fi.cr/), assets may not load
  // correctly. The site should be accessed via the custom domain: https://docs.selva.fi.cr
  baseUrl: "/",

  // GitHub pages deployment config.
  organizationName: "SelvaFinance",
  projectName: "docs.selva.fi.cr",
  deploymentBranch: "gh-pages",
  trailingSlash: false,

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "ignore",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
    localeConfigs: {
      en: {
        htmlLang: "en",
        label: "English",
      },
    },
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/SelvaFinance/docs.selva.fi.cr/tree/main/",
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  plugins: [
    [
      "@scalar/docusaurus",
      {
        label: "API Reference",
        route: "/api-reference",
        showNavLink: false,
        configuration: {
          spec: {
            content: fs.readFileSync(
              path.resolve(__dirname, "static/openapi/openapi.yaml"),
              "utf-8",
            ),
          },
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Selva API",
        logo: {
          alt: "Selva Logo",
          src: "selva-logo-full.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Developer Guide",
          },
          {
            to: "/docs/mcp",
            label: "MCP (Coming soon)",
            position: "left",
          },
          {
            to: "/docs/release-notes",
            label: "Release Notes",
            position: "left",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          // {
          //   title: "Documentation",
          //   items: [
          //     {
          //       label: "Getting Started",
          //       to: "/docs/getting-started",
          //     },
          //     {
          //       label: "API Reference",
          //       to: "/api-reference",
          //     },
          //   ],
          // },
          // {
          //   title: "More",
          //   items: [],
          // },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Selva Finance.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
