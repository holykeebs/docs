
<script setup>
import { ref, computed } from 'vue'

const keyboards = ["Corne", "Sweep", "Span", "Lily58", "Keyball39", "Keyball44", "Keyball61", "Keyball61+"]
const controller_option = ["None", "OLED", "TPS43", "Trackpoint", "Cirque35", "Cirque40", "Pimoroni Trackball"]

const selected_keyboard = ref(keyboards[0])
const selected_left_controller = ref(controller_option[0])
const selected_right_controller = ref(controller_option[0])

function isPointingDevice(controller) {
    // Check if there's a pointing device on the controller.
    return controller === "TPS43" || controller === "Trackpoint" || controller === "Cirque35" || controller === "Cirque40" || controller === "Pimoroni Trackball";
}

// Mirrors the file names build_all.py produces (holykeebs/qmk_firmware).
const keyboardToQmkName = {
    "Corne": "holykeebs_corne",
    "Sweep": "holykeebs_sweeq",
    "Span": "holykeebs_spankbd",
    "Lily58": "holykeebs_lily58",
    "Keyball39": "holykeebs_keyball39",
    "Keyball44": "holykeebs_keyball44",
    "Keyball61": "holykeebs_keyball61",
    "Keyball61+": "holykeebs_keyball61plus"
}

const pointingToFileName = {
    "None": "none",
    "OLED": "oled",
    "TPS43": "tps43",
    "Trackpoint": "trackpoint",
    "Cirque35": "cirque35",
    "Cirque40": "cirque40",
    "Pimoroni Trackball": "trackball"
}

const hasPointingDevice = computed(() =>
    isPointingDevice(selected_left_controller.value) || isPointingDevice(selected_right_controller.value));

// The Keyballs have no build-time options: dual trackball support and the OLED
// are always compiled in, and the halves are runtime-detected, so they are one
// image each.
const isKeyball = computed(() => selected_keyboard.value.startsWith("Keyball"));

// Combinations the firmware matrix doesn't build (no precompiled file exists).
const unsupportedCombo = computed(() => {
    // Keyballs ignore the controller selection entirely, so no combination is
    // unsupported for them.
    if (isKeyball.value) return false;
    const pair = [selected_left_controller.value, selected_right_controller.value];
    return pair.includes("Cirque35") && pair.includes("Cirque40");
});

const firmwareName = computed(() => {
    const kb = keyboardToQmkName[selected_keyboard.value];

    // Every released image is the vial keymap.
    if (isKeyball.value) {
        return [`${kb}_vial_oled.uf2`];
    }

    // Without a pointing device the file has a single none/oled slot.
    if (!hasPointingDevice.value) {
        const oled = selected_left_controller.value === "OLED" || selected_right_controller.value === "OLED";
        return [`${kb}_vial_${oled ? "oled" : "none"}.uf2`];
    }

    const base_name = `${kb}_vial_${pointingToFileName[selected_left_controller.value]}_${pointingToFileName[selected_right_controller.value]}`;

    // We have a firmware per side.
    if (isPointingDevice(selected_left_controller.value) && isPointingDevice(selected_right_controller.value)) {
        return [`${base_name}_flash_on_left.uf2`, `${base_name}_flash_on_right.uf2`];
    }
    return [`${base_name}.uf2`];
})

function firmwareDownloadUrl(file_name) {
  return `https://github.com/holykeebs/qmk_compiled/releases/download/latest/${file_name}`
}
</script>
<template>
<div class="field">
  <label class="label">
    Keyboard
    <select name="keyboard" v-model="selected_keyboard">
      <option :value="kind" v-for="kind in keyboards">{{ kind }}</option>
    </select>
  </label>
</div>

<div class="field" v-if="!isKeyball">
  <label class="label">
    Left Controller Has
    <select name="left_controller" v-model="selected_left_controller">
      <option :value="kind" v-for="kind in controller_option">{{ kind }}</option>
    </select>
  </label>
</div>

<div class="field" v-if="!isKeyball">
  <label class="label">
    Right Controller Has
    <select name="right_controller" v-model="selected_right_controller">
      <option :value="kind" v-for="kind in controller_option">{{ kind }}</option>
    </select>
  </label>
</div>

<p v-if="unsupportedCombo">
  This combination isn't available as a precompiled firmware. Pick the same touchpad size on both sides, or reach out if you need this configuration.
</p>
<p v-else>
  To flash, we need to get into the bootloader and copy <a :href="firmwareDownloadUrl(firmwareName[0])" download>{{ firmwareName[0] }}</a>
  <span v-if="firmwareName.length > 1"> (flashed on the left side), <a :href="firmwareDownloadUrl(firmwareName[1])" download>{{ firmwareName[1] }}</a> (flashed on the right side)</span>
  into the USB drive called <code>RPI-RP2</code>. After copying, the drive should disappear and the firmware will have updated. Then open the <a href="https://get.vial.today/">Vial app</a> to edit the keymap.
</p>
</template>

<style scoped>
.field {
  margin-bottom: 0.75rem;
}

.label {
  display: block;
  font-weight: 600;
}

.label select {
  display: block;
  margin-top: 0.4em;
  padding: 0.4em 2.2em 0.4em 0.8em;
  font-size: 0.95em;
  font-weight: 400;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' d='M1 1.5 6 6.5 11 1.5'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.8em center;
  cursor: pointer;
}

.label select:hover,
.label select:focus {
  border-color: var(--vp-c-brand-1);
}

.help {
  margin: 0.25em 0 0.5em;
  font-size: 0.875em;
  color: var(--vp-c-text-2);
}

.radio {
  margin-right: 1.25em;
  cursor: pointer;
}

.radio input {
  margin-right: 0.35em;
  cursor: pointer;
}
</style>
