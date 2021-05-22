# Component: GPU

This is the component provided by [graphics cards](/item/graphics_card).
For simple programs the [term API](/api/term) will usually all you need.
For more complex operations, or to get a bit more performance, you may
wish to interact with the GPU directly, though.

As of OC 1.3 screens of tier 2 and 3 have a 16 color palette. The
palette is used to determine the exact colors used when displaying an
RGB color.

For tier two this palette contains all colors the screen can possibly
display, and is initialized to the standard Minecraft colors. As a
side-effect you can specify the colors using
`gpu.setBackground(colors.red, true)`, for example. Keep in mind
**this only works on tier two screens**. Tier three also has an editable
16 color palette, and also a 240 color fixed palette. The editable
palette is initialized to grayscale values. The remaining 240 colors are
stored as truncated RGB values as was the case in older versions of
OpenComputers.

Component name: `gpu`. Callbacks:

- [Video Ram Buffers](/component/gpu#video_ram_buffers) This

      list of component api is getting long, so the new video ram api is
      listed below on this page in its own section
      -   New in OC 1.7.5 Developer builds and expected in the next
          release (OC 1.8)

- `bind(address: string[, reset: boolean=true]): boolean[,
string]`

      Tries to bind the GPU to a screen with the specified address.
      Returns `true` on success, `false` and an error message on failure.
      Resets the screen's settings if reset is 'true'. A GPU can only
      be bound to one screen at a time. All operations on it will work on
      the bound screen. If you wish to control multiple screens at once,
      you'll need to put more than one graphics card into your computer.

- `getScreen():string`

      Get the address of the screen the GPU is bound to. Since 1.3.2.

- `getBackground(): number, boolean`

      Gets the current background color. This background color is applied
      to all "pixels" that get changed by other operations.
      Note that the returned number is either an RGB value in hexadecimal
      format, i.e. `0xRRGGBB`, or a palette index. The second returned
      value indicates which of the two it is (`true` for palette color,
      `false` for RGB value).

- `setBackground(color: number[, isPaletteIndex: boolean]):
number[, index]`

      Sets the background color to apply to "pixels" modified by other
      operations from now on. The returned value is the old background
      color, as the actual value it was set to (i.e. not compressed to the
      color space currently set). The first value is the previous color as
      an RGB value. If the color was from the palette, the second value
      will be the index in the palette. Otherwise it will be `nil`. Note
      that the color is expected to be specified in hexadecimal RGB
      format, i.e. `0xRRGGBB`. This is to allow uniform color operations
      regardless of the color depth supported by the screen and GPU.

- `getForeground(): number, boolean`

      Like `getBackground`, but for the foreground color.

- `setForeground(color: number[, isPaletteIndex: boolean]):
number[, index]`

      Like `setBackground`, but for the foreground color.

- `getPaletteColor(index: number): number`

      Gets the RGB value of the color in the palette at the specified
      index.

- `setPaletteColor(index: number, value: number): number`

      Sets the RGB value of the color in the palette at the specified
      index.

- `maxDepth(): number`

      Gets the maximum supported color depth supported by the GPU and the
      screen it is bound to (minimum of the two).

- `getDepth(): number`

      The currently set color depth of the GPU/screen, in bits. Can be 1,
      4 or 8.

- `setDepth(bit: number): boolean`

      Sets the color depth to use. Can be up to the maximum supported
      color depth. If a larger or invalid value is provided it will throw
      an error. Returns `true` if the depth was set, `false` otherwise.

- `maxResolution(): number, number`

      Gets the maximum resolution supported by the GPU and the screen it
      is bound to (minimum of the two).

- `getResolution(): number, number`

      Gets the currently set resolution.

- `setResolution(width: number, height: number): boolean`

      Sets the specified resolution. Can be up to the maximum supported
      resolution. If a larger or invalid resolution is provided it will
      throw an error. Returns `true` if the resolution was changed (may
      return `false` if an attempt was made to set it to the same value it
      was set before), `false` otherwise.

- `getViewport(): number, number`

      Get the current viewport resolution.

- `setViewport(width: number, height: number): boolean`

      Set the current viewport resolution. Returns `true` if it was
      changed (may return `false` if an attempt was made to set it to the
      same value it was set before), `false` otherwise. This makes it look
      like screen resolution is lower, but the actual resolution stays the
      same. Characters outside top-left corner of specified size are just
      hidden, and are intended for rendering or storing things off-screen
      and copying them to the visible area when needed. Changing
      resolution will change viewport to whole screen.

- `~~`{=html}`getSize(): number, number` Gets the size in blocks of
the screen the graphics card is bound to. For simple screens and robots
this will be one by one.`~~`{=html} Deprecated, use
`screen.getAspectRatio()`

      instead.

- `get(x: number, y: number): string, number, number, number or nil,
number or nil`

      Gets the character currently being displayed at the specified
      coordinates. The second and third returned values are the fore- and
      background color, as hexvalues. If the colors are from the palette,
      the fourth and fifth values specify the palette index of the color,
      otherwise they are nil.

- `set(x: number, y: number, value: string[, vertical:boolean]):
boolean`

      Writes a string to the screen, starting at the specified
      coordinates. The string will be copied to the screen's buffer
      directly, in a single row. This means even if the specified string
      contains line breaks, these will just be printed as special
      characters, the string will not be displayed over multiple lines.
      Returns `true` if the string was set to the buffer, `false`
      otherwise.
      The optional fourth argument makes the specified text get printed
      vertically instead, if `true`.

- `copy(x: number, y: number, width: number, height: number, tx:
number, ty: number): boolean`

      Copies a portion of the screens buffer to another location. The
      source rectangle is specified by the `x`, `y`, `width` and `height`
      parameters. The target rectangle is defined by `x + tx`, `y + ty`,
      `width` and `height`. Returns `true` on success, `false` otherwise.

- `fill(x: number, y: number, width: number, height: number, char:
string): boolean`

      Fills a rectangle in the screen buffer with the specified character.
      The target rectangle is specified by the `x` and `y` coordinates and
      the rectangle's `width` and `height`. The fill character `char`
      must be a string of length one, i.e. a single character. Returns
      `true` on success, `false` otherwise.
      Note that filling screens with spaces (` `) is usually less
      expensive, i.e. consumes less energy, because it is considered a
      "clear" operation (see config).

Example use:

``` local component = require("component") local gpu =
component.gpu -- get primary gpu component local w, h =
gpu.getResolution() gpu.fill(1, 1, w, h, " ") -- clears the screen
gpu.setForeground(0x000000) gpu.setBackground(0xFFFFFF) gpu.fill(1, 1,
w/2, h/2, "X") -- fill top left quarter of screen gpu.copy(1, 1, w/2,
h/2, w/2, h/2) -- copy top left quarter of screen to lower right ```

# GPU Color Depth

Color Depth (see `gpu.setDepth` and `gpu.getDepth`) can be 1, 4, or
8 bits separately for foreground and background. These depths provide 2,
16, and 256 colors respectively.

The color value (the `number` passed to `gpu.setBackground` and
`gpu.setForeground`) is interpreted either as a 8 bits per channel rgb
value (24 bit color) or a palette index.

## RGB Color

The background and foreground colors, as set by calling
`setBackground` and `setForeground`, are defined by a `value`
(number) and `is_palette` (boolean) pair (the boolean being optional).

When `is_palette` is false (or `nil`), `value` is interpreted as a
24 bit rgb color (0xRRGGBB), regardless of depth. However, the color is
approximated to the closest available color in the given depth. In
monochrome, zero rounds to zero and all nonzero values round to 1 (and
the configured monochrome color is used). In 4 bit color, the closest
available color in the palette is selected. In 8 bit color the closest
color of the available 256 colors is used. The available 256 colors are
described in the following table:

![](/api/oc-256-color.png){width="768"}

Image by
[Eunomiac](<https://oc.cil.li/index.php?/topic/442-colors-what-determines-colors-i-code-vs-colors-i-get/>)

## Palette Color

When `is_palette` is `true`, `value` is interpreted as palette
index [0, 16). If you switch from a higher bit density to monochrome
note that the color value from the palette is used to determine zero vs
the nonzero monochrome color. It is an error to specify a paletted color
(i.e. an index value and `true`) in 1 bit depth.

## Changing Depth

Note that the original color pair (the value `number` and palette
`bool`) are preserved (background and foreground each) even when
switching bit depths. The actual rendering on the screen will update to
respect the new depth, but the original 24bit rgb value (or palette
index) is not lost. For example, calling `gpu.getBackground` while in
1 bit mode will return the original 24 bit rgb value specified from any
previous color depth.

# Video Ram Buffers

A GPU card has internal memory that you can allocate into pages. You can
specify a custom page size (width and height each must be greater than
zero). The total memory of a GPU is reduced by the width*height of an
allocation. Each tier of gpu has more total memory than the last. Each
page buffer acts like an offscreen [Screen](/component/screen) with its
own width, height, and color. The max color depth of a gpu buffer is
based on the gpu tier. Rebooting a machine releases all bufffers.

Each page buffer has its own index; the gpu finds the next available
index. Index zero (0) has a special meaning, it is reserved for the
screen. Whether a gpu is bound to a screen or not, you can allocate
pages, set them active, and read/write to them. Attaching and detaching
a screen, even binding to a new screen, does not release the gpu pages.
When a computer shuts off or reboots, the pages are released. Each GPU
has its own video memory and pages.

## Budget and Energy Costs

Updates to vram (set, copy, fill, etc) are nearly free. They have no
energy cost and no additional budget cost. Every direct component invoke
(and these gpu methods are direct) has a tiny system minimum budget
cost, but the gpu itself in these vram updates adds no additional cost.
When bitblt'ing the vram to the screen there is some cost, similar to
how updates to the screen normally incur a cost. A dirty (modified) vram
back buffer has a one time budget cost that increases with the size of
the source buffer. Subsequent bitblts from a clean back buffer to the
screen have extremely low costs.

- `getActiveBuffer(): number`

      Returns the index of the currently selected buffer. 0 is reserved
      for the screen, and may return 0 even when there is no screen

- `setActiveBuffer(index: number): number`

      Sets the active buffer to `index`. 0 is reserved for the screen and
      can be set even when there is no screen. Returns nil for an invalid
      index (0 is valid even with no screen)

- `buffers(): table`

      Returns an array of all current page indexes (0 is not included in
      this list, that is reserved for the screen).

- `allocateBuffer([width: number, height: number]): number`

      Allocates a new buffer with dimensions width*heigh (gpu max
      resolution by default). Returns the index of this new buffer or
      error when there is not enough video memory. A buffer can be
      allocated even when there is no screen bound to this gpu. Index 0 is
      always reserved for the screen and thus the lowest possible index of
      an allocated buffer is always 1.

- `freeBuffer([index: number]): boolean`

      Removes buffer at `index` (default: current buffer index). Returns
      true if the buffer was removed. When you remove the currently
      selected buffer, the gpu automatically switches back to index 0
      (reserved for a screen)

- `freeAllBuffers()`

      Removes all buffers, freeing all video memory. The buffer index is
      always 0 after this call.

- `totalMemory(): number`

      Returns the total memory size of the gpu vram. This does not include
      the screen.

- `freeMemory(): number`

      Returns the total free memory not allocated to buffers. This does
      not include the screen.

- `getBufferSize([index: number]): number, number`

      Returns the buffer size at `index` (default: current buffer index).
      Returns the screen resolution for index 0. Returns nil for invalid
      indexes

- `bitblt([dst: number, col: number, row: number, width: number,
height: number, src: number, fromCol: number, fromRow: number])`

      Copy a region from buffer to buffer, screen to buffer, or buffer to
      screen. Defaults:
      -   dst = 0, the screen
      -   col, row = 1,1
      -   width, height = resolution of the destination buffer
      -   src = the current buffer
      -   fromCol, fromRow = 1,1 bitblt should preform very fast on
          repeated use. If the buffer is dirty there is an initial higher
          cost to sync the buffer with the destination object. If you have
          a large number of updates to make with frequent bitblts,
          consider making multiple and smaller buffers. If you plan to use
          a static buffer (one with few or no updatse), then a large
          buffer is just fine. Returns true on success

------------------------------------------------------------------------

# Component: GPU

This is the component provided by [graphics cards](/item/graphics_card).
For simple programs the [term API](/api/term) will usually all you need.
For more complex operations, or to get a bit more performance, you may
wish to interact with the GPU directly, though.

As of OC 1.3 screens of tier 2 and 3 have a 16 color palette. The
palette is used to determine the exact colors used when displaying an
RGB color.

For tier two this palette contains all colors the screen can possibly
display, and is initialized to the standard Minecraft colors. As a
side-effect you can specify the colors using
`gpu.setBackground(colors.red, true)`, for example. Keep in mind
**this only works on tier two screens**. Tier three also has an editable
16 color palette, and also a 240 color fixed palette. The editable
palette is initialized to grayscale values. The remaining 240 colors are
stored as truncated RGB values as was the case in older versions of
OpenComputers.

Component name: `gpu`. Callbacks:

- [Video Ram Buffers](/component/gpu#video_ram_buffers) This

      list of component api is getting long, so the new video ram api is
      listed below on this page in its own section
      -   New in OC 1.7.5 Developer builds and expected in the next
          release (OC 1.8)

- `bind(address: string[, reset: boolean=true]): boolean[,
string]`

      Tries to bind the GPU to a screen with the specified address.
      Returns `true` on success, `false` and an error message on failure.
      Resets the screen's settings if reset is 'true'. A GPU can only
      be bound to one screen at a time. All operations on it will work on
      the bound screen. If you wish to control multiple screens at once,
      you'll need to put more than one graphics card into your computer.

- `getScreen():string`

      Get the address of the screen the GPU is bound to. Since 1.3.2.

- `getBackground(): number, boolean`

      Gets the current background color. This background color is applied
      to all "pixels" that get changed by other operations.
      Note that the returned number is either an RGB value in hexadecimal
      format, i.e. `0xRRGGBB`, or a palette index. The second returned
      value indicates which of the two it is (`true` for palette color,
      `false` for RGB value).

- `setBackground(color: number[, isPaletteIndex: boolean]):
number[, index]`

      Sets the background color to apply to "pixels" modified by other
      operations from now on. The returned value is the old background
      color, as the actual value it was set to (i.e. not compressed to the
      color space currently set). The first value is the previous color as
      an RGB value. If the color was from the palette, the second value
      will be the index in the palette. Otherwise it will be `nil`. Note
      that the color is expected to be specified in hexadecimal RGB
      format, i.e. `0xRRGGBB`. This is to allow uniform color operations
      regardless of the color depth supported by the screen and GPU.

- `getForeground(): number, boolean`

      Like `getBackground`, but for the foreground color.

- `setForeground(color: number[, isPaletteIndex: boolean]):
number[, index]`

      Like `setBackground`, but for the foreground color.

- `getPaletteColor(index: number): number`

      Gets the RGB value of the color in the palette at the specified
      index.

- `setPaletteColor(index: number, value: number): number`

      Sets the RGB value of the color in the palette at the specified
      index.

- `maxDepth(): number`

      Gets the maximum supported color depth supported by the GPU and the
      screen it is bound to (minimum of the two).

- `getDepth(): number`

      The currently set color depth of the GPU/screen, in bits. Can be 1,
      4 or 8.

- `setDepth(bit: number): boolean`

      Sets the color depth to use. Can be up to the maximum supported
      color depth. If a larger or invalid value is provided it will throw
      an error. Returns `true` if the depth was set, `false` otherwise.

- `maxResolution(): number, number`

      Gets the maximum resolution supported by the GPU and the screen it
      is bound to (minimum of the two).

- `getResolution(): number, number`

      Gets the currently set resolution.

- `setResolution(width: number, height: number): boolean`

      Sets the specified resolution. Can be up to the maximum supported
      resolution. If a larger or invalid resolution is provided it will
      throw an error. Returns `true` if the resolution was changed (may
      return `false` if an attempt was made to set it to the same value it
      was set before), `false` otherwise.

- `getViewport(): number, number`

      Get the current viewport resolution.

- `setViewport(width: number, height: number): boolean`

      Set the current viewport resolution. Returns `true` if it was
      changed (may return `false` if an attempt was made to set it to the
      same value it was set before), `false` otherwise. This makes it look
      like screen resolution is lower, but the actual resolution stays the
      same. Characters outside top-left corner of specified size are just
      hidden, and are intended for rendering or storing things off-screen
      and copying them to the visible area when needed. Changing
      resolution will change viewport to whole screen.

- `~~`{=html}`getSize(): number, number` Gets the size in blocks of
the screen the graphics card is bound to. For simple screens and robots
this will be one by one.`~~`{=html} Deprecated, use
`screen.getAspectRatio()`

      instead.

- `get(x: number, y: number): string, number, number, number or nil,
number or nil`

      Gets the character currently being displayed at the specified
      coordinates. The second and third returned values are the fore- and
      background color, as hexvalues. If the colors are from the palette,
      the fourth and fifth values specify the palette index of the color,
      otherwise they are nil.

- `set(x: number, y: number, value: string[, vertical:boolean]):
boolean`

      Writes a string to the screen, starting at the specified
      coordinates. The string will be copied to the screen's buffer
      directly, in a single row. This means even if the specified string
      contains line breaks, these will just be printed as special
      characters, the string will not be displayed over multiple lines.
      Returns `true` if the string was set to the buffer, `false`
      otherwise.
      The optional fourth argument makes the specified text get printed
      vertically instead, if `true`.

- `copy(x: number, y: number, width: number, height: number, tx:
number, ty: number): boolean`

      Copies a portion of the screens buffer to another location. The
      source rectangle is specified by the `x`, `y`, `width` and `height`
      parameters. The target rectangle is defined by `x + tx`, `y + ty`,
      `width` and `height`. Returns `true` on success, `false` otherwise.

- `fill(x: number, y: number, width: number, height: number, char:
string): boolean`

      Fills a rectangle in the screen buffer with the specified character.
      The target rectangle is specified by the `x` and `y` coordinates and
      the rectangle's `width` and `height`. The fill character `char`
      must be a string of length one, i.e. a single character. Returns
      `true` on success, `false` otherwise.
      Note that filling screens with spaces (` `) is usually less
      expensive, i.e. consumes less energy, because it is considered a
      "clear" operation (see config).

Example use:

``` local component = require("component") local gpu =
component.gpu -- get primary gpu component local w, h =
gpu.getResolution() gpu.fill(1, 1, w, h, " ") -- clears the screen
gpu.setForeground(0x000000) gpu.setBackground(0xFFFFFF) gpu.fill(1, 1,
w/2, h/2, "X") -- fill top left quarter of screen gpu.copy(1, 1, w/2,
h/2, w/2, h/2) -- copy top left quarter of screen to lower right ```

# GPU Color Depth

Color Depth (see `gpu.setDepth` and `gpu.getDepth`) can be 1, 4, or
8 bits separately for foreground and background. These depths provide 2,
16, and 256 colors respectively.

The color value (the `number` passed to `gpu.setBackground` and
`gpu.setForeground`) is interpreted either as a 8 bits per channel rgb
value (24 bit color) or a palette index.

## RGB Color

The background and foreground colors, as set by calling
`setBackground` and `setForeground`, are defined by a `value`
(number) and `is_palette` (boolean) pair (the boolean being optional).

When `is_palette` is false (or `nil`), `value` is interpreted as a
24 bit rgb color (0xRRGGBB), regardless of depth. However, the color is
approximated to the closest available color in the given depth. In
monochrome, zero rounds to zero and all nonzero values round to 1 (and
the configured monochrome color is used). In 4 bit color, the closest
available color in the palette is selected. In 8 bit color the closest
color of the available 256 colors is used. The available 256 colors are
described in the following table:

![](/api/oc-256-color.png){width="768"}

Image by
[Eunomiac](<https://oc.cil.li/index.php?/topic/442-colors-what-determines-colors-i-code-vs-colors-i-get/>)

## Palette Color

When `is_palette` is `true`, `value` is interpreted as palette
index [0, 16). If you switch from a higher bit density to monochrome
note that the color value from the palette is used to determine zero vs
the nonzero monochrome color. It is an error to specify a paletted color
(i.e. an index value and `true`) in 1 bit depth.

## Changing Depth

Note that the original color pair (the value `number` and palette
`bool`) are preserved (background and foreground each) even when
switching bit depths. The actual rendering on the screen will update to
respect the new depth, but the original 24bit rgb value (or palette
index) is not lost. For example, calling `gpu.getBackground` while in
1 bit mode will return the original 24 bit rgb value specified from any
previous color depth.

# Video Ram Buffers

A GPU card has internal memory that you can allocate into pages. You can
specify a custom page size (width and height each must be greater than
zero). The total memory of a GPU is reduced by the width*height of an
allocation. Each tier of gpu has more total memory than the last. Each
page buffer acts like an offscreen [Screen](/component/screen) with its
own width, height, and color. The max color depth of a gpu buffer is
based on the gpu tier. Rebooting a machine releases all bufffers.

Each page buffer has its own index; the gpu finds the next available
index. Index zero (0) has a special meaning, it is reserved for the
screen. Whether a gpu is bound to a screen or not, you can allocate
pages, set them active, and read/write to them. Attaching and detaching
a screen, even binding to a new screen, does not release the gpu pages.
When a computer shuts off or reboots, the pages are released. Each GPU
has its own video memory and pages.

## Budget and Energy Costs

Updates to vram (set, copy, fill, etc) are nearly free. They have no
energy cost and no additional budget cost. Every direct component invoke
(and these gpu methods are direct) has a tiny system minimum budget
cost, but the gpu itself in these vram updates adds no additional cost.
When bitblt'ing the vram to the screen there is some cost, similar to
how updates to the screen normally incur a cost. A dirty (modified) vram
back buffer has a one time budget cost that increases with the size of
the source buffer. Subsequent bitblts from a clean back buffer to the
screen have extremely low costs.

- `getActiveBuffer(): number`

      Returns the index of the currently selected buffer. 0 is reserved
      for the screen, and may return 0 even when there is no screen

- `setActiveBuffer(index: number): number`

      Sets the active buffer to `index`. 0 is reserved for the screen and
      can be set even when there is no screen. Returns nil for an invalid
      index (0 is valid even with no screen)

- `buffers(): table`

      Returns an array of all current page indexes (0 is not included in
      this list, that is reserved for the screen).

- `allocateBuffer([width: number, height: number]): number`

      Allocates a new buffer with dimensions width*heigh (gpu max
      resolution by default). Returns the index of this new buffer or
      error when there is not enough video memory. A buffer can be
      allocated even when there is no screen bound to this gpu. Index 0 is
      always reserved for the screen and thus the lowest possible index of
      an allocated buffer is always 1.

- `freeBuffer([index: number]): boolean`

      Removes buffer at `index` (default: current buffer index). Returns
      true if the buffer was removed. When you remove the currently
      selected buffer, the gpu automatically switches back to index 0
      (reserved for a screen)

- `freeAllBuffers()`

      Removes all buffers, freeing all video memory. The buffer index is
      always 0 after this call.

- `totalMemory(): number`

      Returns the total memory size of the gpu vram. This does not include
      the screen.

- `freeMemory(): number`

      Returns the total free memory not allocated to buffers. This does
      not include the screen.

- `getBufferSize([index: number]): number, number`

      Returns the buffer size at `index` (default: current buffer index).
      Returns the screen resolution for index 0. Returns nil for invalid
      indexes

- `bitblt([dst: number, col: number, row: number, width: number,
height: number, src: number, fromCol: number, fromRow: number])`

      Copy a region from buffer to buffer, screen to buffer, or buffer to
      screen. Defaults:
      -   dst = 0, the screen
      -   col, row = 1,1
      -   width, height = resolution of the destination buffer
      -   src = the current buffer
      -   fromCol, fromRow = 1,1 bitblt should preform very fast on
          repeated use. If the buffer is dirty there is an initial higher
          cost to sync the buffer with the destination object. If you have
          a large number of updates to make with frequent bitblts,
          consider making multiple and smaller buffers. If you plan to use
          a static buffer (one with few or no updatse), then a large
          buffer is just fine. Returns true on success

------------------------------------------------------------------------
