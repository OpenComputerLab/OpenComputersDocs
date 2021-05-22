# Installation and Operation of OpenOS

The purpose of this page of documentation is to focus on the
installation and command line interface of OpenOS. This page begins with
the assumption you have turned on a computer (of any tier) with the
[OpenOS floppy disk](/item/openos_floppy) and an empty [hard
drive](/item/hard_disk_drive) (of any tier) in the computer.

## Installation

Having booted your computer you should be greeted with a motd (which
stands for "Message of the Day") and the shell prompt, `/home/# `.

![](https://ocdoc.cil.li/_media/first_boot.png)

The computer at this point is usable and, assuming you have a [hard
drive](/item/hard_disk_drive) in the [case](/block/computer_case) of the
computer, you have writable storage space to create files. However
you've only booted the system using the [OpenOS floppy disk](/item/openos_floppy).
In other words, your current directory is read-only;
i.e. you cannot create or modify files in your current directory.

To list what filesystems are available, run `mount`

![first_mount.png](https://ocdoc.cil.li/_media/api:first_mount.png)

The output of `mount` has 4 important columns.

- `filesystem address`\
      First the filesystem component address, a unique 128 bit value whose
      first 32 bits are shown in hexadecimal.

- `mount point`\
      The second column, following the word "on", informs the user where
      in the directory tree the filesystem is mounted. This is also known
      as the mount point. The filesystem mounted on "/" is also known as
      the "rootfs" (or root filesystem). The rootfs is the mount point
      of the filesystem that booted the computer. If you have installed an
      operating system you'll find its system files in the directory tree
      below `/`.

- `read/write access`\
      The third column shows either "(ro)", which stands for
      "read-only", or "(rw)", which stands for "read/write". OpenOS
      only supports these two access permissions and they are filesystem
      wide (as opposed to more modern filesystems that have separate
      permissions per directory and per file even under the same
      filesystem mount point). In this image we see that the rootfs is
      mounted read-only. This is because I have booted the computer with
      an OpenOS floppy disk, and [Loot disks](/item:loot_disks) are read-only filesystems.\
      In case the name of the access (ro vs rw) was not clear, you cannot
      modify or create files in a filesystem mounted read-only.

- `label`\
      The last column displays the filesystem's label or the
      filesystem's component address in the case it has no label.
      [Loot disks](/item:loot_disks) always have their loot disk name
      as the filesystem label. You may notice that the filesystem mounted
      on `/mnt/0e7/` in my example has a very long "label". This is
      because I am using a brand new tier 1 hard drive which doesn't have
      a label yet and thus its address is displayed which causes the
      terminal to wrap the text.

You may also notice that a few of the filesystems are mounted multiple
times. The behavior of OpenOS is to automatically mount filesystems in
the /mnt directory, with the first 3 or more unique letters of its
address as the directory name. Some components get a special mount
location, such as the filesystem that booted the system. In this case,
the floppy disk on /mnt/bc3/ is the boot filesystem, and thus is the
rootfs (on /). To help make the listing more readable, `mount` sorts
the listing by address.

We learn from this image that the rootfs is read-only. This reminds me
that I have booted from a loot disk, and that I have not yet installed
OpenOS to my hard drive. The computer would fail to boot were I to
remove the floppy.

All I need to do is run `install`

![first_install.png](https://ocdoc.cil.li/_media/api:first_install.png)

You can enter y or just press **ENTER** (the uppercase "Y" in the
[Y/n] notation informs you that "Y" is the default answer if an
empty line is entered). After you confirm the install, you'll see a
verbose listing of all the files being copied to your hard drive. When
the installation is complete `install` confirms you are ready to
reboot the system. When the system reboots, your rootfs will be the hard
drive you just installed OpenOS to.

![reboot_ready.png](https://ocdoc.cil.li/_media/api:reboot_ready.png)

Running `mount` again will show that rootfs is now (rw).

![system_ready.png](https://ocdoc.cil.li/_media/api:system_ready.png?w=600&tok=4b181a)
