# Modding: Custom Architectures

In this article I'll explain how architectures for OpenComputers work,
and how to go about adding a custom architecture. A word of warning:
implementing an architecture is *not trivial*. Don't expect this to
be a two-step-way-to-satisfaction kind of thing.

## What's an architecture?

Let's first clarify what I mean when I talk about an "architecture"
in the context of OpenComputers. An architecture is the glue code
between some kind of code-executor (henceforth: VM) and OC's components
/ Minecraft. OC strongly separates component logic from computer logic.
In other words, a component - like a graphics card - does not know what
kind of architecture it is used by. Vice-versa, an architecture doesn't
know anything about how components work. All of this message passing is
handled by a *Machine*. The machine is what's driving the
architecture and provides callbacks for the architecture to communicate
with the outside.

## Using an architecture

To make the whole thing a little less abstract, here's how an
architecture is actually *used*. This will hopefully provide a better
understanding of where the architecture implementation fits into the OC
ecosystem. To use an architecture, a machine using that architecture
must be created.

- *Note*: OC 1.4 allows addons to register architectures that can be
    provided by the standard CPUs, so you will not have to implement an
    actual computer block / item yourself. The architecture a CPU
    provides can be changed by sneak-activating the CPU while holding it
    in your hand.

The machine encapsulates the architecture and takes care of thread
scheduling, signal queuing, network connecticity and so on. All you have
to do for the created machine is call `update()` each tick (and maybe
forward some calls such as `start()` to it).

## Lifecycle

The lifecycle of an architecture is roughly: instantiation,
`initialize()`, repeatedly `runThreaded()` / `runSynchronized()`,
`close()` [, goto `initialize()`].

- The architecture is created when its machine is created.

- Whenever a machine (re)starts, it is asked to `initialize()` itself.\
    This usually means setting up the underlying VM.

- The standard way of driving an architecture is via `runThreaded()`.\
    It is called from an executor thread. The architecture's state
    should progressed in here. The returned result type is used by the
    machine for scheduling. *Important*: this method must never throw.
    It is your responsibility to handle all errors and convert them to
    an error result, if necessary.

- A special execution result is the request to perform a
    'synchronized call'. This indicates to the machine that the next
    time it should drive the architecture using `runSynchronized()`.
    This call will *always be made from the MC server thread*, meaning
    it is safe to interact with the world in this callback.

- When a machine is stopped, `close()` is called, where any open
    resources may then be disposed.

## Providing context

In the most simple case, you just call some 'run' method in your VM
each time `runThreaded()` is called. This is pretty useless, though,
since you'll want to communicate with the outside somehow. For this,
communication with components has to be provided to the VM. It is your
responsibility to define the APIs inside the VM that are used to
communicate with the machine's API (e.g. `components()` and
`invoke()`).

## Synchronized calls and call limits

Callbacks on components may declare to be "direct", and in addition to
that they may declare a "call limit". Per default, all component
callbacks are *synchronized* calls, i.e. the architecture must ensure
that they are only called from runSynchronized(). The call limit for
direct calls limits how often per tick any single method may be called
from any single machine. The limit itself is enforced in the machine's
invoke method, which will throw a `LimitReachedException` once there
were too many call. At that point the architecture should either perform
a short sleep, or fall back to perform a synchronized call instead.

- *Note*: while writing this I realized I forgot to pull some methods
    required to perform checks on this into the API. This will be
    remedied in the next API update, making methods for this available
    in the Component interface. For now, either reflect into it or build
    against the OC sources. Sorry about that.

## Example code

Let's say you have some VM that provides the following interfaces:

``` java
/** The VM itself. This is just an example, it's not a "real" interface. */
public interface PseudoVM {
  Object[] run(Object[] args) throws Exception;
 
  void setApiFunction(String name, PseudoNativeFunction value);
}
 
/** Interface defining callbacks provided by the host. */
public interface PseudoNativeFunction {
  Object invoke(Object[] args);
}
```

A very primitive architecture implementation might look something like
this:

