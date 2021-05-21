This page contains information for modders on migrating from the 1.2 API
to the 1.3 API of OpenComputers.

There should be relatively few breaking changes, mostly additions. If
you encounter something breaking that is not listed here, please add it.
If you don't know how to solve it, add it anyway and ping Sangar on
IRC.

# Blocks / Items API

This is the biggest change. Instead of one field per provided block and
item, there is now an abstraction layer that returns descriptors for
blocks / items by name.

How to adjust:

``` java
ItemStack screen = li.cil.oc.api.Blocks.ScreenTier1;
ItemStack gpu = li.cil.oc.api.Items.GraphicsCardTier1;
...
```

becomes

``` java
ItemStack screen = li.cil.oc.api.Items.get("screen1").createItemStack(1);
ItemStack gpu = li.cil.oc.api.Items.get("graphicsCard1").createItemStack(1);
...
```

For the names passed to the `get` method, see the recipe files, they
are the names of the recipes (**not** the OreDict names!)

Reason: This is more future proof and avoids issues such as people
modifying the item stacks listed in the API. It allows adding new items
without having to change the API each time.

# CreativeTab

The `Instance` field was decapitalized and is now named `instance`.

How to adjust:

``` java
CreativeTabs tab = li.cil.oc.api.CreativeTab.Instance;
```

becomes

``` java
CreativeTabs tab = li.cil.oc.api.CreativeTab.instance;
```

Reason: Sorry. OCD struck hard (it's lowercase in all the other API
classes, too).

# Item drivers

Item drivers now take a different parameter type in the
`createEnvironment` method.

How to adjust:

``` java
ManagedEnvironment createEnvironment(ItemStack stack, TileEntity tileEntity) {
    return new CustomComponent(tileEntity);
}
```

becomes

``` java
ManagedEnvironment createEnvironment(ItemStack stack, Container container) {
    if (container instanceof TileEntity) {
      return new CustomComponent((TileEntity) container);
    }
    return null;
}
```

Note that you should use the container as is (it also provides position
and such) where possible, to keep your implementation future-proof.

Reason: allows more flexible use of item components, outside of tile
entities. For example, this allows using item components in entity-based
computers such as robots, or for portable, item-based computers.