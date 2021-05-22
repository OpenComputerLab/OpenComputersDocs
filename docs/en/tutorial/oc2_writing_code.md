# OC Tutorial: Writing Code

So, you've [built your first computer](/tutorial/oc1_basic_computer)
and wonder what to do with it?

Well, let's start with the good old, proven, beloved first program. You
know which one. First off, let's switch to the `/tmp` folder, which
is a small, writable file system each computer comes with. Remember,
this gets *wiped on reboot*, so don't put anything valuable in here!

![](https://i.imgur.com/7YdcUbE.png)

As shown in the image, type `edit <filename>`, where `filename` is
the name of the file you wish to edit. The `.lua` extension is
absolutely optional, I just like to keep it for syntax highlighting when
opening the files in an external editor.

Once in the editor, start coding. In our case it's just the boring,
uncreative-but-proven `print("Hello World!")`.

![](https://i.imgur.com/5F16EEV.png)

When you're done, press Ctrl+S to save, then press Ctrl+W to close the
editor. If you list the contents of the `/tmp` folder now, you'll see
the file has been created. Type its name and press enter to run it:

![](https://i.imgur.com/KiHVUMu.png)

Notice that I didn't type the `.lua` extension when running it. The
shell will look for files with that extension if it can't find the file
with the exact name you specified.

If want your programs to survive reboots, **continue by reading on [how
to use hard drives](/tutorial/oc3_hard_drives)**.

## Contents

# OC Tutorial: Writing Code

So, you've [built your first computer](/tutorial/oc1_basic_computer)
and wonder what to do with it?

Well, let's start with the good old, proven, beloved first program. You
know which one. First off, let's switch to the `/tmp` folder, which
is a small, writable file system each computer comes with. Remember,
this gets *wiped on reboot*, so don't put anything valuable in here!

![](https://i.imgur.com/7YdcUbE.png)
As shown in the image, type `edit <filename>`, where `filename` is
the name of the file you wish to edit. The `.lua` extension is
absolutely optional, I just like to keep it for syntax highlighting when
opening the files in an external editor.

Once in the editor, start coding. In our case it's just the boring,
uncreative-but-proven `print("Hello World!")`.

![](https://i.imgur.com/5F16EEV.png)

When you're done, press Ctrl+S to save, then press Ctrl+W to close the
editor. If you list the contents of the `/tmp` folder now, you'll see
the file has been created. Type its name and press enter to run it:

![](https://i.imgur.com/KiHVUMu.png)

Notice that I didn't type the `.lua` extension when running it. The
shell will look for files with that extension if it can't find the file
with the exact name you specified.

If want your programs to survive reboots, **continue by reading on [how
to use hard drives](/tutorial/oc3_hard_drives)**.