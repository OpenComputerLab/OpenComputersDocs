# Component: Debug

This component is provided by the [Debug Card](/item/debug_card).

Component name: `debug`.

The [Debug Card](/item/debug_card), which is only available in creative
mode, provides a set of fairly dangerous functionality for use in
setting things up to debug and test code. Do not use the Debug Card
without backups. No, really. One time I accidentally converted a
vertical slice of the world entirely to Sign objects with no writing on
them.

The debug card's "container" refers to the robot, computer or tablet
with a debug card installed in it.

On a dedicated server the debug card must be bound to a player by
shift-right-clicking with it to run commands using the runCommand
callback. The bound player needs to have permission to use the command
provided to runCommand.

Callbacks:

- `changeBuffer(value:number):number`

	Changes the component network's energy buffer by the specified
	delta.

- `connectToBlock(x:number, y:number, z:number):boolean`

	Connect the debug card to an opencomputers-compatible block at the
	specified coordinates.

- `getPlayer(name:string):userdata`

	Get the entity of a player.

- `getPlayers():table`

	Get a list of currently logged-in players.

- `getWorld([id:number]):userdata`

	Get the world object for the specified dimension ID, or the
	container's.

- `getWorlds():table`

	Get a list of all world IDs, loaded and unloaded.

- `getX():number`

	Get the container's X position in the world.

- `getY():number`

	Get the container's Y position in the world.

- `getZ():number`

	Get the container's Z position in the world.

- `isModLoaded(name:string):boolean`

	Get whether a mod or API is loaded.

- `runCommand(command:string):number, string`

	Runs an arbitrary command using a fake player. The first return
	value will be 1 if the command ran successfully, or 0 otherwise. The
	second return value will contain what the command returned, or an
	error message. If the command doesn't return anything, such as /me,
	the second value will be nil.

- `test():userdata`

	Test method for user-data and general value conversion.

- `getScoreboard():userdata`

	Get the scoreboard object for the world

- `sendToDebugCard(address:string, data...)`

	Sends data to the debug card with the specified address.

- `sendToClipboard(player:string, text:string)`

	Sends text to the specified player's clipboard if possible.

- `scanContentsAt(x: number, y: number, z: number[, worldId: number]):boolean, string, table`

	Returns contents at the location in world by id (defaults to host
	world). This method behaves the same as the move check for the robot
	and drone. The first return value is a boolean indicating whether a
	robot or drone would be able to enter the location (true means it
	would be blocked and cannot move into that space). The second return
	is a string value short name of the type of obstruction. Possible
	values here include: EntityLivingBase, EntityMinecart, air, liquid,
	replaceable, passable, and solid.The final value returned is a
	serialized or table representation of the entity or block scanned at
	the location. The following code snippet can be used to debug what
	is possibly blocking the robot from moving forward, if the robot is
	facing in the negative x direction.


``` lua
local debug = require("component").debug
local serialize = require("serialization").serialize
local x, y, z = debug.getX, debug.getY, debug.getZ
local offset_x = -1
local offset_z = 0
local blocking, label, content = debug.scanContentsAt(x() - .5 + offset_x, y() - .5, z() - .5 + offset_z)
print(blocking, label, serialize(content))
```

### World Object

The world object reflects the current world (dimension) the container is
in.

- `getMetadata(x:number, y:number, z:number):number`

	Get the metadata of the block at the specified coordinates.

- `getBlockId(x:number, y:number, z:number):number`

	Get the ID of the block at the specified coordinates.

- `getDimensionId():number`

	Gets the numeric id of the current dimension.

- `isLoaded(x:number, y:number, z:number):number`

	Check whether the block at the specified coordinates is loaded.

- `getSeed():number`

	Gets the seed of the world.

- `removeFluid(amount:number, x:number, y:number, z:number, side:number):boolean`

	Remove some fluid from a tank at the specified location.

- `insertFluid(id:string, amount:number, x:number, y:number, z:number, side:number):boolean`

	Insert some fluid into the tank at the specified location.

- `getDimensionName():string`

	Gets the name of the current dimension.

- `getTime():number`

	Get the current world time.

- `setTime(value:number)`

	Set the current world time.

