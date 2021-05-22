# Tutorial: The OpenPrograms Package Manager (OPPM)

The OpenPrograms Package Manager, called OPPM, is a program available
through a dungeon [loot disk](/item/loot_disks) in OpenComputers. It
provides a large variety of programs, from now on called "packages",
for you to download and install easily. It is meant to make users able
to easily distribute their programs, it is supposed to make installing,
updating and uninstalling packages just as easy as creating and
registering them.

## Using OPPM

For OPPM to work, you will need at least a Tier 2 case and an Internet
card inserted.  

Once you have acquired the floppy disk containing OPPM, the first thing
you should do after insertion is run `oppm install oppm` to install the
latest version of the package manager onto your main hard drive. Once
that is done, you can shut down your computer, remove the floppy disk
and restart.

OPPM supports a few arguments, which will be explained now:

- `oppm list [filter] [-i]`\
    This command lists all the available packages by their unique name.
    The list is sorted by alphabet. The optional argument `filter` will
    make the list only display the packages which have the specified
    filter in their name. The option -i makes the command only list
    packages which have already been installed.

-  `oppm info <package>`\
    Lists further information about the specified program package, such
    as the full name, the author(s), a description of the package and
    additional notes the author might have added.

- `oppm install [-f] <package> [path]`\
    Downloads the package to a directory on you system; if no `path`
    has been specified, it will install it to the default path
    specified in oppm.cfg (which is /usr by default, and you should
    always install packages to the default path if you don't have a
    very good reason not to do so). The option -f forces the installation,
    meaning that any already existing file will be overwritten/replaced by
    the downloaded ones, and if `path` points to a non-existing directory,
    that directory will be created.

- `oppm update <package>`\
    This command uninstalls the specified package and re-downloads it,
    making sure you have the very-most up-to-date version of the package.
    If `package` is "all", every package that is currently installed will
    be updated.

- `oppm uninstall <package>`\
    Removes every file of the specified package from your system.

- `oppm register <userorgroup>/<repository>`\
    Adds the Github repository found at
    `https://github.com/<userorgroup>/<repository>` as an additional
    source of programs. The repository must have a branch named `master`,
    and that branch must contain a properly structured file named
    `programs.cfg` in its root directory.

- `oppm unregister <userorgroup>/<repository>`\
    Removes the Github repository found at
    `https://github.com/<userorgroup>/<repository>` from the list of
    additional repositories to search.

_Note_: If you only want to use packages provided by other people and do not want to make any packages yourself, you can stop reading now.

## The format of a packages table

If you want to create your own packages, either to make it easier to
install your software on multiple computers or because you want to share 
t with other people, you will need to create a Github repository and a
packages table. Where the packages table lives depends on the method
you use to register your repository, but its format is the same for
all methods.

