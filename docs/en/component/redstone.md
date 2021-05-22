# Component: Redstone

This component represents a [Redstone card](/item/redstone_card).

The tier one Redstone Card only supports vanilla redstone functionality
(single-line analog redstone). Tier two provides interoperation with
other mods' redstone systems (bundled, wireless). For bundled
input/output we currently only support ProjectRed for Minecraft 1.12. In
older versions we supported: RedLogic, Project Red (with Version 1.1),
MineFactory Reloaded. For wireless redstone, the following mods are
supported: WR-CBE, SlimeVoid's WR.

#### get* and set* method overloads

Starting in patch release 1.7.3 the redstone component provides
overloaded flavors of `getInput`, `getOuput`, `setInput`,
`getBundledInput`, `getBundledOutput`, and `setBundledOutput`.

#### get* and set* call costs

The **get** methods are "direct" calls and are practically free. From
testing I was able to call `getInput` 20,000 to 22,000 times per
second.

The **set** methods are not "direct", and thus can only be called once
per tick, at most. Thus, ~20 times per second. In addition to their
indirect cost (consuming the rest of the tick) if the **set** call
changes any output levels, there is an additional delay imposed on the
machine. By default **set** calls can change outputs approximately 6
times per second.

One of the significant advantages of using these overloaded variants is
that any api call cost is paid once per call, not once per each value
set.

Component name: `redstone`. Callbacks:

- `getInput(side: number): number`

      `getInput(): table`

      Returns current incoming (non-bundled) redstone values.
      `getInput(side)` returns the redstone level from the specified
      [[api:sides|side]]. `getInput()` returns a table of redstone
      levels from all sides.

      Note that the table returned is zero based. That is because the keys
      of the table are the ordinal values of the sides, and `sides.bottom`
      is 0.

      Note also that the side is relative to the computer's orientation,
      i.e. `sides.south` is *in front of the computer*, not south in the
      world. Likewise, `sides.left` is to the left of the computer, so
      when you look at the computer's front, it'll be to your right.

      If you use mods such as RedLogic the input may exceed the vanilla
      values of [0, 15].

``` lua> component.redstone.getInput(sides.left) 15 lua>
component.redstone.getInput(sides.right) 4 lua>
component.redstone.getInput() {[0]=7, 0, 0, 0, 4, 15} lua>
component.redstone.getInput()[sides.bottom] 7 ```

- `getOutput(side: number): number`

      `getOutput(): table`
      Gets the currently set output on the specified side, or the set
      value of all sides if called with no arguments

``` lua> component.redstone.getOutput(sides.left) 7 lua>
component.redstone.getOutput() [sides.left] 7 ```

- `setOutput(side: number, value: number): number`

      `setOutput(values: table): table`

      Sets the strength of the redstone signal to emit. Returns the
      **old** value. This can be an arbitrarily large number for mods that
      support this. The first variant of this method takes a
      [[api:sides|side]] and the redstone strength to apply to just
      that side. `setOutput(values)` allows you to set the redstone
      strength of all sides (or a subset of sides) in a single call.

- `getBundledInput(side: number, color: number): number`

      `getBundledInput(side: number): table`
      `getBundledInput(): table`

      Like `getInput`, but for bundled input, reading the value for the
      channel with the specified [[api:colors|API/Colors]]. //As of
      OC 1.3: only available on a tier two redstone card.//

      `getBundledInput(side, color)` returns the strength of the incoming
      redstone value on the specified side on the specified color
      channel.
      `getBundledInput(side)` returns a table (Map[Int, Int] structure)
      of redstone values on the specified side in a bundled pack, indexed
      by color.
      `getBundledInput()` returns all redstone values, of all sides and
      all colors. It is a Map[Int, Map[Int, Int]] structure. The top
      level keys are in [0, 5] range, values of [[api:sides|sides]]
      (keep in mind sides.bottom is zero). The child map of each side is
      the same data structure returned by `getBundledInput(side)`.

- `getBundledOutput(side: number, color: number): number`

      `getBundledOutput(side: number): table`
      `getBundledOutput(): table`
      Like `getOutput`, but for bundled output, getting the values
      previously set that the device is emitting. //As of OC 1.3: only
      available on a tier two redstone card.//

