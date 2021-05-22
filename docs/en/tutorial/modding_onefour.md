# API changes in OpenComputers v1.4

Following the mantra of "if you break it, break it hard", I took the
opportunity to do some - in my opinion much needed - refactoring in the
API. This resulted in a clearer structure (well, at least I think so),
but also a lot of moving and renaming, meaning even if you only use a
few things from the API, you'll probably have to adapt nonetheless.

The following documents all changes since the API in OC v1.3, in an
attempt to make migrating as painless as possible. If you notice any
changes that are not documented here, please do let me know, so I can
add them, thank you!

## Additions

These additions are purely incremental, that is they are either
completely new interfaces, or new methods on existing interfaces that
only serve to provide access to internal structures, meaning you do not
implement them yourself. Most of these changes do not require any action
on your side.

### Interfaces

- `li.cil.oc.api.driver.EnvironmentAware`\
	Allows drivers (item and block) to statically provide the type of
	environment they'd create for a specified block or item based on a
	given item stack. This allows some analysis of the environment(s)
	provided by a driver without having to actually instantiate them
	(which could have side effects). The main use for now is a custom
	usage tab in NEI that lists the callbacks of the environment(s)
	associated with a given item stack.

- `li.cil.oc.api.driver.item.HostAware`\
	This allows providing a context specific version of `worksWith`.
	This allows for container aware drivers, which is useful for
	upgrades that only work in certain hosts (for example, inventory
	upgrades only make sense for robots, but not for tablets).

- `@li.cil.oc.api.machine.Architecture.Name`\
	This annotation replaces the non-static `name()` method on
	architectures and allows static name lookup. This is used to get the
	name of architectures without having to instantiate them.

- `li.cil.oc.api.internal.Case`\
	This new interface is implemented by computer case tile entities.
	Like all classes in this package, this interface is intended to
	allow checks and interaction with internal OC classes without having
	to link against them directly.

- `li.cil.oc.api.internal.Colored`\
	This new interface is implemented by some tile entities in
	OpenComputers, such as screens, computer cases and most notably,
	cables. Casting these tile entities to this interface allows
	changing their color without compiling against OpenComputers itself.

- `li.cil.oc.api.internal.ServerRack`\
	This new interface is implemented by server rack tile entities. Like
	all classes in this package, this interface is intended to allow
	checks and interaction with internal OC classes without having to
	link against them directly.

- `li.cil.oc.api.internal.Server`\
	This new interface is implemented by servers in server racks. Like
	all classes in this package, this interface is intended to allow
	checks and interaction with internal OC classes without having to
	link against them directly.

- `li.cil.oc.api.internal.Tablet`\
	This new interface is implemented by tablet environments. Like all
	classes in this package, this interface is intended to allow checks
	and interaction with internal OC classes without having to link
	against them directly.

### Methods

- `li.cil.oc.api.machine.Arguments`\
	Now exposes a number of `optXYZ` methods for easier valdation of
	optional arguments, as well as a method `toArray` which converts the
	argument list to an array and converts byte arrays to strings.

- `li.cil.oc.api.machine.Callback.getter()/setter()`\
	Requested addition. Allows marking callbacks to be presented as
	fields rather than method on the script side. In lua this means they
	are implemented via __index/__newindex instead as methods.

- `li.cil.oc.api.machine.Machine.methods(Object)`\
	This now provides a central means of accessing information on
	environments of components as well as userdata. The passed value is
	either an environment (`component.host`) or a userdata (`Value`).
	The returned map contains the names of all present methods together
	with their callback annotations.\
	//How to adjust//: use this instead of `Machine.documentation`.

- `li.cil.oc.api.machine.Machine.onHostChanged()`\
	This was added to make it more obvious the machine has to be updated
	from its host when something relevant to the machine changes, such
	as the amount of available memory. The way this had to be done
	before was to get the architecture of the machine and call
	`recomputeMemory` on it manually.\
	//How to adjust//: instead of calling a machine's architecture's
	`recomputeMemory`, call this.

- `li.cil.oc.api.network.Component.annotation(String)`\
	This allows getting the `Callback` annotation of a specific method.
	It is exposed mainly to allow implementation of custom architectures
	without needing reflection, which is something that was missing in
	the previous version of the API. Oops.

## Changes

These changes may require some action on your side. For the most part
they resulted from a bit of refactoring, so updating your imports and
references suffices in most cases. A few interfaces were renamed and a
few methods were added to interfaces that are implemented on the
'using' side, as well as a few signature changes.