This is the reference for what is allowed to be in your packages table (see [example.cfg](https://github.com/OpenPrograms/Vexatos-Programs/blob/master/oppm/example.cfg)):

``` lua
{--This is an example for a programs.cfg file. Please do not add any comments inside actual programs.lua files
  ["example-package"] = {
    files = {
      ["master/somefolder/bar.lua"] = "/",--"/" means the file will be placed inside the folder the user specified, defaults to /usr
      ["master/somefolder/barinfo.txt"] = "//etc", -- double slash for using an absolute path
      [":master/otherfolder"] = "/share/something", -- A colon marks a folder, will include everything in that folder
      [":master/otherfolder"] = "//etc/something", -- This also works with absolute paths
      ["master/somefolder/barlib.lua"] = "/subfolder",--Places the file in a subfolder in the user-specified folder
      ["?master/somefolder/something.cfg"] = "/" -- This file will only be installed or updated if it doesn't exist already, unless option -f is specified
    },
    dependencies = {
      ["GML"] = "/lib"--This package is installed into the specified subfolder
    },
    name = "Package name",--This is for "oppm info"
    description = "This is an example description",--This is for "oppm info"
    authors = "Someone, someone else",--This is for "oppm info"
    note = "Additional installation instructions, general instructions and additional information/notes go here, this is an optional line.",
    hidden = true, -- Add this optional line to make your package not visible in "oppm list", useful for custom dependency libraries
    repo="tree/master/somefolder" --Used by the website. This is where the package will link to on the website
  },
  ["yet-another-package"] = {
          ...
  }
}
```

Here is an example of a packages table for three real programs:
``` lua
{
  ["song"] = {
    files = {
      ["master/song/song.lua"] = "/lib",
      ["master/song/song-example1.lua"] = "/bin",
      ["master/song/song-example2.lua"] = "/bin"
    },
    name = "Song API",
    description = "An API to play whole songs using computer.beep",
    authors = "Vexatos",
    repo = "tree/master/song"
  },
  ["oppm"] = {
    files = {
      ["master/oppm/oppm.lua"] = "/bin",
      ["master/oppm/etc/oppm.cfg"] = "//etc",
      ["master/oppm/lib/oppm.lua"] = "/lib"
    },
    name = "OpenPrograms Package Manager",
    description = "A program to browse, download, install and update various useful programs and libraries",
    authors = "Vexatos",
    note = "If you are running this program on a floppy disk, run 'oppm install oppm' to install this program locally on your main Hard Drive.\n Consider running 'oppm update oppm' to get the latest version of this program.",
    repo = "tree/master/oppm"
  },
  ["drama"] = {
    files = {
        ["master/drama/drama.lua"] = "/bin",
    },
    name = "Drama Generator",
    description = "asie's Drama Generator inside OC",
    authors = "Vexatos",
    note = "Run and have fun!",
    repo = "tree/master/drama/drama.lua",
  }
}
```

## Registering a repository

OPPM needs to know how to find your packages table and the files that make
up the packages it describes. Depending on your goal, there are three
options available.

### oppm register

If you are developing packages that are only for your own use (e.g. as a
way to easily install software you wrote on multiple computers, or because
you want to use an external editor to edit your code and install it on an
OpenComputers computer), the `oppm register` command is probably the
easiest option.

1. Create a public GitHub repository.

2. Within the repository, ensure there is a branch named `master`; OPPM will only look for `programs.cfg` in this branch.

3. In the `master` branch, at the top level of the repository, create a file named `programs.cfg` containing your packages table.

4. Make sure you have pushed all your work.

5. Run  `oppm register` for your repository name; for example, if your GitHub username is `MyUser` and you named your repository `MyOCPackages`, you would run `oppm register MyUser/MyOCPackages`.

Your packages will now appear in `oppm list` and can be installed with
`oppm install` just like any other packages. Any changes you make to
`programs.cfg` or to the files making up your packages will become available
to OPPM, though due to caching in GitHub’s systems you may need to wait a
short time after pushing, and due to caching in OPPM you may need to reboot
the OpenComputers computer before you will see the changes.

Of course, you can share the name of your repository with other people who
can also register it and use your programs if you wish.

Note that you do not need to develop all your software on the `master`
branch. `programs.cfg` needs to live at the top level of the `master`
branch, but since the first path component of each element in the `files`
table is a branch name, you can refer to programs in other branches.

### Registering packages globally

If you want to make your packages globally available (so that everyone that
wants to is able to easily install your programs), you need to ask Vexatos on
the [OpenComputers forums](http://oc.cil.li/index.php?/index) or on IRC
to register your GitHub repository. Your GitHub repository needs to look
exactly the same as described in [[#oppm register|the previous section]].

### oppm.cfg

You can also add an additional repository by editing `/etc/oppm.cfg`.
The difference with this method is that you need to place the entire
packages table in `/etc/oppm.cfg` rather than in the repository (the
repository can contain a packages table, but it will be ignored if you
use this method).

In most cases [oppm register](#oppm+register) is preferable because it allows you to
write the packages table only once (rather than having to copy it to
every computer and keep it up to date) and to keep it together in the
same place as your code and data files. However, this method may be useful
if you wish to install Lua programs from some repository that is not your
own, and that repository does not provide a `programs.cfg` file.

Open /etc/oppm.cfg; it should look like this:

``` lua
{
    --default installation path
    path="/usr",
    --Additional repositories and packages go here, for correct package syntax, check https://github.com/OpenPrograms/Vexatos-Programs/blob/master/oppm/etc/oppm.cfg
    repos={
    }
}
```

You might notice the table called `repos`. That’s where you can register your
own packages. Each entry in the table has a repository name (GitHub
`UserOrGroup/RepoName`) as its key and the corresponding packages table as
its value. This is an example `oppm.cfg` file, having added two different
packages to OPPM (The first one as a
[reference](https://github.com/OpenPrograms/Vexatos-Programs/blob/master/oppm/etc/example-config.cfg)
, the second one as an actual example):

``` lua
{
  --default installation path
  path="/usr",
  --Additional repositories and packages go here, for correct package syntax, check https://github.com/OpenPrograms/Vexatos-Programs/blob/master/oppm/etc/example-config.cfg
  repos={
    ["YourUsername/YourRepo"] = {
      ["example-package"] = {
        files = {
          ["master/somefolder/bar.lua"] = "/",--"/" means the file will be placed inside the folder the user specified, defaults to /usr
          ["master/somefolder/barinfo.txt"] = "//etc", -- double slash for using an absolute path
          [":master/otherfolder"] = "/share/something", -- A colon marks a folder, will include everything in that folder
          [":master/otherfolder"] = "//etc/something", -- This also works with absolute paths
          ["master/somefolder/barlib.lua"] = "/subfolder",--Places the file in a subfolder in the user-specified folder
          ["master/somefolder/libfolder/"] = "/"
        },
        dependencies = {
          ["GML"] = "/lib"--This package is installed into the specified subfolder
        },
        name = "Package name",--This is for "oppm info"
        description = "This is an example description",--This is for "oppm info"
        authors = "Someone, someone else",--This is for "oppm info"
        note = "Additional installation instructions, general instructions and additional information/notes go here, this is an optional line.",
        hidden = true, -- Add this optional line to make your package not visible in "oppm list", useful for custom dependency libraries
        repo="tree/master/somefolder" --Used by the website. This is where the package will link to on the website
      },
      ["yet-another-package"] = {
              ...
      }
    },
    ["OpenPrograms/samis-Programs"]={
      ["nidus"] = {
        ["files"] = {
          ["master/nidus/nidus.lua"] = "/bin", --executable programs should always be installed to /bin
          ["master/nidus/core.lua"] = "/lib/nidus", --libraries should always be installed to /lib
          ["master/nidus/hosts.db"] = "//var/lib/nidus"
        },
        ["repo"] = "tree/master/nidus",
        ["dependencies"] = {
          ["oop-system"] = "/"
        },
        ["name"] = "NiDuS DNS Server",
        ["description"] = "A DNS server that is light and easy to use. Uses its own protocol.",
        ["authors"] = "samis"
      },
    }
  }
}
```

I hope this tutorial helped explaining what OPPM does and how to use it. If you
have any further questions, contact me (Vexatos) on the
[OC forums](http://oc.cil.li/index.php?/index) or on IRC.

Thanks for reading!