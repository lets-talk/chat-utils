/* eslint no-underscore-dangle: 0 */

import Channel from '../channel';

import { Transport, Event, EventHandler } from '../../types';

describe('Channel', () => {
  let transport: Transport;
  let channel: Channel;

  beforeEach(() => {
    transport = { setHandler: jest.fn(), send: jest.fn() };
    channel = new Channel({ transport });
  });

  describe('constructor', () => {
    it('should set the handler', () => {
      expect(transport.setHandler).toHaveBeenCalled();
    });
  });

  describe('method:addListener', () => {
    it('should call channel.on with args', () => {
      const mockListener = jest.fn();
      channel.on = jest.fn();
      channel.addListener('1', mockListener);
      expect(channel.on).toHaveBeenCalled();
      expect(channel.on).toHaveBeenCalledWith('1', mockListener);
    });
  });

  describe('method:send', () => {
    it('should call transport.send', () => {
      transport.send = jest.fn();
      const mockAction = 'mock-action';
      const mockEvent: Event = {
        type: 'test-type',
        data: [1, 2, 3],
      }

      channel.send(mockAction, mockEvent);
      expect(transport.send).toHaveBeenCalled();
      expect(transport.send).toHaveBeenCalledWith(mockAction, mockEvent);
    });
  });

  describe('method:eventNames', () => {
    it('should return an array of strings', () => {
      const mockListener = jest.fn();
      channel.on('type-1', mockListener);
      channel.on('type-2', mockListener);
      channel.on('type-2', mockListener);
      const expected = ['type-1', 'type-2'];
      expect(channel.eventNames()).toEqual(expected);
    });
  });

  describe('method:listenerCount', () => {
    it('should return the correct count', () => {
      const mockListener = jest.fn();
      channel.on('type-1', mockListener);
      channel.on('type-2', mockListener);
      channel.on('type-2', mockListener);
      expect(channel.listenerCount('type-1')).toEqual(1);
      expect(channel.listenerCount('type-2')).toEqual(2);
      expect(channel.listenerCount('type-3')).toEqual(0);
    });
  });

  describe('method:listeners', () => {
    it('should return an array of listeners', () => {
      const mockListener1 = jest.fn();
      const mockListener2 = jest.fn();
      const mockListener3 = jest.fn();
      channel.on('type-1', mockListener1);
      channel.on('type-2', mockListener2);
      channel.on('type-2', mockListener3);
      expect(channel.listeners('type-1')).toEqual([mockListener1]);
      expect(channel.listeners('type-2')).toEqual([mockListener2, mockListener3]);
    });
  });

  describe('method:on', () => {
    it('should add event listeners', () => {
      const mockListener1 = jest.fn();
      const mockListener2 = jest.fn();
      const mockListener3 = jest.fn();
      channel.on('type-1', mockListener1);
      channel.on('type-2', mockListener2);
      channel.on('type-2', mockListener3);
      const expected = {
        'type-1': [mockListener1],
        'type-2': [mockListener2, mockListener3],
      };
      expect(channel._listeners).toEqual(expected);
    });

    it('should call event listeners on event', () => {
      const mockListener = jest.fn((e) => received.push(e));
      const received: EventHandler[] = [];
      channel.on('type-1', mockListener);
      channel._handleEvent({ type: 'type-1', data: { eventName: 'test1' } });
      channel._handleEvent({ type: 'type-1', data: { eventName: 'test2' } });
      expect(received).toEqual([{ eventName: 'test1' }, { eventName: 'test2' }]);
    });
  });

  describe('method:once', () => {
    it('should add event listeners', () => {
      const mockListener = jest.fn();
      channel.once('type-1', mockListener);
      channel.once('type-2', mockListener);
      channel.once('type-2', mockListener);
      expect(channel._listeners['type-1']).toHaveLength(1);
      expect(channel._listeners['type-2']).toHaveLength(2);
    });

    it('should call event listeners only once', () => {
      const mockListener = jest.fn((e) => received.push(e));
      const received: EventHandler[] = [];
      channel.once('type-1', mockListener);
      channel._handleEvent({ type: 'type-1', data: { eventName: 'test1' } });
      channel._handleEvent({ type: 'type-1', data: { eventName: 'test2' } });
      channel._handleEvent({ type: 'type-1', data: { eventName: 'test3' } });
      expect(received).toEqual([{ eventName: 'test1' }]);
    });
  });

  describe('method:prependListener', () => {
    it('should add event listeners', () => {
      const mockListener1 = jest.fn();
      const mockListener2 = jest.fn();
      const mockListener3 = jest.fn();
      channel.prependListener('type-1', mockListener1);
      channel.prependListener('type-2', mockListener2);
      channel.prependListener('type-2', mockListener3);
      const expected = {
        'type-1': [mockListener1],
        'type-2': [mockListener2, mockListener3],
      };
      expect(channel._listeners).toEqual(expected);
    });
  });

  describe('method:prependOnceListener', () => {
    it('should add event listeners', () => {
      const mockListener1 = jest.fn();
      const mockListener2 = jest.fn();
      const mockListener3 = jest.fn();
      channel.prependOnceListener('type-1', mockListener1);
      channel.prependOnceListener('type-2', mockListener2);
      channel.prependOnceListener('type-2', mockListener3);
      expect(channel._listeners['type-1']).toHaveLength(1);
      expect(channel._listeners['type-2']).toHaveLength(2);
    });

    it('should call event listeners only once', () => {
      const mockListener = jest.fn((e) => received.push(e));
      const received: EventHandler[] = [];
      channel.prependOnceListener('type-1', mockListener);
      channel._handleEvent({ type: 'type-1', data: { eventName: 'test1' } });
      channel._handleEvent({ type: 'type-1', data: { eventName: 'test2' } });
      expect(received).toEqual([{ eventName: 'test1' }]);
    });
  });

  describe('method:removeAllListeners', () => {
    it('should remove all listeners', () => {
      const mockListener1 = jest.fn();
      const mockListener2 = jest.fn();
      const mockListener3 = jest.fn();
      channel.on('type-1', mockListener1);
      channel.on('type-2', mockListener2);
      channel.on('type-2', mockListener3);
      channel.removeAllListeners();
      expect(channel._listeners).toEqual({});
    });

    it('should remove all listeners for a type', () => {
      const mockListener1 = jest.fn();
      const mockListener2 = jest.fn();
      const mockListener3 = jest.fn();
      channel.on('type-1', mockListener1);
      channel.on('type-2', mockListener2);
      channel.on('type-2', mockListener3);
      channel.removeAllListeners('type-2');
      expect(channel._listeners).toEqual({ 'type-1': [{ eventName: 'test1' }] });
    });

    it('should do nothing if eventType does not exists', () => {
      const mockListener1 = jest.fn();
      const mockListener2 = jest.fn();
      const mockListener3 = jest.fn();
      channel.on('type-1', mockListener1);
      channel.on('type-2', mockListener2);
      channel.on('type-2', mockListener3);
      channel.removeAllListeners('type-4');
      const expected = {
        'type-1': [{ eventName: 'test1' }],
        'type-2': [{ eventName: 'test2' }, { eventName: 'test3' }],
      };
      expect(channel._listeners).toEqual(expected);
    });
  });

  describe('method:removeListener', () => {
    it('should remove listener for type-2 event only', () => {
      const mockListener1 = jest.fn();
      const mockListener2 = jest.fn();
      const mockListener3 = jest.fn();
      channel.on('type-1', mockListener1);
      channel.on('type-2', mockListener2);
      channel.on('type-2', mockListener3);
      const expected = {
        'type-1': [{ eventName: 'test1' }],
        'type-2': [{ eventName: 'test2' }],
      };
      channel.removeListener('type-2', mockListener3);
      expect(channel._listeners).toEqual(expected);
    });

    it('should do nothing if eventType does not exists', () => {
      const mockListener1 = jest.fn();
      const mockListener2 = jest.fn();
      channel.on('type-1', mockListener1);
      channel.on('type-2', mockListener2);
      const expected = {
        'type-1': [{ eventName: 'test1' }],
        'type-2': [{ eventName: 'test2' }],
      };
      channel.removeListener('type-4', () => null);
      expect(channel._listeners).toEqual(expected);
    });
  });
});
