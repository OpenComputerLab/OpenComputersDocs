# Internet API

This library wraps functionality of Internet cards. Also see the
[Internet Component](/component/internet) for more low level
functionality (such as querying availability of HTTP and TCP
functionality).

- `internet.request(url: string[, data: string or table[, headers:
table[, method: string]]]): function`

      Sends an HTTP request to the specified URL, with the specified POST
      data, if any. If no data is specified, a GET request will be made.
      The POST data can be in one of two formats: if it's a string, it
      will be sent as-is. If it's a table, it will be converted to a
      string by assuming that each key is the name of a POST variable, and
      it's associated value is the value for that variable. **method**
      can be explicitly specified to values such as GET, POST, or PUT.
      Some examples:
      `internet.request(url, {some = "variable", another = 1})`
      Will send `some=variable&another=1`.
      The returned function is an iterator over chunks of the result, use
      it like so:
      `for chunk in internet.request(...) do stuff() end`
      Note that **this method ALSO support HTTPS**. So simply use
      `internet.request("https://example.com")` to send a request through
      HTTPS.

      Example specifying PUT:
      `internet.request("https://example.com", "put data", {}, "PUT")`.

- `internet.socket(address:string[, port:number]):table`

      Opens a TCP socket using an internet component's `connect` method
      and wraps it in a table that provides the same methods as a file
      opened using `filesystem.open`: `read`, `write` and `close` (and
      `seek`, which will always fail). It is recommended to use
      `internet.open` instead, which will wrap the opened socket in a
      [[api:buffer|buffer]], the same way `io.open` wraps files.
      The read method on the returned socket is *non-blocking*. Read will
      instantly return, but may return an empty string if there is nothing
      to read. Write *may* block until all data has been successfully
      written. It'll *usually* return immediately, though.

- `internet.open(address:string[, port:number]):table`

      Opens a buffered socket stream to the specified address. The stream
      can be read from and written from, using `s:read` and `s:write` - in
      general it can be treated much like files opened using `io.open`. It
      may often be desirable to set the buffer's read timeout using
      `s:setTimeout(seconds)`, to avoid it blocking indefinitely. The read
      method on the returned buffer is *blocking*. Read will wait until
      some data is available to be read and return that.
      Example usage:

``` local internet = require("internet") local handle =
internet.open("example.com", 1337) local data = handle:read(10)
handle:write("1234") handle:close() ```

If you need the HTTP response code, message, and headers, they are
retrieved from the internal object, which is stored in the metatable of
the returned object.

``` --
<https://github.com/kikito/inspect.lua/blob/master/inspect.lua> local
inspect = require("inspect") local internet = require("internet")

local handle = internet.request("<https://www.google.com>") local
result = "" for chunk in handle do result = result..chunk end --
Print the body of the HTTP response -- print(result)

-- Grab the metatable for the handle. This contains the -- internal
HTTPRequest object. local mt = getmetatable(handle)

-- The response method grabs the information for -- the HTTP response
code, the response message, and the -- response headers. local code,
message, headers = mt.__index.response() print("code =
"..tostring(code)) print("message = "..tostring(message))
print(inspect(headers)) ```

This is an example of a basic IRC bot that echos back what you say to
it, using the sockets in the internet api.

``` --this is just a basic split function we'll use to split the
messages function split(data, pat)

      local ret = {}
      for i in string.gmatch(data,pat) do
          table.insert(ret,i)
      end
      return ret

end --config local nickname = "myircbot" local channel =
"#mybotchannel"

local net = require("internet") local con =
net.open("irc.esper.net",6667) --define server / port here, this will
connect to the server if(con) then

      local line,png,linesplt,msgfrom = ""
      while(true) do
          line = con:read() --read a line from the socket
          print(line)
          linesplt = split(line,"[^:]+")
          if #linesplt >= 2 and string.find(linesplt[2], "No Ident response") ~= nil then
              print("JOIN")
              con:write("USER " .. nickname .. " 0 * :" .. nickname .. "rn") --con:write(msg) is used to send messages, con:read() will read a line
              con:write("NICK " .. nickname .. "rn") --for IRC, remember to append the rn on the end of all messages
              con:write("JOIN :" .. channel .. "rn")
          elseif linesplt[1] == "PING" or linesplt[1] == "PING " then
              print("PING")
              png = split(line,"[^:]+")
              con:write("PONG :"..png[#png].."rn") --respond to pings so we don't get disconnected
          elseif string.find(linesplt[1], "PRIVMSG #") ~= nil then
              msgfrom = split(linesplt[1],"[^ ]+")
              msgfrom = msgfrom[3]
              con:write("PRIVMSG "..msgfrom.." :"..linesplt[2].."rn")
          end
      end

else

      print("Connection failed.")

end ```