### Moved and renamed interfaces

- `li.cil.oc.api.driver.Container`\
	Renamed to `li.cil.oc.api.driver.EnvironmentHost`. This name better
	reflects what this interface actually represents. It also clears the
	name for drivers of type `Container` (such as card or upgrade
	containers, or disk drives), which are used in robots.\
	//How to adjust//: update imports and references.

- `li.cil.oc.api.driver.UpgradeContainer`\
	Renamed to `li.cil.oc.api.driver.item.Container`. This is a more
	appropriate name, since containers are not exclusive to upgrades,
	but may also house any other type of component. The new package
	serves a clearer separation of basic driver interfaces and item
	driver specializations.\
	//How to adjust//: update imports and references.

- `li.cil.oc.api.driver.Inventory`\
	Moved to `li.cil.oc.api.driver.item.Inventory`. The new package
	serves a clearer separation of basic driver interfaces and item
	driver specializations.\
	//How to adjust//: update imports.

- `li.cil.oc.api.driver.Memory`\
	Moved to `li.cil.oc.api.driver.item.Memory`. The new package serves
	a clearer separation of basic driver interfaces and item driver
	specializations.\
	//How to adjust//: update imports.

- `li.cil.oc.api.driver.Processor`\
	Moved to `li.cil.oc.api.driver.item.Processor`. The new package
	serves a clearer separation of basic driver interfaces and item
	driver specializations.\
	//How to adjust//: update imports.

- `li.cil.oc.api.event.RobotUsedTool`\
	Renamed to `li.cil.oc.api.event.RobotUsedToolEvent`. For
	consistency.\
	//How to adjust//: update imports and references.

- `li.cil.oc.api.network.Arguments`\
	Moved to `li.cil.oc.api.machine.Arguments`. This is an effort to
	keep all machine related interfaces (as opposed to network related)
	in one package, for clarity.\
	//How to adjust//: update imports.

- `li.cil.oc.api.network.Callback`\
	Moved to `li.cil.oc.api.machine.Callback`. This is an effort to keep
	all machine related interfaces (as opposed to network related) in
	one package, for clarity.\
	//How to adjust//: update imports.

- `li.cil.oc.api.network.Context`\
	Moved to `li.cil.oc.api.machine.Context`. This is an effort to keep
	all machine related interfaces (as opposed to network related) in
	one package, for clarity.\
	//How to adjust//: update imports.

- `li.cil.oc.api.machine.Owner`\
	Renamed to `li.cil.oc.api.machine.MachineHost` which is more clear.\
	//How to adjust//: update imports.

- `li.cil.oc.api.Rotatable`\
	Moved to `li.cil.oc.api.internal.Rotatable`. This is an effort to
	keep all interfaces that are or should be implemented by tile
	entities in one package, for clarity.\
	//How to adjust//: update imports.

- `li.cil.oc.api.machine.Robot`\
	Moved to `li.cil.oc.api.internal.Robot`. This is an effort to keep
	all interfaces that are or should be implemented by tile entities in
	one package, for clarity.\
	//How to adjust//: update imports.

### Added and renamed methods in existing interfaces

This is the part with the most breaking changes, which require the most
work to adjust to. These changes may require you to update references to
methods, change names of implementing methods, change call signatures or
implement new methods. Again, sorry for that, but I feel the changes
were either necessary or ultimately lead to a clearer API. See the notes
on how to adjust for each of these changes for specific pointers where
needed.

- `li.cil.oc.api.FileSystem.asManagedEnvironment(FileSystem, Label,
EnvironmentHost)`\
	Extended to
	`li.cil.oc.api.FileSystem.asManagedEnvironment(FileSystem, Label, EnvironmentHost, String)`.
	Takes additional parameter, name of the sound effect to play when
	file system is being accessed.\
	//How to adjust//: pass name of sound effect to play on filesystem
	access, `null` otherwise.

- `li.cil.oc.api.FileSystem.asManagedEnvironment(FileSystem, String,
EnvironmentHost)`\
	Extended to
	`li.cil.oc.api.FileSystem.asManagedEnvironment(FileSystem, String, EnvironmentHost, String)`.
	Takes additional parameter, name of the sound effect to play when
	file system is being accessed.\
	//How to adjust//: pass name of sound effect to play on filesystem
	access, `null` otherwise.

- `li.cil.oc.api.driver.Item.slot(ItemStack)`\
	Now returns a String instead of using the `Slot` enum (which has
	been removed).\
	//How to adjust//: return string name of the slot type. Built-in
	types are listed in `li.cil.oc.api.driver.item.Slot`.

