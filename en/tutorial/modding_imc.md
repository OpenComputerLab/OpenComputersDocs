## Templates

Templates allow defining recipes for items that can be assembled using the Assembler block. A template defines which slots get displayed in the Assembler GUI based on the item put in its first slot (where e.g. the computer cases go for building robots). The basic layout remains identical, i.e. the assembler is intended as a pure computer/electronical device assembler, with the three sections "containers", "upgrades" and "computer parts" (cards, CPU, RAM, HDDs, etc).

## Registration

The IMC message `registerAssemblerTemplate` takes an NBTTagCompound of the following format:
```
{
  name : `String` // Optional, name of the template, used in logging only.
  select : `String` // Name of a static method that's queried to determine whether the template applies to an item stack.
  validate : `String` // Name of static method to call for checking if assembly may be started. Returns additional lines for the assemble button and text for the status bar.
  assemble : `String` // Name of a static method that is called to create the resulting ItemStack and energy to consume.
  hostClass : `String` // Name of a class or interface that is the environment or implemented by the environment that will represent the assembled device. Passed to HostAware drivers.
  componentSlots : `NBTTagList` {
    `NBTTagCompound` {
      type : `String` // The component type, as a string (see below). None if not specified. Determines which slot background is shown and used for item validation (unless `validate` is specified).
      tier : `Int` // The max supported tier of the slot. Any if not specified.
      validate : `String` // Name of a static method to call for custom validation in `isItemValidForSlot`, for further custom checks, if necessary. If not specified, normal type and tier checks apply.
    } // Up to 9 of these. Use empty tag compounds to skip slots.
  }
  upgradeSlots : `NBTTagList` {
    `NBTTagCompound` {
      tier : `Int` // Same as above.
      validate : `String` // Same as above.
    } // Up to 9 of these. Use empty tag compounds to skip slots.
  }
  containerSlots : `NBTTagList` {
    `NBTTagCompound` {
      tier : `Int` // Same as above.
      validate : `String` // Same as above.
    } // Up to 3 of these. Use empty tag compounds to skip slots.
  }
}
```

Signatures for callbacks:

- Template selector: `boolean select(ItemStack stack)`
- Build validator: `Object[] validate(IInventory inventory)`  
    Values in the returned array: a boolean indicating whether the current configuration is valid for assembly, an IChatComponent to display in the progress bar and an IChatComponent array of lines to display in the assemble button tooltip. All are optional, defaulting to false, null and empty, respectively.
- Assembly callback: `Object[] assemble(IInventory inventory)`  
    Values in the returned array: the ItemStack to produce and a Double value, indicating the energy to consume (and thus the time it takes to build the object).
- Slot validator: `boolean validate(IInventory inventory, int slot, int tier, ItemStack stack)`  
    Where `inventory` is the inventory of the assembler, `slot` is the slot index the item stack `stack` should be inserted into, and `tier` is the tier specified in template's NBT for the slot.

## Inventory Layout

The inventory passed to the callbacks is the inventory of the assembler. It is arranged as follows:

- 0: The "base item" that was used to select the template, e.g. a computer case.
- 1-3: Containers.
- 4-12: Upgrades.
- 13-21: Components.

## Slot Types and Tiers

Slot types are passed as string constants (which is what the overall API will transition to in 1.4, away from the Slot enum, by the way). These are the applicable built-in slot types for components accepted by the template:

- `none`: No slot / slot will be unavailable.
- `card`: Card slot.
- `component_bus`: Component Bus slot.
- `container`: Container slot.
- `cpu`: CPU slot.
- `floppy`: Floppy slot.
- `hdd`: HDD slot.
- `memory`: Memory slot.
- `upgrade`: Upgrade slot.

Tiers are simply numeric, starting with `0` as tier 1 and ending with `2` as tier 3. `Int.MaxInt` / `Integer.MAX_VALUE` indicate "any tier", meaning no tier indicator will be shown in the GUI slot.

## Disassembly

`registerDisassemblerTemplate` takes an NBT tag with the following format:
```
{
  name : `String` // This is optional, used only in logging.
  select : `String` // Name of static method to call for checking if a stack can be disassembled.
  disassemble : `String` // Name of static method to call to to get results for a disassembly operation.
}
```

Signatures for callbacks:

- `boolean select(ItemStack stack)`  
  Gets the stack to check for validity, returns true if the stack can be disassembled.
- `ItemStack[] disassemble(ItemStack stack, ItemStack[] ingredients)`  
  Compute the items to output from the disassembler for the specified item stack. The passed list of ingredients is for convenience, and is what OC thinks are the inputs used to craft the passed item stack. The general idea is that you can return that list *plus* additional items, such as stuff that was "in" the passed stack, if the stack has some kind of inventory (e.g. for servers the installed components are also returned).

It will be called whenever *any* item is disassembled, and should only return a list of (additional) ingredients where appropriate. It will also be called to check if an item can be disassembled at all.

## Examples

In your `FMLInitializationEvent` handler:
```java
NBTCompoundTag nbt = new NBTCompoundTag();
nbt.setString("select", "com.example.mod.Callbacks.ocAssemblerSelect");
nbt.setString("validate", "com.example.mod.Callbacks.ocAssemblerValidate");
nbt.setString("assemble", "com.example.mod.Callbacks.ocAssemblerAssemble");
// ...
FMLInterModComms.sendMessage("OpenComputers", "registerDisassemblerTemplate", nbt);
```

Be careful to use a separate NBT compound for each registered template, since they are evaluated when the IMC message is received by OC, which happens asynchronously at a later point in time.

For a "reference" implementation, see how the [robot templates are implemented](https://github.com/MightyPirates/OpenComputers/blob/master/src/main/scala/li/cil/oc/common/template/RobotTemplate.scala).