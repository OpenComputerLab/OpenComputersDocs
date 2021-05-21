# Lua Code Conventions

- Be consistent.
- Indent using spaces, two wide. Do indent properly.
- Try to limit width of the code to 80 chars.
- Don't add spaces between braces/brackets and what's in them.
- Do use brackets in functions calls even if it's not necessary.
- Name variables for what they are.\
      Don't include type markers in them. i.e. do not use Hungarian notation.

- Nice to have: sort your requires alphabetically (OCD!)
- Feel free to comment your code
      Any additional memory needed to load. 
     your file due to heavy use of comments is released soon after
     loading is complete.

- If you have to validate arguments, use the built-in checkArg method.\
      Homogenous error messages are a good thing! Its usage is checkArg(n,
      value, type1, ...), where n is the number of the argument, value is
      the value of the argument and type1 and so on are the allowed types
      for the argument, as retrieved via type(value). The number is used
      in the error message like so: "bad argument #n (type1 expected,
      got type(value))". So for example, to require the first argument to
      be a number you'd do checkArg(1, arg, "number").

Bad Code:
``` lua
function f(sArg1 , ... )
   assert(type(sArg1)== "string", "me wants a strign!")
    if sArg1 then
        local nResult = 1
        --do some more stuff
        return nResult
  end
end
if  f ( "a" )  ==1 then
print"asd"
end
```

Good Code:
``` lua
function f(name, ...)
  checkArg(1, name, "string")
  if name then
    local result = 1
    -- We extrapolate the b-spline of the non-euclidean space to
    -- determine the fraction of potential failures encountered.
    return result
  end
end
if f("a") == 1 then
  print("asd")
end
```