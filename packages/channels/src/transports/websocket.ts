/* eslint-disable no-underscore-dangle */

import { WebSocket } from 'global';
import { Event, EventHandler, Transport, WebsocketConfig } from '../types';

const error = require('debug')('transports:websocket:error');

export default class WebsocketTransport implements Transport {
  _socket: any;
  _buffer: any[];
  _handler?: (event: Event) => void;
  _isReady: boolean;

  constructor(websocketConfig: WebsocketConfig) {
    const { url } = websocketConfig;
    this._socket = null;
    this._buffer = [];
    this._handler = undefined;
    this._isReady = false;
    this._connect(url);
  }

  setHandler(handler: EventHandler) {
    this._handler = handler;
  }

  send(action: string, event: Event) {
    return new Promise((resolve, reject) => {
      if (!this._isReady) {
        this._sendLater(action, event);
        reject('No socket connection.');
      } else {
        this._socket.emit(action, event, (response: any) => {
          if (response.error) {
            error(response.error);
            reject(response.error);
          } else {
            resolve();
          }
        });
      }
    });
  }

  _sendLater(action: string, event: Event) {
    this._buffer.push({
      action, event
    });
  }

  _flush() {
    const buffer = this._buffer;
    this._buffer = [];
    buffer.forEach(({ action, event }) => this.send(action, event));
  }

  _connect(url: string) {
    this._socket = new WebSocket(url);
    this._socket.onopen = () => {
      this._isReady = true;
      this._flush();
    };
    this._socket.onmessage = (event: Event) => {
      this._handler && this._handler(event);
    };
    this._socket.onerror = (e: Error) => {
      error('websocket: connection error', e.message);
    };
    this._socket.onclose = (e: any) => {
      error('websocket: connection closed', e.code, e.reason);
    };
  }
}
