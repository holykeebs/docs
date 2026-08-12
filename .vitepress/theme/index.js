import DefaultTheme from 'vitepress/theme'
import HkKeycode from './components/HkKeycode.vue'
import './custom.css'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        // Emitted by the markdown transform in config.mts for `HK_*` inline code.
        app.component('HkKeycode', HkKeycode)
      }
}
