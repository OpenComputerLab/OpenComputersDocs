# Steps to Build and Run master-MC1.7.10 from source

These instructions assume you have cloned the repo, `git clone
git@github.com:MightyPirates/OpenComputers.git` and are working from
the master-MC1.7.10 branch, currently the default branch.

## IDEA instructions

- run `./gradlew setupDecompWorkspace`

- run `./gradlew build`

- run `./gradlew idea`

- From IDEA, open the OpenComputers.ipr created from `./gradlew idea`

- Open File->Project Structure (or press Shift+Control+Alt+S)

- In the left pane select Modules

- Depending on how you imported the project there may be mulitple top level modules.\
      There should only be one. Keep only the one named OpenComputers which
      has three sub modules named `OpenComputers_api`, `OpenComputers_main`,
      and `OpenComputers_test`. Right click on the others and choose to delete them.

- Set separate output paths for `OpenComputers_api` and `OpenComputers_main`.\
      In the middle pane select `OpenComputers_api`,
      in the right pane select "Paths" and change the "Output path:"
      from ending in /main to end in /api

- Set the scope of other minecraft mods in Dependencies "provided".\
      This needs to be done for `OpenComputers_api` as well as
      `OpenComputers_main`. Select "Dependencies" in the right pane. A
      large list of dependencies are listed. All, by default due to
      importing the gradle properties, will default to "Compile". Set
      all of the following to "Provided"
```
factorization-api
ic2classic-api
AgriCraft
Gradle: appeng:RotaryCraft:api
Gradle: appeng:appliedenergistics2
Gradle: codechicken:EnderStorage
Gradle: codechicken:WR-CBE
Gradle: com.bluepowermod:BluePower
Gradle: com.gregoriust.gregtech
Gradle: igwmod:IGW-Mod-1.7.10
Gradle: li.cil.tis3d:TIS-3D
Gradle: mcp.mobius.waila
Gradle: net.industrial-craft:industrialcraft-2
Gradle: net.sengir.forestry
Gradle: dev.modwarriors.notenoughkeys:NotEnoughKeys
Gradle: qmunity:QmunityLib
Gradle: tmech:TMechworks
Gradle: mrtjp:ProjectRed
Gradle: :buildcraft
Gradle: :GalacticraftCoreAll
Gradle: :MekanismAll
Gradle: :redlogic
Gradle: :CoFHLib
Gradle: :CoFHCore
Gradle: :MineFactoryReloaded
Gradle: :ComputerCraft
Gradle: :EnderIO
Gradle: :Railcraft
Gradle: :BloodMagic
Gradle: :ExtraCells
Gradle: :ThaumicEnergistics
Gradle: api:rf
Gradle: codechicken:CodeChickenCore
Gradle: api:mfr
Gradle: api:railcraft
Gradle: appeng:mekanism
Gradle: api:ic2
Gradle: api:betterstorage
Gradle: api:immibis
Gradle: api:coloredlightscore
Gradle: api:craftguide
Gradle: api:rblocks
Gradle: api:invtweaks
Gradle: appeng:Waila
Gradle: tconstruct:TConstruct
Gradle: codechicken:NotEnoughItems
Gradle: codechicken:CodeChickenLib
Gradle: codechicken:ForgeMultipart
Gradle: mantle:Mantle
```
- Again, make sure you repeat this process for both `OpenComputers_api` as well as `OpenComputers_main`.
- Close Project Structure window (press OK)
- Open Run->Edit configurations, select Application on the left pane,
      and set `Use classpath of module` (left Alt+O) to
      `OpenComputers.main` for both `Minecraft Client` and
      `Minecraft Server`. This fixes the error
      `Error: Could not find or load main class GradleStart` if you forgot
      to do this step.

- Build Project (Shift F9) - Make symlink called `assets` to
      `buildresourcesmainassets` in folders `buildclassesjavamain`
      and `buildclassesscalamain`.Otherwise textures and other
      assets won't work.

- Select "Minecraft Client" as the run target, and run!

Keep in mind that if you want to build a .jar that can be used outside
of the development environment, you need to run `./gradlew clean` and
then `./gradlew assemble` to produce .jar with obfuscated names so
that it works with normal minecraft.