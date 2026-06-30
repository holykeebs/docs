import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "holykeebs Documentation",
  description: "holykeebs Documentation",
  head: [['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }]],
  lastUpdated: true,
    themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    siteTitle: 'holykeebs',

    editLink: {
      pattern: 'https://github.com/holykeebs/docs/edit/main/:path'
    },

    search: {
      provider: 'local'
    },

    outline: [2, 3],

    sidebar: [
      {
        text: 'Guides',
        items: [
          { text: 'Buyer\'s Guide', link: '/guides/buyers-guide/' },
          {
            text: 'Keyboards',
            items: [
              { text: 'General', link: '/guides/keyboard/' },
              { text: 'Keyball', link: '/guides/keyboard/keyball/' },
              { text: 'Killer Whale', link: '/guides/keyboard/killer-whale/' },
            ]
          },
          {
            text: 'Modules',
            items: [
              { text: 'Touchpad', link: '/guides/touchpad-module/' },
              { text: 'Trackpoint', link: '/guides/trackpoint-module/' },
              { text: 'Trackball', link: '/guides/trackball-module/' },
            ]
          },
          { text: 'Firmware', link: '/firmware/' },
          { text: 'Keymaps', link: '/keymaps/' },
        ]
      },
      {
        text: 'Help',
        items: [
          { text: 'Troubleshooting', link: '/troubleshooting/' },
          { text: 'FAQ', link: '/faq/' },
          { text: 'Contact', link: 'https://holykeebs.com/pages/contact' }
        ]
      },
      { text: 'Recommended Tools', link: '/recommended-tools/' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/holykeebs/docs' }
    ]
  }
})