- `li.cil.oc.api.driver.NamedBlock.priority()`\
	Requested addition. Allows some control over which name is chosen
	when multiple environments with preferred names are merged.\
	//How to adjust//: implement returning zero.

- `li.cil.oc.api.driver.Processor.architecture(ItemStack)`\
	Added to the `Processor` interface to provide a custom architecture
	for computers to use based on the CPU item.\
	//How to adjust//: implement, return `api.Machine.LuaArchitecture`
	or your own.

- `li.cil.oc.api.driver.item.Container.providedSlot(ItemStack)`\
	Now returns a String instead of using the `Slot` enum (which has
	been removed).\
	//How to adjust//: return string name of the slot type. Built-in
	types are listed in `li.cil.oc.api.driver.item.Slot`.

- `li.cil.oc.api.machine.Machine.owner()`\
	Renamed to `li.cil.oc.api.machine.Machine.host()` to reflect
	interface name change.\
	//How to adjust//: update references.

- `li.cil.oc.api.machine.MachineHost`\
	Now extends `li.cil.oc.api.machine.EnvironmentHost` to reduce
	redundancy, x, y and z getters are gone now, in favor of xPosition,
	yPosition and zPosition.\
	//How to adjust//: remove now redundant methods, implement new
	methods (mainly: rename x/y/z to x/z/yPosition).

- `li.cil.oc.api.machine.MachineHost.callBudget()`\
	Added to the `MachineHost` interface to allow providing a custom
	direct call budget for machines, enabling machines that run at
	different speeds. In OC this value is based on the tier of the
	installed CPU, with the values being 0.5, 1.0 and 1.5 for the tiers
	one, two and three, respectively.\
	//How to adjust//: return desired call budget for machine, 1.0 being
	equivalent to before.

- `li.cil.oc.api.machine.MachineHost.markAsChanged()`\
	Renamed to `li.cil.oc.api.machine.MachineHost.markForSaving` to
	clarify difference to EnvironmentHost's markChanged (which usually
	means the inventory changed).\
	//How to adjust//: rename implementing methods.

- `li.cil.oc.api.network.WirelessEndpoint.receivePacket(Packet packet,
double distance)`\
	Changed signature to
	`receivePacket(Packet packet, WirelessEndpoint sender)`, which is
	much more versatile.\
	//How to adjust//: change signatures, compute distance when needed.

- `li.cil.oc.api.prefab.ManagedEnvironment.node`\
	Made private. This change was made to ensure it can be overridden by
	overriding `node()`.\
	//How to adjust//: use `node()` to access, use `setNode(Node)` to
	set.

## Removed

- `li.cil.oc.api.Machine.create(MachineHost, Class<? extends
Architecture>)`\
	Architecture is now dynamically defined via the host, so this method
	is pointless.\
	//How to adjust//: use the variant without the second parameter.

- `li.cil.oc.api.driver.Slot`\
	The slot enum has gone, slot types are now simply strings. This
	allows much more flexibility, at the cost of potential typos and
	having to look up which slots actually exist (sorry for that). The
	built-in slot types are listed in `li.cil.oc.api.driver.item.Slot`.\
	//How to adjust//: wwitch to the according string equivalents of the
	of old enum values.

- `li.cil.oc.api.machine.Architecture.name()`\
	This has been removed and is now realized via the use of an
	annotation, to allow static lookup of the name, without having to
	create an instance of it.\
	//How to adjust//: remove method, add `Architecture.Name`
	annotation.

- `li.cil.oc.api.machine.Machine.documentation(String, String)`\
	This no longer serves any use, since much information on components
	and userdata can now be queried in a central an more generic
	fashion, using the new `methods` function.\
	//How to adjust//: use 
	`machine.methods(componentWithAddress.host)(methodName)` instead.

- `li.cil.oc.api.machine.Machine.documentation(Value)`\
	This no longer serves any use, since much information on components
	and userdata can now be queried in a central an more generic
	fashion, using the new `methods` function.\
	//How to adjust//: use
	`machine.methods(componentWithAddress.host)(methodName)` instead.

## IMC

- `registerAssemblerTemplate`\
	Added parameter `hostClass`, a string that is the fully qualified
	class name of the environment host the generated device will use.
	This is used to provide said class to drivers to allow them to check
	whether they wish to work in the environment or not. For now this is
	used to disable a couple of components for tablets, where they
	wouldn't work anyway (e.g. inventory upgrade).