``` java
/** This is the class you implement; Architecture is from the OC API. */
@Architecture.Name("Pseudolang")
public class PseudoArchitecture implements Architecture {
  private final Machine machine;
 
  private PseudoVM vm;
 
  /** The constructor must have exactly this signature. */
  public PseudoArchitecture(Machine machine) {
    this.machine = machine;
  }
 
  public boolean isInitialized() { return true; }
 
  public void recomputeMemory() {}
 
  public boolean initialize() {
    // Set up new VM here, and register all API callbacks you want to
    // provide to it.
    vm = new PseudoVM();
    vm.setApiFunction("invoke", new PseudoNativeFunction() {
      public Object invoke(Object[] args) {
        final String address = (String)args[0];
        final String method = (String)args[1];
        final Object[] params = (Object[])args[2];
        try {
          return new Object[]{true, machine.invoke(address, method, params)};
        }
        catch (e LimitReachedException) {
          // Perform logic also used to sleep / perform synchronized calls.
          // In this example we'll follow a protocol where if this returns
          // (true, something) the call succeeded, if it returns (false)
          // the limit was reached.
          // The script running in the VM is then supposed to return control
          // to the caller initiating the current execution (e.g. by yielding
          // if supported, or just returning, when in an event driven system).
          return new Object[]{false};
        }
      }
    });
    vm.setApiFunction("isDirect", new PseudoNativeFunction() {
      public Object invoke(Object[] args) {
        final String address = (String)args[0];
        final String method = (String)args[1];
        final Node node = machine.node().network().node(address);
        if (node instanceof Component) {
          final Component component = (Component) node;
          if (component.canBeSeenFrom(machine.node())) {
            final Callback callback = machine.methods(node.host()).get(method);
            if (callback != null) {
              return callback.direct();
            }
          }
        }
        return false;
      }
    });
    // ... more callbacks.
    return true;
  }
 
  void close() {
    vm = null;
  }
 
  ExecutionResult runThreaded(boolean isSynchronizedReturn) {
    // Perform stepping in here. Usually you'll want to resume the VM
    // by passing it the next signal from the queue, but you may decide
    // to allow your VM to poll for signals manually.
    try {
      final Signal signal;
      if (isSynchronizedReturn) {
        // Don't pull signals when we're coming back from a sync call,
        // since we're in the middle of something else!
        signal = null;
      }
      else {
        signal = machine.popSignal();
      }
      final Object[] result;
      if (signal != null) {
        result = vm.run(new Object[]{signal.name(), signal.args()});
      }
      else {
        result = vm.run(null);
      }
 
      // You'll want to define some internal protocol by which to decide
      // when to perform a synchronized call. Let's say we expect the VM
      // to return either a number for a sleep, a boolean to indicate
      // shutdown/reboot and anything else a pending synchronous call.
      if (result != null) {
        if (result[0] instanceof Boolean) {
          return new ExecutionResult.Shutdown((Boolean)result[0]);
        }
        if (result[0] instanceof Integer) {
          return new ExecutionResult.Sleep((Integer)result[0]);
        }
      }
      // If this is returned, the next 'resume' will be runSynchronized.
      // The next call to runThreaded after that call will have the
      // isSynchronizedReturn argument set to true.
      return new ExecutionResult.SynchronizedCall();
    }
    catch (Throwable t) {
      return new ExecutionResult.Error(t.toString);
    }
  }
 
  void runSynchronized() {
    // Synchronized calls are run from the MC server thread, making it
    // easier for callbacks to interact with the world (because sync is
    // taken care for them by the machine / architecture).
    // This means that if some code in the VM starts a sync call it has
    // to *pause* and relinquish control to the host, where we then
    // switch to sync call mode (see runThreaded), wait for the MC server
    // thread, and then do the actual call. It'd be possible to pass the
    // info required for the call out in runThreaded, keep it around in
    // the arch and do the call directly here. For this example, let's
    // assume the state info is kept inside the VM, and the next resume
    // makes it perform the *actual* call. For some pseudo-code handling
    // this in the VM, see below.
    vm.run(null);
  }
 
  void onConnect() {}
 
  // Use this to load the VM state, if it can be persisted.
  void load(NBTTagCompound nbt) {}
 
  // Use this to save the VM state, if it can be persisted.
  void save(NBTTagCompound nbt) {}
}
```

Some pseudo-code for handling synchronized calls in the VM:

``` scala
private def invokeSynchronous(address, method, ...) {
  yield; // This is where it returns to runThreaded().
   // This is where we enter in runSynchronized();
  val result = native.invoke(address, method, ...);
  // See definition of invoke in initialize() for values of result.
  yield; // And return to runSynchronized();
  // And the next runThreaded() enters again.
  return result[1];
}
private def invokeDirect(address, method, ...) {
  val result = native.invoke(address, method, ...);
  // See definition of invoke in initialize() for values of result.
  if (result[0] == true) {
    return result[1];
  }
  else {
    return invokeSynchronous(address, method, ...);
  }
}
def invoke(address, method, ...) {
  if (isDirect(address, method)) {
    return invokeDirect(address, method, ...);
  }
  else {
    return invokeSynchronous(address, method, ...);
  }
}
```

## Registering an architecture

This one's pretty simple: just do
`li.cil.oc.api.Machine.add(PseudoArchitecture.class)`. This will allow
CPUs to provide the registered architecture. If you do not wish OC CPUs
to provide your architecture, you can either add your own `Processor`
driver that can be used to get access to the architecture, or go one
step further and add your own computer block, that will exclusively run
your architecture, for example.