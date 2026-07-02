<script setup>
import { computed, ref, onBeforeUnmount } from 'vue'
import { KEYCODES } from '../keycodes.js'

const props = defineProps({
  name: { type: String, required: true },
})

const code = computed(() => KEYCODES[props.name])
const copied = ref(false)
let hideTimer = null

async function copy() {
  if (!code.value) return
  try {
    await navigator.clipboard.writeText(code.value)
  } catch {
    return
  }
  copied.value = true
  clearTimeout(hideTimer)
  hideTimer = setTimeout(() => (copied.value = false), 1000)
}

onBeforeUnmount(() => clearTimeout(hideTimer))
</script>

<template>
  <code
    class="hk-keycode"
    role="button"
    tabindex="0"
    :title="`Copy ${code} to the clipboard`"
    @click="copy"
    @keydown.enter.prevent="copy"
  >{{ name }}<Transition name="hk-copied"
    ><span v-if="copied" class="hk-copied-pop">Copied</span></Transition
  ></code>
</template>

<style scoped>
.hk-keycode {
  position: relative;
  cursor: pointer;
  border-bottom: 1px dashed var(--vp-c-brand-1);
}

.hk-keycode:hover {
  color: var(--vp-c-brand-1);
}

.hk-copied-pop {
  position: absolute;
  left: 50%;
  bottom: calc(100% + 6px);
  transform: translateX(-50%);
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  font-family: var(--vp-font-family-base);
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
  pointer-events: none;
  z-index: 10;
}

/* Small arrow under the bubble. */
.hk-copied-pop::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: var(--vp-c-brand-1);
}

.hk-copied-enter-active {
  transition: opacity 0.15s ease-out;
}

.hk-copied-leave-active {
  transition: opacity 0.4s ease-in, transform 0.4s ease-in;
}

.hk-copied-enter-from {
  opacity: 0;
}

.hk-copied-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-6px);
}
</style>
