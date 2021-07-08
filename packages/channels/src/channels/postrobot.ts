/* eslint-disable no-underscore-dangle */

import { window, document } from 'global';
import postRobot from 'post-robot';
import { retryOnFailure } from '../utils/requests';

const debug = require('debug')('channels:channel:postrobot');
const error = require('debug')('channels:channel:postrobot:error');

import {
  // Retry Strategy constants
  RETRY_STRATEGY_NAME,
  RETRY_TIMES_TO_RETRY,
  RETRY_DELAY,
  RETRY_DELAY_FACTOR,
} from '../utils/constants';

import { Event, EventHandler, ObjectIndex, postrobotChannelConfig } from '../types';

export const KEY = 'letstalk-proxy-channel';

const defaultRetryStrategy = {
  strategyName: RETRY_STRATEGY_NAME,
  timesToRetry: RETRY_TIMES_TO_RETRY,
  delay: RETRY_DELAY,
  delayFactor: RETRY_DELAY_FACTOR,
};

type PromisedEvent = Event & {
  resolve: any;
  reject: any;
}

export class Channel {
  _config: ObjectIndex<any>;
  _buffer: PromisedEvent[];
  _isWindowInitialized: boolean;

  constructor(config: postrobotChannelConfig) {
    this._config = config;
    this._buffer = [];
    this._isWindowInitialized = false;
    this._send = this._send.bind(this);
  }

  getConfig() {
    return this._config;
  }

  setConfig(config: postrobotChannelConfig) {
    this._config = config;
  }

  setWindowInitialized() {
    this._isWindowInitialized = true;
  }

  _getWindow() {
    if (this._config.iframeId) {
      const iframe = document.getElementById(this._config.iframeId);
      if (!iframe) {
        return null;
      }
      return iframe.contentWindow;
    }
    return window.parent;
  }

  _handleSendError(errorObject: Error, operationName: string, data: Event) {
    if (errorObject.message.indexOf('No handler found for') !== -1) {
      debug('Did not recieved ack. Enqueue for later', errorObject);
      this.enqueue(operationName, data).then(() => {
        debug(`Enqueded event ${operationName} worked ok when retrying`);
      }).catch((err: Error) => {
        error(`Enqueded event ${operationName} could not be sent`, err);
      });
    } else {
      error(`${operationName} error:`, errorObject);
    }
  }

  getBuffer() {
    return this._buffer;
  }

  flush() {
    const buffer = this._buffer;
    this._buffer = [];
    buffer.forEach((item) => {
      this.send(item.type, item)
        .then(item.resolve)
        .catch(item.reject);
    });
  }

  addListener(type: string, callback: EventHandler) {
    postRobot.on(type, callback, this._config.listener);
  }

  enqueue(type: string, event: Event) {
    return new Promise((resolve, reject) => {
      this._buffer.push({
        type, data: event.data, resolve, reject,
      });
    });
  }

  _send(type: string, event: Event) {
    const sendWindow = this._getWindow();
    if (!sendWindow || !this._isWindowInitialized) {
      debug('channel-postrobot: Channel can not get a window to send message to. Using config:', this._config);
      return new Promise((resolve, reject) => {
        this._buffer.push({
          type, data: event.data, resolve, reject,
        });
      });
    }
    // If we reach this point there is connection
    // Send enqueded messages if any
    this.flush();

    return postRobot.send(sendWindow, type, event, { ...this._config.sender })
      .catch((error: Error) => {
        this._handleSendError(error, type, event);
      });
  }

  send(type: string, event: Event) {
    const useRetryStrategy = (this._config.retryStrategy && this._config.retryStrategy.enabled) || false;
    if (useRetryStrategy) {
      const configuredRetryStrategy = this._config.retryStrategy;
      const retryStrategyConfig = { ...defaultRetryStrategy, ...configuredRetryStrategy };
      const sendWithRetry = retryOnFailure(this._send, retryStrategyConfig);
      return sendWithRetry(type, event);
    }
    return this._send(type, event);
  }

  on(type: string, callback: EventHandler) {
    return postRobot.on(type, callback, { ...this._config.listener });
  }

  once(type: string, callback: EventHandler) {
    return postRobot.once(type, callback, { ...this._config.listener });
  }
}

export default function createChannel(config: postrobotChannelConfig) {
  return new Channel(config);
}
