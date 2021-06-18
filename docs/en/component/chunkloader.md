# Component: Chunkloader

This component is provided by the
[chunkloader upgrade](/item/chunkloader_upgrade).

Component name: `chunkloader`. Callbacks:

- `isActive():boolean`

    Returns whether the chunkloader is currently active.

- `setActive(enabled:boolean):boolean`

    Enables or disables the chunkloader. Returns the new state, which
    may be false if no chunk loading ticket could be acquired.