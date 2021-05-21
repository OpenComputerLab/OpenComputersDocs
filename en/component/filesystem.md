# Component: Filesystem

This component is provided by [Floppy Disks](/item/floppy_disk) or [Hard
Disk Drives](/item/hard_disk_drive) in Managed mode (for Unmanaged mode,
see [Drive](drive))

Component name: `filesystem`. Callbacks:

- `spaceUsed():number`

      The currently used capacity of the file system, in bytes.

- `open(path:string[, mode:string='r']):number`

      Opens a new file descriptor and returns its handle.

- `seek(handle:number, whence:string, offset:number):number`

      Seeks in an open file descriptor with the specified handle. Returns
      the new pointer position.

- `makeDirectory(path:string):boolean`

      Creates a directory at the specified absolute path in the file
      system. Creates parent directories, if necessary.

- `exists(path:string):boolean`

      Returns whether an object exists at the specified absolute path in
      the file system.

- `isReadOnly():boolean`

      Returns whether the file system is read-only.

- `write(handle:number, value:string):boolean`

      Writes the specified data to an open file descriptor with the
      specified handle.

- `spaceTotal():number`

      The overall capacity of the file system, in bytes.

- `isDirectory(path:string):boolean`

      Returns whether the object at the specified absolute path in the
      file system is a directory.

- `rename(from:string, to:string):boolean`

      Renames/moves an object from the first specified absolute path in
      the file system to the second.

- `list(path:string):table`

      Returns a list of names of objects in the directory at the specified
      absolute path in the file system.

- `lastModified(path:string):number`

      Returns the (real world) timestamp of when the object at the
      specified absolute path in the file system was modified.

- `getLabel():string`

      Get the current label of the file system.

- `remove(path:string):boolean`

      Removes the object at the specified absolute path in the file
      system.

- `close(handle:number)`

      Closes an open file descriptor with the specified handle.

- `size(path:string):number`

      Returns the size of the object at the specified absolute path in the
      file system.

- `read(handle:number, count:number):string or nil`

      Reads up to the specified amount of data from an open file
      descriptor with the specified handle. Returns nil when EOF is
      reached.

- `setLabel(value:string):string`

      Sets the label of the file system. Returns the new value, which may
      be truncated.

------------------------------------------------------------------------

# Component: Filesystem

This component is provided by [Floppy Disks](/item/floppy_disk) or [Hard
Disk Drives](/item/hard_disk_drive) in Managed mode (for Unmanaged mode,
see [Drive](drive))

Component name: `filesystem`. Callbacks:

- `spaceUsed():number`

      The currently used capacity of the file system, in bytes.

- `open(path:string[, mode:string='r']):number`

      Opens a new file descriptor and returns its handle.

- `seek(handle:number, whence:string, offset:number):number`

      Seeks in an open file descriptor with the specified handle. Returns
      the new pointer position.

- `makeDirectory(path:string):boolean`

      Creates a directory at the specified absolute path in the file
      system. Creates parent directories, if necessary.

- `exists(path:string):boolean`

      Returns whether an object exists at the specified absolute path in
      the file system.

- `isReadOnly():boolean`

      Returns whether the file system is read-only.

- `write(handle:number, value:string):boolean`

      Writes the specified data to an open file descriptor with the
      specified handle.

- `spaceTotal():number`

      The overall capacity of the file system, in bytes.

- `isDirectory(path:string):boolean`

      Returns whether the object at the specified absolute path in the
      file system is a directory.

- `rename(from:string, to:string):boolean`

      Renames/moves an object from the first specified absolute path in
      the file system to the second.

- `list(path:string):table`

      Returns a list of names of objects in the directory at the specified
      absolute path in the file system.

- `lastModified(path:string):number`

      Returns the (real world) timestamp of when the object at the
      specified absolute path in the file system was modified.

- `getLabel():string`

      Get the current label of the file system.

- `remove(path:string):boolean`

      Removes the object at the specified absolute path in the file
      system.

- `close(handle:number)`

      Closes an open file descriptor with the specified handle.

- `size(path:string):number`

      Returns the size of the object at the specified absolute path in the
      file system.

- `read(handle:number, count:number):string or nil`

      Reads up to the specified amount of data from an open file
      descriptor with the specified handle. Returns nil when EOF is
      reached.

- `setLabel(value:string):string`

      Sets the label of the file system. Returns the new value, which may
      be truncated.

------------------------------------------------------------------------
