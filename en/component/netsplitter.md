# Component: Net Splitter

This component is provided by the [Net Splitter](/block/net_splitter).

The net splitter connects networks, just like a cable. But the net
splitter faces can be opened or closed, separating networks. A redstone
signal inverts the faces. A scrench can be used to open/close a face.
The net splitter also has an api to configure the faces.

Component name: `net_splitter`. Callbacks:

- `open(side: number):number`

      Open the side, returns true if it changed to open.

- `close():number`

      Close the side, returns true if it changed to close.

- `getSides():table`

      Returns current open/close state of all sides in an array, indexed
      by direction.

- `setSides(settings: table):table`

      set open state (true/false) of all sides in an array; index by
      direction. Returns previous states.

------------------------------------------------------------------------

# Component: Net Splitter

This component is provided by the [Net Splitter](/block/net_splitter).

The net splitter connects networks, just like a cable. But the net
splitter faces can be opened or closed, separating networks. A redstone
signal inverts the faces. A scrench can be used to open/close a face.
The net splitter also has an api to configure the faces.

Component name: `net_splitter`. Callbacks:

- `open(side: number):number`

      Open the side, returns true if it changed to open.

- `close():number`

      Close the side, returns true if it changed to close.

- `getSides():table`

      Returns current open/close state of all sides in an array, indexed
      by direction.

- `setSides(settings: table):table`

      set open state (true/false) of all sides in an array; index by
      direction. Returns previous states.

------------------------------------------------------------------------
