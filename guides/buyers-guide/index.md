<script setup>
import Images from '../../components/Images.vue';

import controllerheadersflat from './controller-headers-flat.jpg';
import millmaxcontroller from './millmax-controller.jpg';

import cases1 from './cases-1.jpg';
import cases2 from './cases-2.jpg';
import cases3 from './cases-3.jpg';
import cases4 from './cases-4.jpg';

import pointingdevice1 from './pointing-device-1.jpg';
import pointingdevice2 from './pointing-device-2.jpg';
</script>

# Buyer's Guide

::: tip This guide now lives in the configurator
Everything below is built into each keyboard's product page. As you pick your
options, the configurator explains them where you choose them and the 3D
preview shows the result on your actual board - including the parts this page
could only describe in words, like case colours, keycap profiles and key
spacing.

Start from [Keyboards](https://holykeebs.com/collections/keyboards). This page
is kept for reference.
:::

At holykeebs, we specialize in ergonomic keyboards with pointing devices.

A mechanical keyboard is comprised of various parts, allowing a relatively high degree of customization compared to a regular keyboard.

This guide will help you choose through the various options when buying a keyboard.

::: info
We cover all options here. If a product you're looking at is missing something then it's either incompatible, or a mistake. Reach out if in doubt.
:::

## Build Service

At holykeebs, we offer kit, soldered, or fully assembled build services. Whether you're a DIYer at heart, or just want a keyboard to plug in - we have you covered.

This option gives you a choice of:

1. Getting all parts required to build a keyboard, you have to solder and assemble it.
2. Getting a soldered keyboard and additional hardware, you have to assemble it (e.g. push the switches into hotswap sockets, keycaps into switches, screw bottom plate etc.).
3. Getting a fully assembled and tested keyboard, just plug it in.

::: info
Soldered but unassembled keyboards are electrically tested to the extent possible. In the event that something got missed or doesn't work on arrival, please reach out and when possible we'll try to fix things remotely depending on your skillset and severity of the problem.
:::

## Controllers

All of the keyboards we sell use a top mounted USB-C microcontroller, with split keyboards using one on each keyboard half.

RP2040 based controllers are the standard for wired DIY keyboards and are thus favored over Pro Micro clones (which we no longer offer), that are low on storage.

## Sockets, Headers

Socketing the controllers is always a good idea because removing a faulty controller that was soldered to a PCB can be a very frustrating experience.

All of the keyboards we build come with socketed controllers. We currently have two options, the main difference is how much height each one adds to the "controller stack" (these two options aren't compatible with one another).

1. Machine headers (PCB to controller height: 7.5mm): a strip of pins + 3mm plastic that match the machine sockets. These are cut from 40 pin strips.
1. Custom low profile headers (PCB to controller height: 5mm): these are custom made sockets and headers, that are ideal for low profile keyboards with a pointing device, as the reduced height can be an improvement for finger movement. These are also less prone to bending, which is a common problem when removing the former from their sockets.

::: warning
When choosing the headers for a pointing device module for an existing keyboard you own, make sure your sockets are compatible with the ones you pick (or use your own headers).
:::

![controller-headers-comparison](./controller-headers-comparison.jpg)

## Pointing Device

<Images :paths="[pointingdevice1, pointingdevice2]" />

1. [TPS43](https://www.mouser.com/datasheet/2/42/proxsense_i2c_trackpad_datasheet-1626845.pdf): a 43x40mm touchpad, supporting 1/2 finger multitouch and gestures.
1. [Trackpoint](https://www.sprintek.com/en/products/PointingStick.aspx): these are commonly found in Lenovo laptops. If you've used one in the past, you can expect similar movement and sensitivity.
1. [Pimoroni Trackball](https://shop.pimoroni.com/products/trackball-breakout?variant=27672765038675): a small, RGBW-illuminated, clickable trackball.

Given the trackball size it is the least accurate of the 3 and is mostly recommended as an off-hand device (scroll, click), rather than a mouse replacement.

Both trackball and touchpad support clicking, and it is common to use [mouse keys](https://docs.qmk.fm/#/feature_mouse_keys) on the peripheral side without the pointing device. For example, if the right side of the keyboard has a trackpoint, on the left side a few keys are assigned to do left click, right click, scroll mode, etc.

Generally speaking, all pointing devices are great for navigation, browsing, code editing and doing other activities that complement otherwise "standard" computer usage. They are not suitable for gaming.

::: info
A pointing device and OLED display share the same location on the keyboard, it's not possible to have both on the same side.
:::

## Switches

There are 3 switch categories: linear, tactile and clicky. A lot has been said on this topic, please search around to understand the differences and watch some videos to decide which one might work for you.

If you can't decide, make sure you get hotswap sockets and consider the Red Pro linear switches, which are a common choice.

### Hotswap Sockets

Hotswap sockets allow socketing the switches (rather than soldering them directly to the PCB).

They are easy to solder and are generally a good idea if you're not set on a switch or want the freedom to change them in the future.

### Stabilizers

The purpose of a stabilizer is to provide an even pressing surface across a wide keycap. The [Span](https://holykeebs.com/products/span) keyboard uses 2u keys, which have an option to use stabilizers.

Stabilizers are generally recommended, although do add a bit of work in the build process. 2u keys are very usable even without stabilizers.

## Key Spacing

There are two standard "key spacing", i.e. how close the keys are to each other:

1. MX keyboards use a grid of 19x19mm squares. Some keyboards with choc switches also use this, which results in small gaps between keys.
1. Choc spacing uses 18x17mm squares, and produces a more tight arrangement with minimal key spacing. It is specifically designed for Kailh's choc switches (hence the name).

For choc keyboards, we differentiate these two styles of spacing by calling the former Low Profile and the latter Choc.

![key spacing](./spacing.jpg)

## Keycaps

### Low Profile / Choc Switches

The keyboards we sell are exclusively using 1U, 1.5U and 2U key sizes. Unlike MX switches, there aren't many keycap options for choc switches.

[MBK keycaps](https://holykeebs.com/products/mbk-low-profile-keycaps) are the most popular low profile keycaps, which come either blank, colored or with legends.

![MBK keycaps](./keycaps-mbk.webp)

Another option that recently came about are [DDC](https://holykeebs.com/products/ddc-choc-pbt-blank-keycaps), which try to emulate the traditional cylindrical profiles. DDC are currently only available in 1U / homing, so for keyboards with 1.5U / 2U keys we will use the MBK variant for those key sizes.

![DDC keycaps](./keycaps-ddc.webp)

Both of these keycaps are PBT and are slightly textured.

::: tip
Adding a few [colored keycaps](https://holykeebs.com/products/mbk-dyed-low-profile-keycaps) is a great way to make your keyboard unique!
:::

### MX Switches

We carry several keycap options for MX switches, listed from highest profile to lowest: XDA, DSA, JWA and Tai-Hao Thins.

## LEDs

Adds per-key and underglow RGB LEDs to your keyboard.

You can get the LEDs soldered or unsoldered. There's an additional build charge on top of the build service cost for soldering LEDs due to the amount of extra work required.

::: info
Not all keyboards have this option.
:::

## OLED

::: info
A pointing device and OLED display share the same location on the keyboard, it is possible to only have one or the other on a given side.
:::

A small 128x32 OLED display that sits on top of the controller. These displays can be programmed to display a static image, or other dynamic information such as WPM, current layer, etc.

![oled](./oled.jpg)

## Top Plates

Top plates, sometimes called switches plates, are what switches mechanically attach to. Generally speaking, top plates are mandatory.  Top plates can also be 3d printed for a budget build.

Some boards support soldering the switches to the PCB rather than using hotswap sockets, and can work without top plates, but then present a problem for attaching a case since it screws into the top plates.

::: info
A top plate is **required** if you'd like stabilizers for 2u keys, like the [Span](https://holykeebs.com/products/span) keyboard supports.
:::

## Middle Plates

MX keyboards have the option of having an additional acrylic piece between the PCB and top plates. This doesn't serve a functional purpose, but can improve sound, fills the gap between the PCB and top plates and is a nice addition if LEDs are used.

![plates breakdown](./plates-breakdown.jpg)

## Bottom Plates / Cases

A bottom plate / case sits under the keyboard PCB and is a low cost option compared to a fully enclosed machined metal / plastic molded case.

<Images :paths="[cases1, cases2, cases3, cases4]" />

We carry a variety of colors for laser cut acrylic plates or 3d printed cases. Our 3d printed cases feature a thin bezel that is the same height as the top plate of the keyboard.

![printed-colors](./printed-colors.jpg)

The list of colors changes over time. You may use [this service](https://filamentcolors.xyz/) to look up a particular color, but actual color may differ from photos.

## Covers

Covers can be mounted on trackpoints and OLEDs for a better look / protection. All of our covers are laser cut acrylic in glossy, matte or translucent colors.

![covers](./covers.jpg)

## More

Still have questions? Visit our [discord](https://discord.com/invite/Hd6X7yd5xF) or [contact us](https://holykeebs.com/pages/contact).