## Contents

# API changes in OpenComputers v1.4

Following the mantra of "if you break it, break it hard", I took the
opportunity to do some - in my opinion much needed - refactoring in the
API. This resulted in a clearer structure (well, at least I think so),
but also a lot of moving and renaming, meaning even if you only use a
few things from the API, you'll probably have to adapt nonetheless.

The following documents all changes since the API in OC v1.3, in an
attempt to make migrating as painless as possible. If you notice any
changes that are not documented here, please do let me know, so I can
add them, thank you!

## Additions

These additions are purely incremental, that is they are either
completely new interfaces, or new methods on existing interfaces that
only serve to provide access to internal structures, meaning you do not
implement them yourself. Most of these changes do not require any action
on your side.

### Interfaces

- `li.cil.oc.api.driver.EnvironmentAware`\
	Allows drivers (item and block) to statically provide the type of
	environment they'd create for a specified block or item based on a
	given item stack. This allows some analysis of the environment(s)
	provided by a driver without having to actually instantiate them
	(which could have side effects). The main use for now is a custom
	usage tab in NEI that lists the callbacks of the environment(s)
	associated with a given item stack.

- `li.cil.oc.api.driver.item.HostAware`\
	This allows providing a context specific version of `worksWith`.
	This allows for container aware drivers, which is useful for
	upgrades that only work in certain hosts (for example, inventory
	upgrades only make sense for robots, but not for tablets).
	
- `@li.cil.oc.api.machine.Architecture.Name`\
	This annotation replaces the non-static `name()` method on
	architectures and allows static name lookup. This is used to get the
	name of architectures without having to instantiate them.

- `li.cil.oc.api.internal.Case`\
	This new interface is implemented by computer case tile entities.
	Like all classes in this package, this interface is intended to
	allow checks and interaction with internal OC classes without having
	to link against them directly.

- `li.cil.oc.api.internal.Colored`\
	This new interface is implemented by some tile entities in
	OpenComputers, such as screens, computer cases and most notably,
	cables. Casting these tile entities to this interface allows
	changing their color without compiling against OpenComputers itself.

- `li.cil.oc.api.internal.ServerRack`\
	This new interface is implemented by server rack tile entities. Like
	all classes in this package, this interface is intended to allow
	checks and interaction with internal OC classes without having to
	link against them directly.

- `li.cil.oc.api.internal.Server`\
	This new interface is implemented by servers in server racks. Like
	all classes in this package, this interface is intended to allow
	checks and interaction with internal OC classes without having to
	link against them directly.

- `li.cil.oc.api.internal.Tablet`\
	This new interface is implemented by tablet environments. Like all
	classes in this package, this interface is intended to allow checks
	and interaction with internal OC classes without having to link
	against them directly.

### Methods

- `li.cil.oc.api.machine.Arguments`\
	Now exposes a number of `optXYZ` methods for easier valdation of
	optional arguments, as well as a method `toArray` which converts the
	argument list to an array and converts byte arrays to strings.

- `li.cil.oc.api.machine.Callback.getter()/setter()`\
	Requested addition. Allows marking callbacks to be presented as
	fields rather than method on the script side. In lua this means they
	are implemented via __index/__newindex instead as methods.

- `li.cil.oc.api.machine.Machine.methods(Object)`\
	This now provides a central means of accessing information on
	environments of components as well as userdata. The passed value is
	either an environment (`component.host`) or a userdata (`Value`).
	The returned map contains the names of all present methods together
	with their callback annotations.\
	//How to adjust//: use this instead of `Machine.documentation`.

- `li.cil.oc.api.machine.Machine.onHostChanged()`\
	This was added to make it more obvious the machine has to be updated
	from its host when something relevant to the machine changes, such
	as the amount of available memory. The way this had to be done
	before was to get the architecture of the machine and call
	`recomputeMemory` on it manually.\
	//How to adjust//: instead of calling a machine's architecture's
	`recomputeMemory`, call this.

- `li.cil.oc.api.network.Component.annotation(String)`\
	This allows getting the `Callback` annotation of a specific method.
	It is exposed mainly to allow implementation of custom architectures
	without needing reflection, which is something that was missing in
	the previous version of the API. Oops.

## Changes

These changes may require some action on your side. For the most part
they resulted from a bit of refactoring, so updating your imports and
references suffices in most cases. A few interfaces were renamed and a
few methods were added to interfaces that are implemented on the
'using' side, as well as a few signature changes.

