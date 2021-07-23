# 快速开始
OpenComputers是一个在 Minecraft 游戏中加入了计算机和机器人的模组。

它可以用 [Lua](http://www.lua.org/) [5.3](http://www.lua.org/manual/5.3/manual.html) 进行编程。

它采用了其他几个模组的创意，例如 ComputerCraft，StevesCarts 和 Modular Powersuits，并创造出了一些好玩的新东西。

- [方块和物品](/#contents)
- [Lua API](api)
- [Component API 文档](component)
- [教程](tutorial)
- [快速开始](tutorial/oc1_basic_computer)
- [官方网站](http://oc.cil.li/)
- [游戏手册](https://oc.shadowkat.net/)

## 连接性
OpenComputers 可以通过多种方式连接到 Minecraft 外的世界并与之互动：

在彼此紧贴放置的情况下,大多数 OpenComputers 方块能够自动发现彼此并进行互动，你也可以使用 [线缆](/block/cable) 来连接相隔一段距离的它们。如果可能，你也可以通过多种网卡或交换机在逻辑上以有线和/或无线的形式连接或分离组件。

来自原版或其他模组的方块可以使用 [红石卡](/block/redstone_card)，[红石I/O方块](/block/redstone_io) 或 [适配器](/block/adapter) 来连接。很多来自其它模组的特殊方块已经集成到了适配器中，比如来自BuildCraft，IndustrialCraft2 和 Thermal Expansion的方块，其他模组作者可以使用Java API来为他们的方块添加特殊处理。

[机器人](/block/robot) 能够以一个近乎真实玩家的身份与世界交互。它们可以装备大多数的工具，方块或其他物品并且可以被编程以你想的每种方式去使用它们。你可以编程它们去分类你的库存，为你采集资源，建造一座堡垒或是在你回来时 [唱歌](/api/note) 跳舞欢迎你。只有想不到，没有做不到。