- `setBundledOutput(side: number, color: number, value: number):
number`

      Like `setOutput`, but for bundled output, setting the value for the
      channel with the specified [[api:colors|API/Colors]]. Returns
      the previous values set. `setBundledOutput(side, values)` sets a
      pack of color-indexed redstone values, [0, 15]. `colors.white` is
      zero. The values table doesn't have to be contiguous, and values
      omitted are left unchanged. `setBundledOutput(values)` allows you to
      set redstone levels for any side and any color in a single api
      call. //As of OC 1.3: only available on a tier two redstone
      card.//

``` lua> component.redstone.setBundledOutput(sides.left, {
[colors.white] = 15 } ) -- only sets 1 output lua>
component.redstone.setBundledOutput({ [sides.left] = {
[colors.white] = 15 } } ) -- same as above ```

- `getComparatorInput(side:number):number`

      Get the comparator input on the specified side.

- `getWirelessInput():number`

      Get the wireless redstone input. //Added in OC 1.3. Only available
      on tier two redstone cards.//

- `getWirelessOutput():boolean`

      Get the wireless redstone output. //Added in OC 1.3. Only
      available on tier two redstone cards.//

- `setWirelessOutput(value:boolean):boolean`

      Set the wireless redstone output. //Added in OC 1.3. Only
      available on tier two redstone cards.//

- `getWirelessFrequency():number`

      Get the currently set wireless redstone frequency. //Added in OC
      1.3. Only available on tier two redstone cards.//

- `setWirelessFrequency(frequency:number):number`

      Set the wireless redstone frequency to use. //Added in OC 1.3.
      Only available on tier two redstone cards.//

- `getWakeThreshold():number`

      Gets the current wake-up threshold.

- `setWakeThreshold(threshold:number):number`

      Sets the wake-up threshold to the specified number.

Note that for mods such as ProjectRed, low values (such as the vanilla
maximum of 15) may not function as expected for simple on/off values
(opening a door for example), because they have a larger value range.
You may need to use a higher value, such as 255.

Example use:

``` local component = require("component") local sides =
require("sides") local colors = require("colors") local rs =
component.redstone -- get primary redstone component
print(rs.getInput(sides.back)) rs.setBundledOutput(sides.bottom,
colors.green, rs.getBundledInput(sides.top, colors.red)) ```

------------------------------------------------------------------------

# Component: Redstone

This component represents a [Redstone card](/item/redstone_card).

The tier one Redstone Card only supports vanilla redstone functionality
(single-line analog redstone). Tier two provides interoperation with
other mods' redstone systems (bundled, wireless). For bundled
input/output we currently only support ProjectRed for Minecraft 1.12. In
older versions we supported: RedLogic, Project Red (with Version 1.1),
MineFactory Reloaded. For wireless redstone, the following mods are
supported: WR-CBE, SlimeVoid's WR.

#### get* and set* method overloads

Starting in patch release 1.7.3 the redstone component provides
overloaded flavors of `getInput`, `getOuput`, `setInput`,
`getBundledInput`, `getBundledOutput`, and `setBundledOutput`.

#### get* and set* call costs

The **get** methods are "direct" calls and are practically free. From
testing I was able to call `getInput` 20,000 to 22,000 times per
second.

The **set** methods are not "direct", and thus can only be called once
per tick, at most. Thus, ~20 times per second. In addition to their
indirect cost (consuming the rest of the tick) if the **set** call
changes any output levels, there is an additional delay imposed on the
machine. By default **set** calls can change outputs approximately 6
times per second.

One of the significant advantages of using these overloaded variants is
that any api call cost is paid once per call, not once per each value
set.

Component name: `redstone`. Callbacks:

- `getInput(side: number): number`

      `getInput(): table`

      Returns current incoming (non-bundled) redstone values.
      `getInput(side)` returns the redstone level from the specified
      [[api:sides|side]]. `getInput()` returns a table of redstone
      levels from all sides.

      Note that the table returned is zero based. That is because the keys
      of the table are the ordinal values of the sides, and `sides.bottom`
      is 0.

      Note also that the side is relative to the computer's orientation,
      i.e. `sides.south` is *in front of the computer*, not south in the
      world. Likewise, `sides.left` is to the left of the computer, so
      when you look at the computer's front, it'll be to your right.

      If you use mods such as RedLogic the input may exceed the vanilla
      values of [0, 15].

