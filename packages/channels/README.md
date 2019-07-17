#  Channel

Channel is similar to an EventEmitter.
Channels are used to send/receive events

```js
class Channel {
  addListener(type, listener) {}
  emit(type, ...args) {}
  eventNames() {}
  listenerCount(type) {}
  listeners(type) {}
  on(type, listener) {}
  once(type, listener) {}
  prependListener(type, listener) {}
  prependOnceListener(type, listener) {}
  removeAllListeners(type) {}
  removeListener(type, listener) {}
}
```

The channel takes a Transport object as a parameter which will be used to send/receive messages. The transport object should implement this interface.

```js
class Transport {
  send(event) {}
  setHandler(handler) {}
}
```
