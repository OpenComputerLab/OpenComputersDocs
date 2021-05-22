# Component Access

This page describes how to get access to a [component's
API](/component) from Lua. To recap: components are blocks or items that
provide some API to Lua programs running on computers connected to said
component.

## Addresses

Components all have an address. This address is a UUID, a unique
identifier. In most cases it is OK to abbreviate these addresses. For
example to get the full address from an abbreviated one you can use
`component.get`. To get the address of any block in particular, you
can use the [Analyzer](/item/analyzer) by holding the control key while
right clicking the block.

To get a list of all components attached to your computer you can do
this:

``` Lua 5.2.3 Copyright (C) 1994-2013 Lua.org, PUC-Rio lua> local
component = require("component") lua> for k,v in component.list() do
print(k, v) end xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx keyboard
xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx screen
xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx gpu ... ```

Note that item components will usually keep their address even when
removed from a computer. So when removing a hard drive and inserting it
back in, it will have the same address as before. This is *not* the
case for block components, they will always get a new address after
being broken and placed again.

Optionally you can filter components list like this:

This code will add every component which name contains "adar" such as
computronics radar or warpDrive radar to the local radars table

``` local component = require("component") local radars = {} for
address, name in component.list("adar", false) do

    table.insert(radars, component.proxy(address))

end ```

This code will add all connected warpDrive radars only to the local
radars table

``` local component = require("component") local radars = {} for
address, name in component.list("warpdriveRadar", true) do

    table.insert(radars, component.proxy(address))

end ```

## Primary Components

The [component API](/api/component) keeps track of one component of each
type as a "primary" component. If there are multiple components of the
same type, which one will be the primary component is random. You can
access the primary component of a specific type via `component.xxx`,
where `xxx` is the type. For example:

``` lua> =component.gpu.address xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

Alternatively you can use `component.getPrimary("xxx")`. Just keep
in mind that this will throw an error if there is no primary component
for the specified type, so you may wish to check that with
`component.isAvailable("xxx")` first. Having it throw an error is
usually clearer than getting a nil dereference later on.

This system is in mainly place to allow the OS to pick the screen to
initially output to.

## Proxies

So now that we know how to get the address of components, let's see how
we can interact with them. There are two ways to go about this. One is
to call `component.invoke(address, method, ...)`. For example:

``` local component = require("component")
component.invoke(modemAddress, "broadcast", port, data) ```

The preferred way will usually be to get a proxy, however. A proxy is
simply a table that provides one function for each API callback, named
after that callback. In addition, each proxy has two fields:
`address`, which holds the address of the wrapped component, and
`type`, which holds the type of the component. You can get a proxy
like this:

``` local component = require("component") local proxy =
component.proxy(address)

-- The call above using the proxy: proxy.broadcast(port, data)

-- The common proxy fields: print(proxy.address) -- address passed to
component.proxy above print(proxy.type) -- "modem" ```

Note that each primary component you access via `component.getPrimary`
or `component.xxx` is in fact a proxy.

## Direct Calls

Some component callbacks can be performed as "direct calls". Direct
calls are performed in the computer's worker thread, meaning they will
return instantly. Normal calls are delegated to the main server thread,
to avoid race conditions and other threading issues, which also means
that normal calls will take up to one tick (i.e. 50 ms). Just to be
clear: this only applies to component APIs.

## Signals

An important part of interacting with components are [Signals](signals).
These can be queued by components to notify computers of external
changes and events. For example, user input is forwarded to computers
via signals. Computers can also queue their own signals, which can be
useful for code-reuse, or just notifying other parts of your code
asynchronously.

## Contents

# Component Access

This page describes how to get access to a [component's
API](/component) from Lua. To recap: components are blocks or items that
provide some API to Lua programs running on computers connected to said
component.

## Addresses

Components all have an address. This address is a UUID, a unique
identifier. In most cases it is OK to abbreviate these addresses. For
example to get the full address from an abbreviated one you can use
`component.get`. To get the address of any block in particular, you
can use the [Analyzer](/item/analyzer) by holding the control key while
right clicking the block.

To get a list of all components attached to your computer you can do
this:

``` Lua 5.2.3 Copyright (C) 1994-2013 Lua.org, PUC-Rio lua> local
component = require("component") lua> for k,v in component.list() do
print(k, v) end xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx keyboard
xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx screen
xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx gpu ... ```

Note that item components will usually keep their address even when
removed from a computer. So when removing a hard drive and inserting it
back in, it will have the same address as before. This is *not* the
case for block components, they will always get a new address after
being broken and placed again.

Optionally you can filter components list like this:

This code will add every component which name contains "adar" such as
computronics radar or warpDrive radar to the local radars table

``` local component = require("component") local radars = {} for
address, name in component.list("adar", false) do

    table.insert(radars, component.proxy(address))

end ```

This code will add all connected warpDrive radars only to the local
radars table

``` local component = require("component") local radars = {} for
address, name in component.list("warpdriveRadar", true) do

    table.insert(radars, component.proxy(address))

end ```

## Primary Components

The [component API](/api/component) keeps track of one component of each
type as a "primary" component. If there are multiple components of the
same type, which one will be the primary component is random. You can
access the primary component of a specific type via `component.xxx`,
where `xxx` is the type. For example:

``` lua> =component.gpu.address xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

Alternatively you can use `component.getPrimary("xxx")`. Just keep
in mind that this will throw an error if there is no primary component
for the specified type, so you may wish to check that with
`component.isAvailable("xxx")` first. Having it throw an error is
usually clearer than getting a nil dereference later on.

This system is in mainly place to allow the OS to pick the screen to
initially output to.

## Proxies

So now that we know how to get the address of components, let's see how
we can interact with them. There are two ways to go about this. One is
to call `component.invoke(address, method, ...)`. For example:

``` local component = require("component")
component.invoke(modemAddress, "broadcast", port, data) ```

The preferred way will usually be to get a proxy, however. A proxy is
simply a table that provides one function for each API callback, named
after that callback. In addition, each proxy has two fields:
`address`, which holds the address of the wrapped component, and
`type`, which holds the type of the component. You can get a proxy
like this:

``` local component = require("component") local proxy =
component.proxy(address)

-- The call above using the proxy: proxy.broadcast(port, data)

-- The common proxy fields: print(proxy.address) -- address passed to
component.proxy above print(proxy.type) -- "modem" ```

Note that each primary component you access via `component.getPrimary`
or `component.xxx` is in fact a proxy.

## Direct Calls

Some component callbacks can be performed as "direct calls". Direct
calls are performed in the computer's worker thread, meaning they will
return instantly. Normal calls are delegated to the main server thread,
to avoid race conditions and other threading issues, which also means
that normal calls will take up to one tick (i.e. 50 ms). Just to be
clear: this only applies to component APIs.

## Signals

An important part of interacting with components are [Signals](signals).
These can be queued by components to notify computers of external
changes and events. For example, user input is forwarded to computers
via signals. Computers can also queue their own signals, which can be
useful for code-reuse, or just notifying other parts of your code
asynchronously.

## Contents