### Moved and renamed interfaces

- `li.cil.oc.api.driver.Container`\
	Renamed to `li.cil.oc.api.driver.EnvironmentHost`. This name better
	reflects what this interface actually represents. It also clears the
	name for drivers of type `Container` (such as card or upgrade
	containers, or disk drives), which are used in robots.\
	//How to adjust//: update imports and references.

- `li.cil.oc.api.driver.UpgradeContainer`\
	Renamed to `li.cil.oc.api.driver.item.Container`. This is a more
	appropriate name, since containers are not exclusive to upgrades,
	but may also house any other type of component. The new package
	serves a clearer separation of basic driver interfaces and item
	driver specializations.\
	//How to adjust//: update imports and references.

- `li.cil.oc.api.driver.Inventory`\
	Moved to `li.cil.oc.api.driver.item.Inventory`. The new package
	serves a clearer separation of basic driver interfaces and item
	driver specializations.\
	//How to adjust//: update imports.

- `li.cil.oc.api.driver.Memory`\
	Moved to `li.cil.oc.api.driver.item.Memory`. The new package serves
	a clearer separation of basic driver interfaces and item driver
	specializations.\
	//How to adjust//: update imports.

- `li.cil.oc.api.driver.Processor`\
	Moved to `li.cil.oc.api.driver.item.Processor`. The new package
	serves a clearer separation of basic driver interfaces and item
	driver specializations.\
	//How to adjust//: update imports.

- `li.cil.oc.api.event.RobotUsedTool`\
	Renamed to `li.cil.oc.api.event.RobotUsedToolEvent`. For
	consistency.\
	//How to adjust//: update imports and references.

- `li.cil.oc.api.network.Arguments`\
	Moved to `li.cil.oc.api.machine.Arguments`. This is an effort to
	keep all machine related interfaces (as opposed to network related)
	in one package, for clarity.\
	//How to adjust//: update imports.

- `li.cil.oc.api.network.Callback`\
	Moved to `li.cil.oc.api.machine.Callback`. This is an effort to keep
	all machine related interfaces (as opposed to network related) in
	one package, for clarity.\
	//How to adjust//: update imports.

- `li.cil.oc.api.network.Context`\
	Moved to `li.cil.oc.api.machine.Context`. This is an effort to keep
	all machine related interfaces (as opposed to network related) in
	one package, for clarity.\
	//How to adjust//: update imports.

- `li.cil.oc.api.machine.Owner`\
	Renamed to `li.cil.oc.api.machine.MachineHost` which is more clear.\
	//How to adjust//: update imports.

- `li.cil.oc.api.Rotatable`\
	Moved to `li.cil.oc.api.internal.Rotatable`. This is an effort to
	keep all interfaces that are or should be implemented by tile
	entities in one package, for clarity.\
	//How to adjust//: update imports.

- `li.cil.oc.api.machine.Robot`\
	Moved to `li.cil.oc.api.internal.Robot`. This is an effort to keep
	all interfaces that are or should be implemented by tile entities in
	one package, for clarity.\
	//How to adjust//: update imports.

### Added and renamed methods in existing interfaces

This is the part with the most breaking changes, which require the most
work to adjust to. These changes may require you to update references to
methods, change names of implementing methods, change call signatures or
implement new methods. Again, sorry for that, but I feel the changes
were either necessary or ultimately lead to a clearer API. See the notes
on how to adjust for each of these changes for specific pointers where
needed.

- `li.cil.oc.api.FileSystem.asManagedEnvironment(FileSystem, Label, EnvironmentHost)`\
	Extended to
	`li.cil.oc.api.FileSystem.asManagedEnvironment(FileSystem, Label, EnvironmentHost, String)`.
	Takes additional parameter, name of the sound effect to play when
	file system is being accessed.\
	//How to adjust//: pass name of sound effect to play on filesystem
	access, `null` otherwise.

- `li.cil.oc.api.FileSystem.asManagedEnvironment(FileSystem, String, EnvironmentHost)`\
	Extended to
	`li.cil.oc.api.FileSystem.asManagedEnvironment(FileSystem, String, EnvironmentHost, String)`.
	Takes additional parameter, name of the sound effect to play when
	file system is being accessed.\
	//How to adjust//: pass name of sound effect to play on filesystem
	access, `null` otherwise.

- `li.cil.oc.api.driver.Item.slot(ItemStack)`\
	Now returns a String instead of using the `Slot` enum (which has
	been removed).\
	//How to adjust//: return string name of the slot type. Built-in
	types are listed in `li.cil.oc.api.driver.item.Slot`.

