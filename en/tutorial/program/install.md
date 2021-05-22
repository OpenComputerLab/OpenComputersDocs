# Tutorial: The Install Program

`install` is an application that comes shipped with [OpenOS](/openos). For most
users and in most computer configurations it is expected that the primary method
of installing OpenOS is by using this very same `install` application. `install`
is also designed to install the software, libraries, and help scripts that come
bundled with all the craftable mod-provided [loot disks](/item/loot_disks).

To understand more about command line options for `install`, it is recommended to
read its man pages by running `man install`, or by reading the man page online 
[here](https://raw.githubusercontent.com/MightyPirates/OpenComputers/master-MC1.7.10/src/main/resources/assets/opencomputers/loot/openos/usr/man/install).

`install` takes the following actions

- Step One: Scan for Software to Install\
    First it scans for candidate source filesystems. These are filesystems, such as [[:item:loot disks|loot disks]],  that can be used as a software package for installation. If more than one candidate source filesystem is found, it prompts the user, asking\
    `What do you want to install?`\
    Followed by a list of disks it found that can be installed.

- Step Two: Scan for Hard Drives\
    The next step is a scan for candidate target filesystems. These are filesystems, such as hard drives, that can be the target of an install. In the example of installing OpenOS from a loot disk to the hard drive, the hard drive is the target filesystem. Like candidate sources, if `install` finds multiple candidate targets, it asks the user to select one:\
    `Where do you want to install to?`\
    Followed by a list of disks it found that can be installed **to**.

- Step Three: Installation\
    Before continuing with the install, the user is asked for confirmation to install\
    `Install OpenOS to /mnt/e03/? [Y/n]`\
    Confirming this step will copy the files from the (e.g.) loot disk to the target filesystem. Software installs may have an optional `.prop` file which can tell `install` whether or not to set the default filesystem the computer should boot to, what label if any to set, and whether the system should reboot when installation is complete.\
    There is also the option for software disks to provide a fully custom install experience by creating an `.install` file at the root of the disk's filesystem. After confirming the source and target, `install` will invoke `.install` if it exists in the source filesystem.

- Optional Arguments\
    It is recommend to review the `install` man page for greater details and a full list of supported arguments. But I considered it interesting to mention here that the label of the loot disk can be used as a command line argument for install -- which will refine the candidate search to disks matching that label.\
    `install openos`\
    Note that the argument is case insensitive. In a scenario where there would have been multiple software disks available to install, specifying the label in this manner may allow `install` to reduce the candidate selection without prompting the user.

## Installing Additional Software

Besides installing loot disks (such as openos), It is intended that users can take advantage of the `install` program for custom software disks. If you are providing software distributed on a portable filesystem, you can expect `install` to be a useful utility. For this documentation we'll assume you are distributing your software via floppy disk, though `install` does not distinguish between any filesystem component, floppy or hard disk or other.

The most basic and default way to use `install` with your software disk is to do nothing, and it'll just sort of work. `install` checks all available filesystems that have any files and considers them candidates for installation. The user is prompted to select what to install, and `install` does a very simple copy of all files in that disk to the selected destination. This is actually how OpenOS itself installs.

You have some control over how install behaves by creating a custom .prop and/or a custom .install file at the root of your software distribution disk. The .prop file is expected to be a valid lua table that set optional flags for `install`. For example, the openos .prop file contents are: `{label = "OpenOS", reboot=true, setlabel=true, setboot=true}`

Note that `install`'s default copy action skips .prop (.prop is not copied).

- You can set a custom label\
    `install` can refer to and label installation options. By default, `install` uses the filesystem label (or the filesystem address if no label is set). This label can be helpful for `install` and the user experience. The user can actually tell `install` what to install from a command line argument before even being prompted about install options. For example, if you type `install openos`, and in the chance there were other installation options -- `install` will only give the openos option for install. It is a way for a user to specifically get what they want before being asked. In addition to this, `install` uses the same labelling logic when listing the install options.\
    You can override the label `install` uses by defining the `label` table key in your `.prop` file. If you want your users to be able to say: `install my_cool_stuff`, you'll want to create a .prop file at the root of your software disk that is: `{label="my_cool_stuff"}`

- Be ignored (hide from install)\
    In the case that you are using `install` and also using multiple filesystems and floppies, it might become an annoyance that `install` always includes disks as candidate installation sources when you'd really just prefer it ignore it. You can create a .prop file that has `{ignore=true}` and the next time `install` is run, it won't list that filesystem as a source option.

- Custom install action\
    If you have a more complex set of operations than JUST copying files (or even setting the boot disk, setting labels, or rebooting), for example you might want to limit which files are copied, and where they are copied to (the default copy destination is the root of the target filesystem). Note that a user can control which sub directory are copied and to where using `install` arguments, but perhaps you want to make your software disk's installation a bit more supportive of the user, and you might want to configure the install steps yourself.

Once a user has confirmed your software disk as the installation source, `install` will check for the existence of a `.install` file (please note that preceding dot in the filename, just like with `.prop`). IF that file exists, `install` does NOT copy any files, but instead it runs your custom `.install` as a script (and then does nothing else). Once your `.install` script is running you have full control of how to finish the install process.

Your custom `.install` script is given in its loaded environment a helpful `install` table that contains all the options that the `/bin/install` program has been able to learn thus far.

For example, if this was my custom `.install` script, in its entirety (yes, NO OTHER INCLUDES):

``` lua
for k,v in pairs(install) do
  io.write(k, " -> ", v)
end
```

This would be the output (my filesystem was mounted on /mnt/c2b, and my .prop file had `{label="foo"}`)

```
from -> /mnt/c2b
root ->
label -> foo
to -> //
fromDir ->
```

The user could have also optionally used some command line args, such as: `install foo --noreboot --nosetlabel`. In which case I would see those values passed to my installer script.