For a more advanced example, check out the IRC Client program available
in the latest release of OpenComputers:
[irc.lua](<https://github.com/MightyPirates/OpenComputers/blob/master-MC1.7.10/src/main/resources/assets/opencomputers/loot/irc/usr/bin/irc.lua>)

## Contents

# Internet API

This library wraps functionality of Internet cards. Also see the
[Internet Component](/component/internet) for more low level
functionality (such as querying availability of HTTP and TCP
functionality).

- `internet.request(url: string[, data: string or table[, headers:
table[, method: string]]]): function`

      Sends an HTTP request to the specified URL, with the specified POST
      data, if any. If no data is specified, a GET request will be made.
      The POST data can be in one of two formats: if it's a string, it
      will be sent as-is. If it's a table, it will be converted to a
      string by assuming that each key is the name of a POST variable, and
      it's associated value is the value for that variable. **method**
      can be explicitly specified to values such as GET, POST, or PUT.
      Some examples:
      `internet.request(url, {some = "variable", another = 1})`
      Will send `some=variable&another=1`.
      The returned function is an iterator over chunks of the result, use
      it like so:
      `for chunk in internet.request(...) do stuff() end`
      Note that **this method ALSO support HTTPS**. So simply use
      `internet.request("https://example.com")` to send a request through
      HTTPS.

      Example specifying PUT:
      `internet.request("https://example.com", "put data", {}, "PUT")`.

- `internet.socket(address:string[, port:number]):table`

      Opens a TCP socket using an internet component's `connect` method
      and wraps it in a table that provides the same methods as a file
      opened using `filesystem.open`: `read`, `write` and `close` (and
      `seek`, which will always fail). It is recommended to use
      `internet.open` instead, which will wrap the opened socket in a
      [[api:buffer|buffer]], the same way `io.open` wraps files.
      The read method on the returned socket is *non-blocking*. Read will
      instantly return, but may return an empty string if there is nothing
      to read. Write *may* block until all data has been successfully
      written. It'll *usually* return immediately, though.

- `internet.open(address:string[, port:number]):table`

      Opens a buffered socket stream to the specified address. The stream
      can be read from and written from, using `s:read` and `s:write` - in
      general it can be treated much like files opened using `io.open`. It
      may often be desirable to set the buffer's read timeout using
      `s:setTimeout(seconds)`, to avoid it blocking indefinitely. The read
      method on the returned buffer is *blocking*. Read will wait until
      some data is available to be read and return that.
      Example usage:

``` local internet = require("internet") local handle =
internet.open("example.com", 1337) local data = handle:read(10)
handle:write("1234") handle:close() ```

If you need the HTTP response code, message, and headers, they are
retrieved from the internal object, which is stored in the metatable of
the returned object.

``` --
<https://github.com/kikito/inspect.lua/blob/master/inspect.lua> local
inspect = require("inspect") local internet = require("internet")

local handle = internet.request("<https://www.google.com>") local
result = "" for chunk in handle do result = result..chunk end --
Print the body of the HTTP response -- print(result)

-- Grab the metatable for the handle. This contains the -- internal
HTTPRequest object. local mt = getmetatable(handle)

-- The response method grabs the information for -- the HTTP response
code, the response message, and the -- response headers. local code,
message, headers = mt.__index.response() print("code =
"..tostring(code)) print("message = "..tostring(message))
print(inspect(headers)) ```

This is an example of a basic IRC bot that echos back what you say to
it, using the sockets in the internet api.

``` --this is just a basic split function we'll use to split the
messages function split(data, pat)

      local ret = {}
      for i in string.gmatch(data,pat) do
          table.insert(ret,i)
      end
      return ret

end --config local nickname = "myircbot" local channel =
"#mybotchannel"

local net = require("internet") local con =
net.open("irc.esper.net",6667) --define server / port here, this will
connect to the server if(con) then

      local line,png,linesplt,msgfrom = ""
      while(true) do
          line = con:read() --read a line from the socket
          print(line)
          linesplt = split(line,"[^:]+")
          if #linesplt >= 2 and string.find(linesplt[2], "No Ident response") ~= nil then
              print("JOIN")
              con:write("USER " .. nickname .. " 0 * :" .. nickname .. "rn") --con:write(msg) is used to send messages, con:read() will read a line
              con:write("NICK " .. nickname .. "rn") --for IRC, remember to append the rn on the end of all messages
              con:write("JOIN :" .. channel .. "rn")
          elseif linesplt[1] == "PING" or linesplt[1] == "PING " then
              print("PING")
              png = split(line,"[^:]+")
              con:write("PONG :"..png[#png].."rn") --respond to pings so we don't get disconnected
          elseif string.find(linesplt[1], "PRIVMSG #") ~= nil then
              msgfrom = split(linesplt[1],"[^ ]+")
              msgfrom = msgfrom[3]
              con:write("PRIVMSG "..msgfrom.." :"..linesplt[2].."rn")
          end
      end

else

      print("Connection failed.")

end ```

For a more advanced example, check out the IRC Client program available
in the latest release of OpenComputers:
[irc.lua](<https://github.com/MightyPirates/OpenComputers/blob/master-MC1.7.10/src/main/resources/assets/opencomputers/loot/irc/usr/bin/irc.lua>)

## Contents
