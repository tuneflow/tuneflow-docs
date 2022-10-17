import { defaultTheme } from 'vuepress';
import { defineUserConfig } from 'vuepress';

export default defineUserConfig({
  base: '/',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'TuneFlow Help',
      description: 'Select your language',
    },
    '/en/': {
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
    contributors: false,
    colorMode: 'dark',
    colorModeSwitch: false,
    locales: {
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
        navbar: [
          {
            text: '快速上手',
            link: '/zh/getting-started/',
          },
          {
            text: '编曲与制作',
            link: '/zh/editing-tracks/',
          },
          {
            text: '常见问题',
            link: '/zh/faq/',
          },
          {
            text: '使用条款',
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
      '/en/': {
        selectLanguageName: 'English',
        navbar: [
          {
            text: 'FAQ',
            link: '/en/faq/',
          },
          {
            text: 'Terms',
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
        },
      },
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
});
