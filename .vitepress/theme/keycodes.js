// HK_* keycode name -> VIA keycode (hex string, as pasted into Remap / VIA's
// "Any" key or Vial's custom keycode field). Single source for the markdown
// transform (which decides what becomes clickable) and the HkKeycode component
// (which copies the code). Mirrors the enum in users/holykeebs/holykeebs.h of
// the holykeebs/qmk-userspace repo; keep in sync when keycodes are added.
const codes = {
  HK_SAVE: '0x7e00',
  HK_RESET: '0x7e01',
  HK_DUMP: '0x7e02',
  HK_P_SET_D: '0x7e03',
  HK_P_SET_S: '0x7e04',
  HK_P_SET_THR: '0x7e05',
  HK_S_MODE: '0x7e06',
  HK_S_MODE_T: '0x7e07',
  HK_D_MODE: '0x7e08',
  HK_D_MODE_T: '0x7e09',
  HK_C_SCROLL: '0x7e0a',
  HK_I_SCROLL: '0x7e0b',
  HK_AML_T: '0x7e0c',
  HK_AML_UP: '0x7e0d',
  HK_AML_DN: '0x7e0e',
  HK_BONGO_T: '0x7e0f',
}

// The long-form names from the enum resolve to the same codes, so prose that
// uses them gets the same treatment.
const longNames = {
  HK_SAVE_SETTINGS: 'HK_SAVE',
  HK_RESET_SETTINGS: 'HK_RESET',
  HK_DUMP_SETTINGS: 'HK_DUMP',
  HK_POINTER_SET_DEFAULT_SENSITIVITY: 'HK_P_SET_D',
  HK_POINTER_SET_SNIPING_SENSITIVITY: 'HK_P_SET_S',
  HK_POINTER_SET_SCROLL_THROTTLE: 'HK_P_SET_THR',
  HK_SNIPING_MODE: 'HK_S_MODE',
  HK_SNIPING_MODE_TOGGLE: 'HK_S_MODE_T',
  HK_DRAGSCROLL_MODE: 'HK_D_MODE',
  HK_DRAGSCROLL_MODE_TOGGLE: 'HK_D_MODE_T',
  HK_CYCLE_SCROLL_LOCK: 'HK_C_SCROLL',
  HK_INVERT_SCROLL_DIRECTION: 'HK_I_SCROLL',
  HK_AUTO_MOUSE_TOGGLE: 'HK_AML_T',
  HK_AUTO_MOUSE_TIMEOUT_UP: 'HK_AML_UP',
  HK_AUTO_MOUSE_TIMEOUT_DOWN: 'HK_AML_DN',
  HK_BONGO_TOGGLE: 'HK_BONGO_T',
}

export const HK_KEYCODES = {
  ...codes,
  ...Object.fromEntries(Object.entries(longNames).map(([long, short]) => [long, codes[short]])),
}
