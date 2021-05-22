# APIs
## 标准库
首先，如果你是 Lua 新手，你应该阅读 [Lua参考手册](http://www.lua.org/manual/5.3/manual.html)。您将在这里找到最基本的Lua功能，以及一系列标准库函数。

OpenComputers makes an effort to largely emulate the standard library in areas that would usually interact with the host system - that being the I/O library. There are a few differences, which you can look up here: [differences in the standard libraries](https://ocdoc.cil.li/api:non-standard-lua-libs). Most notably, the debug library is mostly unavailable, and load only accepts text source files, no binary / pre-compiled Lua programs (for security reasons).