<script setup>
import NameGenerator from './NameGenerator.vue'
</script>

# Firmware

[QMK](https://docs.qmk.fm/#/) is a popular free and open-source keyboard firmware. All of our keyboards run it, with [Vial](https://get.vial.today/) for dynamic key assignments and layering: a desktop app that edits your keymap live over USB. The firmware provides features that streamline pointing device usage, which is a focus of the store. These include:

- sensitivity: adjusts how far the cursor moves for a given motion of the pointing device. Useful for large screens or cases where fine grained movement is necessary. Supports two modes, default and "sniping", each with its own sensitivity. How it's applied is device dependent: a software movement factor, or the hardware CPI on sensors that support it.
- drag scroll mode: convert mouse moves into scrolling (similar to middle mouse click).
- scroll throttle: slows down scrolling for more control.
- scroll lock: constraints scrolling to vertical / horizontal only.

All of the above can be adjusted on the fly without flashing a new firmware. See [below](#features) for a more in-depth walkthrough.

::: details Killer Whale
The Killer Whale has a firmware specific to it with similar features as above.
:::

::: info
Fully built keyboards already come flashed and tested. You can use these instructions to learn how to flash your own keymap / custom logic onto the standard firmware we provide.
:::

::: danger
Avoid connecting / disconnecting the TRRS cable when the keyboard is powered. This can short the GPIO pins of the controllers.
:::

## Source Code

The precompiled firmware is built from the `hk-master` branch of https://github.com/holykeebs/vial-qmk, our fork of Vial's QMK. The same keyboards also live on the `hk-master` branch of https://github.com/holykeebs/qmk_firmware, which tracks main QMK more closely and builds the [VIA](#via) variant.

The custom logic lives in two places:

- The shared, cross-keyboard logic is in `users/holykeebs`, which is kept in a separate [QMK External Userspace](https://docs.qmk.fm/newbs_external_userspace) overlay repository (https://github.com/holykeebs/qmk-userspace), shared across both forks.
- The per-keyboard code lives under `keyboards/holykeebs/<keyboard>`, identical in both forks apart from the keymaps.

Some scaffolding changes were also required in core QMK, but these are quite limited.

If you wish to bring the changes into your own fork of QMK, please make sure you've copied them all from **both** repositories. The diff for the core / keyboard changes can be obtained as follows:

```shell
$ git remote add holykeebs git@github.com:holykeebs/qmk_firmware.git
$ git diff holykeebs/master...holykeebs/hk-master
```

The userspace changes are simply the entire contents of the [overlay repository](https://github.com/holykeebs/qmk-userspace).

## Precompiled

Precompiled firmwares for all possible configurations are available [here](https://github.com/holykeebs/qmk_compiled/releases/tag/latest). Each file is named according to its configuration and is configured with the [Vial app](https://get.vial.today/). Change the selection below to match your keyboard:

<NameGenerator />

To enter the bootloader, try these steps:

1. Double tapping the reset button on your keyboard twice.
1. If you've changed your firmware and the reset button does not seem to be working, try [binding a key on the keyboard](/troubleshooting/#reset-button-doesnt-go-into-bootloader).
1. If that doesn't work, locate the two buttons on the components side of the controller: hold the one labeled BOOT and then press the RESET button next to it.

The [commands.txt](https://github.com/holykeebs/qmk_compiled/releases/download/latest/commands.txt) has a list of file name to the make command that produced it and can be used as a reference.

::: danger
Avoid connecting / disconnecting the TRRS cable when the keyboard is powered. This can short the GPIO pins of the controllers.
:::

## Compiling

Since many of our keyboards share common features such as OLED / Pointing Devices, these are supported via QMK's [Userspace feature](https://docs.qmk.fm/#/feature_userspace): this allows the logic to be separated from a specific keyboard / keymap. The shared userspace is maintained as a standalone [External Userspace](https://docs.qmk.fm/newbs_external_userspace) overlay. See the `users/holykeebs` directory in [holykeebs/qmk-userspace](https://github.com/holykeebs/qmk-userspace).

Start by setting up a development environment per [QMK instructions](https://docs.qmk.fm/#/newbs). Clone our Vial fork and not the main QMK repo:

```shell
$ git clone --recurse-submodules git@github.com:holykeebs/vial-qmk.git -b hk-master
$ cd vial-qmk
```

The shared userspace lives in the overlay repository, so clone it as well and point QMK at it. This is a one-time setting, and it's global to the `qmk` CLI, so it applies to every fork you build:

```shell
$ git clone git@github.com:holykeebs/qmk-userspace.git
$ qmk config user.overlay_dir="$(realpath qmk-userspace)"
```

Builds then pick up `users/holykeebs` from the overlay automatically. If it isn't configured, the build fails with `fatal error: users/holykeebs/holykeebs.h: No such file or directory`.

### Building

The basic structure of the build and flash command is:

```shell
make <keyboard>:vial[:flash] -e USER_NAME=holykeebs [-e feature1=value1]...
```

The value for `<keyboard>` should match the keyboard you are flashing for:

| Keyboard  | Value |
| --------- | ----------------- |
| Corne     | holykeebs/corne   |
| Lily58    | holykeebs/lily58  |
| Sweep     | holykeebs/sweeq   |
| Span      | holykeebs/spankbd |
| Keyball39 | holykeebs/keyball39 |
| Keyball44 | holykeebs/keyball44 |
| Keyball61 | holykeebs/keyball61 |
| Keyball61+ | holykeebs/keyball61plus |

::: info
The Keyballs take no pointing-device flags: the trackball and the OLED are always compiled in and the fitted halves are detected at boot. See the [Keyball section](#keyball) below.
:::

The table below lists the possible flags that control what feature to turn on in the firmware.

| Flag          | Description |
| ------------- | ----------- |
| `-e POINTING_DEVICE=tps43`<br>         ` trackpoint`<br>         ` trackball`<br>         ` cirque35`<br>         ` cirque40` | enable pointing device |
| `-e POINTING_DEVICE_POSITION=left`<br>      `right`<br>      `thumb_inner`<br>      `thumb_outer`<br>      `middle` | specify pointing device position |
| `-e OLED=yes` | enable OLED screen |
| `-e TRACKBALL_RGB_RAINBOW=yes` | enable a rainbow color animation on the trackball LED |

An example command might look like this:

```shell
make \
    holykeebs/corne:vial:flash \
    -e USER_NAME=holykeebs \
    -e POINTING_DEVICE=trackball \
    -e POINTING_DEVICE_POSITION=right \
    -e TRACKBALL_RGB_RAINBOW=yes \
    -e OLED=yes \
    -j8
```

Breaking this down:

1. `holykeebs/corne:vial:flash` flashes for a Corne. Omitting `:flash` would just build the firmware without flashing.
1. `-e USER_NAME=holykeebs` to also pull code from `users/holykeebs`.
1. `-e POINTING_DEVICE=trackball` configures the trackball.
1. `-e POINTING_DEVICE_POSITION=right` configures the trackball to the right side of a split keyboard.
1. `-e TRACKBALL_RGB_RAINBOW=yes` configures the rainbow effect on the trackball.
1. `-e OLED=yes` enables the OLED.
1. `-j8` parallizes the build process.

::: details gcc error

If the make command fails with `gcc: error: unrecognized command-line option ‘-mthumb’`, you can try this alternative command:
```shell
qmk flash \
    -e USER_NAME=holykeebs \
    -e POINTING_DEVICE=trackball \
    -e POINTING_DEVICE_POSITION=right \
    -e TRACKBALL_RGB_RAINBOW=yes \
    -e OLED=yes -j8 \
    -kb holykeebs/corne -km vial
```

:::

### Flashing

Run the command you built in the previous step, with `:flash` after the keymap name to also flash after building.

If the command succeeded, you should be seeing this at the end:

```shell

 _           _       _             _
| |__   ___ | |_   _| | _____  ___| |__  ___
| '_ \ / _ \| | | | | |/ / _ \/ _ \ '_ \/ __|
| | | | (_) | | |_| |   <  __/  __/ |_) \__ \
|_| |_|\___/|_|\__, |_|\_\___|\___|_.__/|___/
               |___/

Pointing Device: trackball
OLED: yes
Keyboard main side: right

WARNING! Avoid connecting / disconnecting the TRRS cable when the keyboard is powered. This can short the GPIO pins of the controllers.

Flashing for bootloader: rp2040
Waiting for drive to deploy...
```

::: tip
Make note of the `Flashing for bootloader` line: if you're not seeing this at the end of the output, you are not on the correct branch.
:::

Connect the controller to the computer. Sometimes it will go into bootloader if it hasn't been flashed before.

If not, enter bootloader manually:

- On a Sea Picro, press the reset button for ~1 second.
- On an RP2040 Pro Micro, there are two buttons on the components side of the controller: hold the BOOT button and then press the RESET button next to it. If your controller is already flashed with a QMK firmware, you can simply double tap the reset button on the keyboard itself.

On split keyboards, repeat the flashing process for the other controller.

::: danger
Avoid connecting / disconnecting the TRRS cable when the keyboard is powered. This can short the GPIO pins of the controllers.
:::

### Dual Pointing Devices

When using multiple pointing devices, the pointing device specification turns to `-e POINTING_DEVICE=<left>_<right>` where left and right take one of `tps43`, `trackball`, `trackpoint`, `cirque40` or `cirque35`. The `-e POINTING_DEVICE_POSITION` flag can be omitted since it's implied by the pointing device configuration.

Additionally, we now need to specify the side we're flashing with `-e SIDE=right` or `-e SIDE=left` because we need a different firmware to be flashed on each side.

Example:

```shell
make \
    holykeebs/corne:vial:flash \
    -e USER_NAME=holykeebs \
    -e POINTING_DEVICE=trackball_trackpoint \
    -e SIDE=right \
    -j8
```

The example above flashes the right side, which should be the side with the trackpoint (since it appears on the right of `POINTING_DEVICE`).

The left side would be flashed as follows:

```shell
make \
    holykeebs/corne:vial:flash \
    -e USER_NAME=holykeebs \
    -e POINTING_DEVICE=trackball_trackpoint \
    -e TRACKBALL_RGB_RAINBOW=yes \
    -e SIDE=left \
    -j8
```

### Keyball

Every Keyball (39, 44, 61 and 61+) runs on the holykeebs userspace, so the `HK_*`
keycodes and [features](#features) on this page apply. The boards live under
[keyboards/holykeebs](https://github.com/holykeebs/qmk_firmware/tree/hk-master/keyboards/holykeebs).
On the Keyball 39, 44 and 61 one image covers a trackball on the left, the right
or both halves: the firmware detects which halves carry one at boot and updates
the "Ball availability" layout in Vial to match. The Keyball61+ detects its hand
from the sensor instead, so its trackball must be on the right half. Per-key
lighting is QMK's RGB Matrix.

::: danger
Avoid connecting / disconnecting the TRRS cable when the keyboard is powered. This can short the GPIO pins of the controllers.
:::

While on the `hk-master` branch, build with (append `:flash` to also flash):

```shell
# Replace 44 with the Keyball you have (39, 44, 61 or 61plus).
make holykeebs/keyball44:vial -e USER_NAME=holykeebs -e OLED=yes
```

The USB cable can be connected to either side of the keyboard. See the
[Keyball guide](/guides/keyboard/keyball/) for the keyboard-specific details,
including the Keyball61+.

## VIA

[VIA](https://usevia.app/) is the web-based alternative to Vial. The precompiled
firmware is Vial only, but the same keyboards build for VIA from the
[holykeebs/qmk_firmware](https://github.com/holykeebs/qmk_firmware) fork
(`hk-master` branch) against the same `users/holykeebs` overlay, so every
feature on this page behaves identically; only the configurator differs.

Clone that fork instead of vial-qmk, then use `:hk` in place of `:vial` on a
modular board with a pointing device and `:via` otherwise (device-less builds
and every Keyball); the `-e` variables are the same. VIA
needs the board's definition file (the `via.json` in the board directory) since
the boards carry holykeebs USB identities.

```shell
$ git clone --recurse-submodules git@github.com:holykeebs/qmk_firmware.git -b hk-master
$ cd qmk_firmware
$ make holykeebs/corne:hk -e USER_NAME=holykeebs -e POINTING_DEVICE=trackball -e POINTING_DEVICE_POSITION=right -e OLED=yes
$ make holykeebs/keyball61plus:via -e USER_NAME=holykeebs -e OLED=yes
```

## Testing

1. On a split keyboard, connect the halves when none of the sides are powered.
1. On a split keyboard, the output of the build/flash command will say which side needs to be connected to the computer.
1. On first use, a dialog from the OS may open to configure a new keyboard, go through that.
1. Use Vial's matrix tester (under the Matrix tester tab) to check all of the keys work.

If one of the keys do not work, head over to [Troubleshooting](/troubleshooting/).

## Features

::: info
The Killer Whale firmware has its own dedicated implementation that overlaps with the functionality described below (its precompiled firmware is in the [full list](https://github.com/holykeebs/qmk_compiled/releases/tag/latest)). Please refer to its documentation for more details.
:::

The default firmware facilitates pointing device usage by extending QMK with some useful and common functionality. This functionality is exposed via a collection of keycodes that can be bound to your liking; they appear by name in Vial's User tab. The default keymap provides a batteries included mapping in a dedicated `POINTER` layer to make use of these keycodes.

### Sensitivity

Often the stock movement speed of the pointing device isn't a good fit for your setup. Adjusting the sensitivity changes how far the cursor moves for a given motion of the pointing device.

How the sensitivity is realized is device dependent: for most devices it's a software factor applied to the movement, while for sensors that support it (such as the PMW3360 trackball) it's the hardware CPI. The sensible default is chosen based on the device.

Sensitivity is supported on a default profile and a secondary, "sniping" profile.

::: details
For devices where the sensitivity is a software factor, the hardware CPI/DPI is intentionally left alone, as changing it doesn't work well with all pointing devices (e.g. on a touchpad where a lot of different settings are derived from the CPI and cease to function properly).
:::

### Sniping

Sniping is simply another sensitivity profile that can be applied to a pointing device, either by holding a key or toggling the mode. It's called sniping because this mode usually uses a lower sensitivity than the default profile, thus allowing finer movement.

### Drag Scroll

Drag scroll lets you move a pointing device and have those moves translate to scrolls, figuratively dragging the mouse to scroll.

### Scroll Throttle

Moving the mouse to scroll often results in an unusable scroll amount. The scroll throttle requires a specified amount of movement before sending a scroll to the host, effectively slowing it down.

### Scroll Lock

Locks scrolling to the horizontal or vertical axis.

### OLED

On a keyboard with a pointing device and screen, the screen will display the following information:

![oled](oled.png)

| Row | Description                                                                                     |
|:----|:------------------------------------------------------------------------------------------------|
|  0  | Displays information on the last pressed key, and any held ones                                 |
|  1  | Displays the current pointing device (or NONE) and the last x/y/v/h movements                   |
|  2  | On the left, displays the current pointing profile (D for default, S for sniping)               |
|  2  | On the right, displays the sensitivity, scroll throttle, drag scroll mode, and scroll lock |
|  3  | Displays the active layers and whether automatic mouse layer is on                              |

### Bongocat

The OLED can show the classic bongocat animation instead of the info panels. The cat reacts to your typing speed: it sits idle below 20 WPM, raises its paws as you speed up, and drums away at 40 WPM and above. The current WPM is shown in the corner, along with a caps lock indicator. When you stop typing, the screen goes to sleep after a timeout and any keypress wakes it.

Bongocat is included in every OLED firmware, but the screen starts out showing the info panels. Use the `HK_BONGO_T` keycode to switch the animation on or off at runtime; hold shift to switch it on the other half's screen instead. Each half is toggled independently, so you can have the info panels on one side and the cat on the other. Use `HK_SAVE` to persist the choice across restarts.

If you compile your own firmware and want to leave the animation out, pass `-e BONGO_ENABLE=no`.

### Usage

The following keycodes allow control of the above features. Orders that use the build service and have a pointing device come flashed with a default firmware that already puts these keys at sane locations. See [keymaps](../keymaps/index.md) for more details.

| Keycode        | Description                                                                 |
|:---------------|:----------------------------------------------------------------------------|
| `HK_SAVE`      | Saves the current config, making it persist across keyboard restart         |
| `HK_RESET`     | Resets the configuration to its default state                               |
| `HK_DUMP`      | Dumps the current config to the console (needs `CONSOLE_ENABLE=yes`)        |
| `HK_P_SET_D`   | When held*, tapping up/down increases/decreases the default sensitivity |
| `HK_P_SET_S`   | When held*, tapping up/down increases/decreases the sniping sensitivity |
| `HK_P_SET_THR` | When held*, pressing up/down increases/decreases the scroll throttle        |
| `HK_S_MODE`    | When held*, enables sniping                                                 |
| `HK_S_MODE_T`  | Toggles sniping                                                             |
| `HK_D_MODE`    | When held*, enables the drag scroll                                         |
| `HK_D_MODE_T`  | Toggles drag scroll                                                         |
| `HK_C_SCROLL`  | Cycles the scroll lock between off, horizontal and vertical                 |
| `HK_I_SCROLL`  | Inverts the scroll direction                                                |
| `HK_AML_T`     | Toggles the auto-mouse layer                                                |
| `HK_AML_UP`    | Increases the auto-mouse layer timeout by 50ms                              |
| `HK_AML_DN`    | Decreases the auto-mouse layer timeout by 50ms                              |
| `HK_BONGO_T`   | Toggles the bongocat OLED animation (hold shift to target the peripheral OLED) |
| `HK_ENC_SCR_U` | Scrolls up by one encoder detent, for a scroll wheel's rotation             |
| `HK_ENC_SCR_D` | Scrolls down by one encoder detent, for a scroll wheel's rotation           |

\* Holding shift while using any of the config keycodes that need to be held will affect the peripheral pointing device. On the Keyball61+, where USB can go in either half, the unshifted keycodes always target the half that has the trackball; shift targets the other half.

### Debugging

Without an OLED, it's impossible to know what the values above are set to. If you'd like to tune them or just see what's going
on behind the scenes, you can turn on debug mode.

When compiling your own firmware, simply set `CONSOLE_ENABLED=yes` in `users/holykeebs/rules.mk` (in the overlay repository) or in any other `rules.mk` in your
keyboard tree.

The precompiled firmwares are built without it, so debug mode means compiling your own; add `-e CONSOLE=yes` to the build command.

Once debug mode is turned on, run `qmk console` with the keyboard plugged in. Example output when tapping the `HK_DUMP` key:

```shell
liliums:Lily58:1: keyboard_post_init_user: reading eeprom, check: 1
liliums:Lily58:1: init_state
liliums:Lily58:1: debug_hk: state = {
liliums:Lily58:1:       is_main_side=1
liliums:Lily58:1:       setting_default_sensitivity=0
liliums:Lily58:1:       setting_sniping_sensitivity=0
liliums:Lily58:1:       setting_scroll_throttle=0
liliums:Lily58:1:       main=
liliums:Lily58:1:       {
liliums:Lily58:1:               pointer_kind=trackpoint
liliums:Lily58:1:               cursor_mode=default
liliums:Lily58:1:               drag_scroll=0
liliums:Lily58:1:               scroll_lock=off
liliums:Lily58:1:               pointer_default_sensitivity=2.00
liliums:Lily58:1:               pointer_sniping_sensitivity=1.00
liliums:Lily58:1:               pointer_scroll_throttle=5
liliums:Lily58:1:       }
liliums:Lily58:1:       peripheral=
liliums:Lily58:1:       {
liliums:Lily58:1:               pointer_kind=tps43
liliums:Lily58:1:               cursor_mode=default
liliums:Lily58:1:               drag_scroll=0
liliums:Lily58:1:               scroll_lock=off
liliums:Lily58:1:               pointer_default_sensitivity=1.50
liliums:Lily58:1:               pointer_sniping_sensitivity=1.00
liliums:Lily58:1:               pointer_scroll_throttle=5
liliums:Lily58:1:       }
liliums:Lily58:1: }
```

## Patterns

### Permanent Scroll

On a dual pointing device setup, it's often desirable to set one of the pointing devices to always scroll (this is done by default if the secondary one is a Pimoroni Trackball).

To do this, hold shift and tap `HK_D_MODE_T`. This will toggle drag scroll on the peripheral pointing device. Test if the scroll speed is comfortable, and if not adjust it by setting the scroll throttle.

Finish by pressing `HK_SAVE` to persist the changes.

## Community Keymaps

This section is dedicated to keymaps written by community members, describing the special aspects that were implemented:

[@R4_Unit's firmware](https://github.com/Koloth/qmk_firmware/tree/master/keyboards/crkbd/keymaps/Koloth): 4 layers accessed through a pair of thumb keys. The trackball is different on each layer.

::: details
Layer 0: Trackball scrolls the page.  For me, my most common mouse action was scrolling in a web browser etc, so this is the default.  Works perfectly for this task.

Layer 1: Trackball presses arrow keys.  I also really like this for moving inside text fields and it feels really good with the clicks of the trackball.  This is how it was used on older mobile phones, and it is really good at this.

Layer 2: Trackball is mouse.  Out of the box, the pimoroni is a pretty bad mouse, needing you to drag it edge-to-edge about 5 times to move across your screen. If you just up the sensitivity then it isn’t accurate enough to do things like select individual buttons. I’ve added nonlinear response to mine, so that moving it twice as fast doesn’t just move it twice as far, but actually 4x as far (3x as fast, 9x as far, etc.). This gives you the best of both worlds, and if you use like a Mac trackpad, you are already used to this behavior.

Layer 3: Trackball is app switcher.  Again this feels nice as a slightly better version of alt-tab.

I also have a variety of dedicated shortcut keys for things like: screenshot, switch tabs in a browser, basic window arrangement (left-half, right-half, etc.)
:::
