/* eslint no-underscore-dangle: 0 */

import Listener from '../listener';

describe('Listener', () => {
  let listener: Listener;

  beforeEach(() => {
    listener = new Listener();
  });

  describe('method:addListener', () => {
    it('should regiter listeners when calling addListeners', () => {
      const mockHandler1 = jest.fn();
      const mockHandler2 = jest.fn();
      listener.addListener('type-1', mockHandler1);
      listener.addListener('type-2', mockHandler2);

      listener.fire('type-1');
      listener.fire('type-2');
      expect(mockHandler1).toHaveBeenCalled();
      expect(mockHandler2).toHaveBeenCalled();
    });

    it('should call event listeners on event', () => {
      const received: string[] = [];

      listener.addListener('type-1', (n: string) => received.push(n));
      listener.fire('type-1', { eventName: 'test1' });
      listener.fire('type-1', { eventName: 'test2' });

      expect(received).toEqual([{ eventName: 'test1' }, { eventName: 'test2' }]);
    });
  });

  describe('method:eventNames', () => {
    it('should return an array of strings with the registered events names', () => {
      const mockHandler1 = jest.fn();
      const mockHandler2 = jest.fn();
      const mockHandler3 = jest.fn();
      listener.addListener('type-1', mockHandler1);
      listener.addListener('type-2', mockHandler2);
      listener.addListener('type-3', mockHandler3);

      const expected = ['type-1', 'type-2', 'type-3'];
      expect(listener.eventNames()).toEqual(expected);
    });
  });

  describe('method:removeAllListeners', () => {
    it('should remove all listeners', () => {
      const mockHandler1 = jest.fn();
      const mockHandler2 = jest.fn();
      listener.addListener('type-1', mockHandler1);
      listener.addListener('type-2', mockHandler2);
      listener.removeAllListeners();
      expect(listener.listener('type-1')).toBeUndefined();
      expect(listener.listener('type-2')).toBeUndefined();
    });

    it('should remove all listeners for a type', () => {
      const mockHandler1 = jest.fn();
      const mockHandler2 = jest.fn();
      listener.addListener('type-1', mockHandler1);
      listener.addListener('type-2', mockHandler2);
      listener.removeListener('type-2');
      expect(listener.listener('type-1')).toEqual(mockHandler1);
      expect(listener.listener('type-2')).toBeUndefined();
    });
  });
});