- `li.cil.oc.api.driver.NamedBlock.priority()`\
	Requested addition. Allows some control over which name is chosen
	when multiple environments with preferred names are merged.\
	//How to adjust//: implement returning zero.

- `li.cil.oc.api.driver.Processor.architecture(ItemStack)`\
	Added to the `Processor` interface to provide a custom architecture
	for computers to use based on the CPU item.\
	//How to adjust//: implement, return `api.Machine.LuaArchitecture`
	or your own.

- `li.cil.oc.api.driver.item.Container.providedSlot(ItemStack)`\
	Now returns a String instead of using the `Slot` enum (which has
	been removed).\
	//How to adjust//: return string name of the slot type. Built-in
	types are listed in `li.cil.oc.api.driver.item.Slot`.

- `li.cil.oc.api.machine.Machine.owner()`\
	Renamed to `li.cil.oc.api.machine.Machine.host()` to reflect
	interface name change.\
	//How to adjust//: update references.

- `li.cil.oc.api.machine.MachineHost`\
	Now extends `li.cil.oc.api.machine.EnvironmentHost` to reduce
	redundancy, x, y and z getters are gone now, in favor of xPosition,
	yPosition and zPosition.\
	//How to adjust//: remove now redundant methods, implement new
	methods (mainly: rename x/y/z to x/z/yPosition).

- `li.cil.oc.api.machine.MachineHost.callBudget()`\
	Added to the `MachineHost` interface to allow providing a custom
	direct call budget for machines, enabling machines that run at
	different speeds. In OC this value is based on the tier of the
	installed CPU, with the values being 0.5, 1.0 and 1.5 for the tiers
	one, two and three, respectively.\
	//How to adjust//: return desired call budget for machine, 1.0 being
	equivalent to before.

- `li.cil.oc.api.machine.MachineHost.markAsChanged()`\
	Renamed to `li.cil.oc.api.machine.MachineHost.markForSaving` to
	clarify difference to EnvironmentHost's markChanged (which usually
	means the inventory changed).\
	//How to adjust//: rename implementing methods.

- `li.cil.oc.api.network.WirelessEndpoint.receivePacket(Packet packet, double distance)`\
	Changed signature to
	`receivePacket(Packet packet, WirelessEndpoint sender)`, which is
	much more versatile.\
	//How to adjust//: change signatures, compute distance when needed.

- `li.cil.oc.api.prefab.ManagedEnvironment.node`\
	Made private. This change was made to ensure it can be overridden by
	overriding `node()`.\
	//How to adjust//: use `node()` to access, use `setNode(Node)` to
	set.

## Removed

- `li.cil.oc.api.Machine.create(MachineHost, Class<? extends Architecture>)`\
	Architecture is now dynamically defined via the host, so this method
	is pointless.\
	//How to adjust//: use the variant without the second parameter.

- `li.cil.oc.api.driver.Slot`\
	The slot enum has gone, slot types are now simply strings. This
	allows much more flexibility, at the cost of potential typos and
	having to look up which slots actually exist (sorry for that). The
	built-in slot types are listed in `li.cil.oc.api.driver.item.Slot`.\
	//How to adjust//: wwitch to the according string equivalents of the
	of old enum values.

- `li.cil.oc.api.machine.Architecture.name()`\
	This has been removed and is now realized via the use of an
	annotation, to allow static lookup of the name, without having to
	create an instance of it.\
	//How to adjust//: remove method, add `Architecture.Name`
	annotation.

- `li.cil.oc.api.machine.Machine.documentation(String, String)`\
	This no longer serves any use, since much information on components
	and userdata can now be queried in a central an more generic
	fashion, using the new `methods` function.\
	//How to adjust//: use
	`machine.methods(componentWithAddress.host)(methodName)` instead.

- `li.cil.oc.api.machine.Machine.documentation(Value)`\
	This no longer serves any use, since much information on components
	and userdata can now be queried in a central an more generic
	fashion, using the new `methods` function.\
	//How to adjust//: use
	`machine.methods(componentWithAddress.host)(methodName)` instead.

## IMC

- `registerAssemblerTemplate`\
	Added parameter `hostClass`, a string that is the fully qualified
	class name of the environment host the generated device will use.
	This is used to provide said class to drivers to allow them to check
	whether they wish to work in the environment or not. For now this is
	used to disable a couple of components for tablets, where they
	wouldn't work anyway (e.g. inventory upgrade).