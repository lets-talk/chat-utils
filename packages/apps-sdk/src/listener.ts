/* eslint no-underscore-dangle: 0 */
import { ObjectIndex } from './types';

export default class Listener {
  private _listeners: ObjectIndex<Function>;
  constructor() {
    this._listeners = {};
  }

  addListener(type: string, listener: Function) {
    this._listeners[type] = listener;
  }

  eventNames() {
    return Object.keys(this._listeners);
  }

  listener(type: string) {
    return this._listeners[type];
  }

  removeAllListeners() {
    Object.keys(this._listeners).forEach((type) => {
      delete this._listeners[type];
    })
  }

  removeListener(type: string) {
    const listeners = this._listeners[type];
    if (listeners) {
      delete this._listeners[type];
    }
  }

  fire(eventName: string, ...args: any[]) {
    const listener = this._listeners[eventName];
    return listener(...args);
  }
}
