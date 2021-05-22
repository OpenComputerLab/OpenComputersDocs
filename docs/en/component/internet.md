# Component: Internet

This component is provided by the [Internet Card](/item/internet_card)

Component name: `internet`. Callbacks:

- `isTcpEnabled():boolean`

    Returns whether TCP connections can be made (config setting).

- `isHttpEnabled():boolean`

    Returns whether HTTP requests can be made (config setting).

- `connect(address:string[, port:number]):userdata`

    Opens a new TCP connection. Returns the handle of the connection.

- `request(url:string[, postData:string[,
headers:table]]):userdata`

    Sends a new HTTP request. Returns the handle of the connection.

### TCP Socket Object

- `read([n:number]):string`

    Tries to read data from the socket stream. Returns the read byte
    array.

- `close()`

    Closes an open socket stream.

- `write(<data:string>):number`

    Tries to write data to the socket stream. Returns the number of
    bytes written.

- `finishConnect():boolean`

    Ensures a socket is connected. Errors if the connection failed.

- `id():string` Returns the id for this socket.

After calling `finishConnect` or `read`, this socket generates a
signal named `internet_ready` whenever new data is available to be
read. It has one parameter which is the socket id. 

## HTTP Request Object 

- `read([n:number]):string`

    Tries to read data from the response. Returns the read byte array.

- `response():number, string, table`

    Get response code, message and headers.

- `close()`

    Closes an open socket stream.

- `finishConnect():boolean`

    Ensures a response is available. Errors if the connection failed.