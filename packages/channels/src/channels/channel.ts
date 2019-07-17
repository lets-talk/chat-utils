/* eslint no-underscore-dangle: 0 */
import stringify from 'json-stringify-safe';
import { channelConfig, Event, EventHandler, ObjectIndex, Transport } from '../types';

export default class Channel {
  _sender: string;
  _transport: Transport;
  _listeners: ObjectIndex<EventHandler[]>;

  constructor(channelConfig: channelConfig) {
    const { transport } = channelConfig;
    this._sender = this._randomId();
    this._transport = transport;
    this._transport.setHandler((this._handleEvent as any).bind(this));
    this._listeners = {};
  }

  addListener(type: string, listener: () => void) {
    this.on(type, listener);
  }

  send(type: string, event: Event) {
    this._transport.send(type, event);
  }

  eventNames() {
    return Object.keys(this._listeners);
  }

  listenerCount(type: string) {
    const listeners = this._listeners[type];
    return listeners ? listeners.length : 0;
  }

  listeners(type: string) {
    return this._listeners[type];
  }

  on(type: string, listener: EventHandler) {
    this._listeners[type] = this._listeners[type] || [];
    this._listeners[type].push(listener);
  }

  once(type: string, listener: EventHandler) {
    const onceListener = this._onceListener(type, listener);
    this.on(type, onceListener);
  }

  prependListener(type: string, listener: EventHandler) {
    this._listeners[type] = this._listeners[type] || [];
    this._listeners[type].unshift(listener);
  }

  prependOnceListener(type: string, listener: EventHandler) {
    const onceListener = this._onceListener(type, listener);
    this.prependListener(type, onceListener);
  }

  removeAllListeners(type?: string) {
    if (!type) {
      this._listeners = {};
    } else if (this._listeners[type]) {
      delete this._listeners[type];
    }
  }

  removeListener(type: string, listener: EventHandler) {
    const listeners = this._listeners[type];
    if (listeners) {
      this._listeners[type] = listeners.filter((l) => stringify(l) !== stringify(listener));
    }
  }

  _randomId() {
    // generates a random 13 character string
    return Math.random()
      .toString(16)
      .slice(2);
  }

  _handleEvent(event: Event) {
    const listeners = this._listeners[event.type];
    if (listeners) {
      listeners.forEach((fn) => fn(event));
    }
  }

  _onceListener(type: string, listener: EventHandler): EventHandler {
    const onceListener = (data: any) => {
      this.removeListener(type, listener);
      return listener(data);
    };
    return onceListener;
  }
}