``` lua> component.redstone.getInput(sides.left) 15 lua>
component.redstone.getInput(sides.right) 4 lua>
component.redstone.getInput() {[0]=7, 0, 0, 0, 4, 15} lua>
component.redstone.getInput()[sides.bottom] 7 ```

- `getOutput(side: number): number`

      `getOutput(): table`
      Gets the currently set output on the specified side, or the set
      value of all sides if called with no arguments

``` lua> component.redstone.getOutput(sides.left) 7 lua>
component.redstone.getOutput() [sides.left] 7 ```

- `setOutput(side: number, value: number): number`

      `setOutput(values: table): table`

      Sets the strength of the redstone signal to emit. Returns the
      **old** value. This can be an arbitrarily large number for mods that
      support this. The first variant of this method takes a
      [[api:sides|side]] and the redstone strength to apply to just
      that side. `setOutput(values)` allows you to set the redstone
      strength of all sides (or a subset of sides) in a single call.

- `getBundledInput(side: number, color: number): number`

      `getBundledInput(side: number): table`
      `getBundledInput(): table`

      Like `getInput`, but for bundled input, reading the value for the
      channel with the specified [[api:colors|API/Colors]]. //As of
      OC 1.3: only available on a tier two redstone card.//

      `getBundledInput(side, color)` returns the strength of the incoming
      redstone value on the specified side on the specified color
      channel.
      `getBundledInput(side)` returns a table (Map[Int, Int] structure)
      of redstone values on the specified side in a bundled pack, indexed
      by color.
      `getBundledInput()` returns all redstone values, of all sides and
      all colors. It is a Map[Int, Map[Int, Int]] structure. The top
      level keys are in [0, 5] range, values of [[api:sides|sides]]
      (keep in mind sides.bottom is zero). The child map of each side is
      the same data structure returned by `getBundledInput(side)`.

- `getBundledOutput(side: number, color: number): number`

      `getBundledOutput(side: number): table`
      `getBundledOutput(): table`
      Like `getOutput`, but for bundled output, getting the values
      previously set that the device is emitting. //As of OC 1.3: only
      available on a tier two redstone card.//

- `setBundledOutput(side: number, color: number, value: number):
number`

      Like `setOutput`, but for bundled output, setting the value for the
      channel with the specified [[api:colors|API/Colors]]. Returns
      the previous values set. `setBundledOutput(side, values)` sets a
      pack of color-indexed redstone values, [0, 15]. `colors.white` is
      zero. The values table doesn't have to be contiguous, and values
      omitted are left unchanged. `setBundledOutput(values)` allows you to
      set redstone levels for any side and any color in a single api
      call. //As of OC 1.3: only available on a tier two redstone
      card.//

``` lua> component.redstone.setBundledOutput(sides.left, {
[colors.white] = 15 } ) -- only sets 1 output lua>
component.redstone.setBundledOutput({ [sides.left] = {
[colors.white] = 15 } } ) -- same as above ```

- `getComparatorInput(side:number):number`

      Get the comparator input on the specified side.

- `getWirelessInput():number`

      Get the wireless redstone input. //Added in OC 1.3. Only available
      on tier two redstone cards.//

- `getWirelessOutput():boolean`

      Get the wireless redstone output. //Added in OC 1.3. Only
      available on tier two redstone cards.//

- `setWirelessOutput(value:boolean):boolean`

      Set the wireless redstone output. //Added in OC 1.3. Only
      available on tier two redstone cards.//

- `getWirelessFrequency():number`

      Get the currently set wireless redstone frequency. //Added in OC
      1.3. Only available on tier two redstone cards.//

- `setWirelessFrequency(frequency:number):number`

      Set the wireless redstone frequency to use. //Added in OC 1.3.
      Only available on tier two redstone cards.//

- `getWakeThreshold():number`

      Gets the current wake-up threshold.

- `setWakeThreshold(threshold:number):number`

      Sets the wake-up threshold to the specified number.

Note that for mods such as ProjectRed, low values (such as the vanilla
maximum of 15) may not function as expected for simple on/off values
(opening a door for example), because they have a larger value range.
You may need to use a higher value, such as 255.

Example use:

``` local component = require("component") local sides =
require("sides") local colors = require("colors") local rs =
component.redstone -- get primary redstone component
print(rs.getInput(sides.back)) rs.setBundledOutput(sides.bottom,
colors.green, rs.getBundledInput(sides.top, colors.red)) ```

------------------------------------------------------------------------
