import { defaultTheme } from 'vuepress';
import { defineUserConfig } from 'vuepress';
import { shikiPlugin } from "@vuepress/plugin-shiki";

export default defineUserConfig({
  base: '/',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'TuneFlow Help',
      description: 'TuneFlow Documatation and Help Resources',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'TuneFlow 帮助文档',
      description: 'TuneFlow 介绍，使用指南以及更多资源',
    },
  },
  theme: defaultTheme({
    contributors: true,
    colorMode: 'dark',
    colorModeSwitch: false,
    docsRepo: 'https://github.com/tuneflow/tuneflow-docs',
    docsBranch: 'main',
    docsDir: 'docs',
    editLinkPattern: ':repo/edit/:branch/:path',
    editLink: true,
    lastUpdated: true,
    selectLanguageText: '🌏 Language',
    locales: {
      '/': {
        selectLanguageName: 'English',
        // custom containers
        tip: 'Tips',
        warning: 'Warning',
        danger: 'Danger',
        // 404 page
        notFound: ['Oops, nothing here'],
        backToHome: 'Back to Homepage',
        editLinkText: 'Edit this page',
        contributors: true,
        contributorsText: 'Contributors',
        lastUpdated: true,
        lastUpdatedText: 'Last updated',
        navbar: [
          {
            text: '🛠️ Developers',
            link: '/en/developer/',
          },
          {
            text: '🤔 FAQ',
            link: '/en/faq/',
          },
          {
            text: '📜 Terms',
            link: '/en/terms-of-service/',
          },
        ],
        sidebar: {
          '/en/faq': [
            {
              text: 'Frequently Asked Questions',
              children: ['/en/faq/index.md'],
            },
          ],
          '/en/terms-of-service/': [
            {
              text: 'Terms of Service',
              children: ['/en/terms-of-service/index.md', '/en/terms-of-service/privacy.md'],
            },
            {
              text: 'Copyright and Licenses',
              children: ['/en/terms-of-service/license.md'],
            },
          ],
          '/en/developer/': [
            {
              text: 'Getting Started',
              children: [
                '/en/developer/index.md',
                '/en/developer/concepts.md',
                '/en/developer/how-we-run-plugins.md',
                '/en/developer/data-models.md',
                '/en/developer/create-your-first-plugin.md',
              ],
            },
            {
              text: 'Python Plugin Development',
              children: [
                '/en/developer/getting-started-python.md',
                '/en/developer/python-devguide.md',
                '/en/developer/devkit-python.md',
                '/en/developer/deploy-plugin-python.md',
              ],
            },
          ],
        },
      },
      '/zh/': {
        selectLanguageName: '简体中文',
        // custom containers
        tip: '提示',
        warning: '注意',
        danger: '警告',
        // 404 page
        notFound: ['这里什么都没有'],
        backToHome: '返回首页',
        // a11y
        openInNewWindow: '在新窗口打开',
        toggleColorMode: '切换颜色模式',
        toggleSidebar: '切换侧边栏',
        editLinkText: '编辑此页',
        contributorsText: '贡献者',
        lastUpdatedText: '更新于',
        navbar: [
          {
            text: '🪄 快速上手',
            link: '/zh/getting-started/',
          },
          {
            text: '🎹 编曲与制作',
            link: '/zh/editing-tracks/',
          },
          {
            text: '🛠️ 开发者文档',
            link: '/zh/developer/',
          },
          {
            text: '🤔 常见问题',
            link: '/zh/faq/',
          },
          {
            text: '📜 使用条款',
            link: '/zh/terms-of-service/',
          },
        ],
        sidebar: {
          '/zh/getting-started/': [
            {
              text: '快速上手',
              children: [
                '/zh/getting-started/index.md',
                '/zh/getting-started/create-your-first-song.md',
              ],
            },
          ],
          '/zh/editing-tracks/': [
            {
              text: '编曲与制作',
              children: ['/zh/editing-tracks/index.md'],
            },
          ],
          '/zh/developer/': [
            {
              text: '基本概念',
              children: [
                '/zh/developer/index.md',
                '/zh/developer/concepts.md',
                '/zh/developer/how-we-run-plugins.md',
                '/zh/developer/data-models.md',
                '/zh/developer/create-your-first-plugin.md',
              ],
            },
            {
              text: 'Python 插件开发',
              children: [
                '/zh/developer/getting-started-python.md',
                '/zh/developer/python-devguide.md',
                '/zh/developer/devkit-python.md',
                '/zh/developer/deploy-plugin-python.md',
              ],
            },
          ],
          '/zh/faq': [
            {
              text: '常见问题',
              children: ['/zh/faq/index.md'],
            },
          ],
          '/zh/terms-of-service/': [
            {
              text: '使用条款',
              children: ['/zh/terms-of-service/index.md', '/zh/terms-of-service/privacy.md'],
            },
            {
              text: '版权与许可',
              children: ['/zh/terms-of-service/license.md'],
            },
          ],
        },
      },
    },
    themePlugins: {
      prismjs: false,
    },
  }),
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '60x60',
        href: '/images/favicon_60.png',
      },
    ],
  ],
  plugins: [
    shikiPlugin({
      theme: "one-dark-pro",
    }),
  ],
});
