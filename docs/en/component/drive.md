# Component: Drive

This component is provided by [Floppy Disks](/item/floppy_disk) or [Hard
Disk Drives](/item/hard_disk_drive) in Unmanaged mode (for Managed mode,
see [Filesystem](filesystem))

To switch a managed drive to Unmanaged mode, just right click with the
item in your hand and select Unmanaged mode (Warning: this will wipe the
drive).

Component name: `drive`. Callbacks:

- `readByte(offset:number):number`

    Read a single byte at the specified offset.

- `writeByte(offset:number, value:number)`

    Write a single byte to the specified offset.

- `getSectorSize():number`

    Returns the size of a single sector on the drive, in bytes.

- `getLabel():string`

    Get the current label of the drive.

- `setLabel(value:string):string`

    Sets the label of the drive. Returns the new value, which may be
    truncated.

- `readSector(sector:number):string`

    Read the current contents of the specified sector.

- `writeSector(sector:number, value:string)`

    Write the specified contents to the specified sector.

- `getPlatterCount():number`

    Returns the number of platters in the drive.

- `getCapacity():number`

    Returns the total capacity of the drive, in bytes.