### NetworkController Trait API

- `getCpus():table`

    Get a list of tables representing the available CPUs in the network.

- `getCraftables([filter:table]):table`

    Get a list of known item recipes. These can be used to issue
    crafting requests.

- `getItemsInNetwork([filter:table]):table`

    Get a list of the stored items in the network.

- `store([filter:table,] [dbAddress:string,] [startSlot:number,] [count:number]):bool`

    Store items in the network matching the specified filter in the
    database with the specified address.

- `getFluidsInNetwork():table`

    Get a list of the stored fluids in the network.

- `getAvgPowerInjection():number`

    Get the average power injection into the network.

- `getAvgPowerUsage():number`

    Get the average power usage of the netork.

- `getIdlePowerUsage():number`

    Get the idle power usage of the network.

- `getMaxStoredPower():number`

    Get the maximum stored power in the network.

- `getStoredPower():number`

    Get the stored power in the network.

### Craftable API

- `getItemStack():table`

    Returns the item stack representation of the crafting result.

- `request([amount:int[, prioritizePower:boolean[,cpuName:string]]]):userdata`

    Requests the item to be crafted, returning an object that allows
    tracking the crafting status.

### CraftingStatus API

- `isCanceled():boolean`

    Get whether the crafting request has been canceled.

- `isDone():boolean`

    Get whether the crafting request is done.

### Environment API

- `getEnergyStored():number`

    Returns the amount of stored energy on the connected side.

- `getMaxEnergyStored():number`

    Returns the maximum amount of stored energy on the connected side.

- `canExtract():number`

    Returns whether this component can have energy extracted from the
    connected side.

- `canReceive():number`

    Returns whether this component can receive energy on the connected
    side.

### Interface API

- `getInterfaceConfiguration([slot:number]):table`

    Get the configuration of the interface.

- `setInterfaceConfiguration([slot:number][, database:address,entry:number[, size:number]]):boolean`

    Configure the interface.

### ImportBus API

- `getImportConfiguration(side:number[, slot:number]):boolean`

    Get the configuration of the import bus pointing in the specified
    direction.

- `setImportConfiguration(side:number[, slot:number][,database:address, entry:number]):boolean`

    Configure the import bus pointing in the specified direction to
    import item stacks matching the specified descriptor.

### ExportBus API

- `getExportConfiguration(side:number, [ slot:number]):boolean`

    Get the configuration of the export bus pointing in the specified
    direction.

- `setExportConfiguration(side:number[, slot:number][,database:address, entry:number):boolean`

    Configure the export bus pointing in the specified direction to
    export item stacks matching the specified descriptor.

- `exportIntoSlot(side:number, slot:number):boolean`

    Make the export bus facing the specified direction perform a single
    export operation into the specified slot.