- `getLightValue(x:number, y:number, z:number):number`

	Get the light value (emission) of the block at the specified
	coordinates.

- `isRaining():boolean`

	Returns whether it is currently raining.

- `setRaining(value:boolean)`

	Sets whether it is currently raining.

- `isThundering():boolean`

	Returns whether it is currently thundering.

- `setThundering(value:boolean)`

	Sets whether it is currently thundering.

- `setBlock(x:number, y:number, z:number, id:number or string, meta:number):number`

	Set the block at the specified coordinates.

- `setBlocks(x1:number, y1:number, z1:number, x2:number, y2:number, z2:number, id:number or string, meta:number):number`

	Set all blocks in the area defined by the two corner points (x1, y1,
	z1) and (x2, y2, z2).

- `removeItem(x:number, y:number, z:number, slot:number[, count:number]):number`

	Reduce the size of an item stack in the inventory at the specified
	location.

- `insertItem(id:string, count:number, damage:number, nbt:string, x:number, y:number, z:number, side:number):boolean`

	Insert an item stack into the inventory at the specified location.
	NBT tag is expected in JSON format.

- `getSpawnPoint():number, number, number`

	Get the current spawn point coordinates.

- `setSpawnPoint(x:number, y:number, z:number)`

	Set the spawn point coordinates.

- `canSeeSky(x:number, y:number, z:number):number`

	Get whether the block at the specified coordinates is directly under
	the sky.

- `getLightOpacity(x:number, y:number, z:number):number`

	Get the light opacity of the block at the specified coordinates.

- `hasTileEntity(x:number, y:number, z:number):number`

	Check whether the block at the specified coordinates has a tile
	entity.

- `playSoundAt(x:number, y:number, z:number, sound:string, range:number)`

	Play a sound at the specified coordinates.

- `getTileNBT(x:number, y:number, z:number):table`

	Get the NBT of the block at the specified coordinates.

- `setTileNBT(x:number, y:number, z:number, nbt:table):boolean`

	Set the NBT of the block at the specified coordinates.

- `getBlockState(x:number, y:number, z:number[, actualState:boolean=false])`

	Gets the block state for the block at the specified position,
	optionally getting additional display related data

### Player Object

A player object represents a given player in the world.

- `getWorld():userdata`

	Get the player's world object.

- `getGameType():string`

	Get the player's game type.

- `setGameType(gametype:string)`

	Set the player's game type (survival, creative, adventure).

- `getHealth():number`

	Get the player's health.

- `setHealth(health:number)`

	Set the player's health.

- `getMaxHealth():number`

	Get the player's max health.

- `getPosition():number, number, number`

	Get the player's position.

- `setPosition(x:number, y:number, z:number)`

	Set the player's position.

- `getExperienceTotal():number`

	Get the player's total experience

- `getLevel():number`

	Get the player's level

- `addExperienceLevel(level:number)`

	Add a level to the player's experience level

- `removeExperienceLevel(level:number)`

	Remove a level from the player's experience level

- `insertItem(id:string, amount:number, meta:number[,nbt:string]):number`

	Adds the item stack to the players inventory

- `clearInventory()`

	Clear the players inventory

### Scoreboard Object

- `addObjective(objectiveName:string, objectiveCriteria:string)`

	Create a new objective for the scoreboard

- `removeObjective(objectiveName:string)`

	Remove an objective from the scoreboard

- `increasePlayerScore(playerName:string, objectiveName:string, score:int)`

	Increases the score of a player for a certain objective

- `decreasePlayerScore(playerName:string, objectiveName:string, score:int)`

	Decrease the score of a player for a certain objective

- `addPlayerToTeam(player:string, team:string):boolean`

	Add a player to a team

- `removePlayerFromTeam(player:string, team:string):boolean`

	Remove a player from a specific team

- `removePlayerFromTeams(player:string):boolean`

	Remove a player from their team

- `addTeam(team:string)`

	Add a team to the scoreboard

- `removeTeam(teamName: string)`

	Remove a team from the scoreboard

- `getPlayerScore(playerName:string, objectiveName:string):int`

	Gets the score of a player for a certain objective

- `setPlayerScore(playerName:string, objectiveName:string, score:int)`

	Sets the score of a player for a certain objective