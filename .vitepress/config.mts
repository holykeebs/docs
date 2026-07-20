import { defineConfig, type HeadConfig } from 'vitepress'
import { KEYCODES } from './theme/keycodes.js'

// Cloudflare Pages sets CF_PAGES=1 during its builds. The docs-next preview
// deploys there, while production docs deploy to GitHub Pages — so keep the
// preview out of search results so it can't compete with the real docs.
const isPreview = process.env.CF_PAGES === '1'

const head: HeadConfig[] = [
  ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
]
if (isPreview) {
  head.push(['meta', { name: 'robots', content: 'noindex, nofollow' }])
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "holykeebs Documentation",
  description: "holykeebs Documentation",
  head,
  lastUpdated: true,
  // Agent context files (symlinks into the qmk checkout), not site pages.
  srcExclude: ['CLAUDE.md', 'AGENTS.md'],
  markdown: {
    config(md) {
      // Emit known custom keycodes (HK_*, Keyball) written as inline code as the
      // HkKeycode component (registered in theme/index.js): clickable, copies the
      // VIA keycode to the clipboard. Everything else renders as regular inline
      // code.
      const defaultRender = md.renderer.rules.code_inline!
      md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
        const content = tokens[idx].content
        if (Object.prototype.hasOwnProperty.call(KEYCODES, content)) {
          return `<HkKeycode name="${content}" />`
        }
        return defaultRender(tokens, idx, options, env, self)
      }
    },
  },
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
