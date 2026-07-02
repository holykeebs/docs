import DefaultTheme from 'vitepress/theme'
import HkKeycode from './components/HkKeycode.vue'
import './custom.css'

export default {
    ...DefaultTheme,
    async enhanceApp({ app }) {
        // Emitted by the markdown transform in config.mts for `HK_*` inline code.
        app.component('HkKeycode', HkKeycode)

        if (!import.meta.env.SSR) {
          const plugin = await import('../../plugins/posthog.js')
          app.use(plugin.default)
        }
      }
}
