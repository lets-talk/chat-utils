/* eslint no-underscore-dangle: 0 */
import { window } from 'global';
import postRobot from 'post-robot';
import { createIframe } from '../../tests/helpers';
import createPostRobotChannel from '../postrobot';
import { postrobotChannelConfig } from '../../types';

/* Mock post-robot as we do not want to test it just that it is called */
jest.mock('post-robot', () => ({
  ...require.requireActual('post-robot'),
  send: jest.fn(() => new Promise((resolve) => resolve({ data: {} }))),
  on: jest.fn(),
  once: jest.fn(),
}));


describe('Channel-PostRobot', () => {
  let postRobotConfig: postrobotChannelConfig;
  let postRobotChannel: any;

  beforeEach(() => {
    postRobotConfig = {
      iframeId: 'fake-frame-id',
      logLevel: 'info',
      listener: {
        domain: '*',
      },
      sender: {
        domain: '*',
      },
    };
    postRobotChannel = createPostRobotChannel(postRobotConfig);

    createIframe({ iframeId: 'fake-frame-id' });
  });

  describe('method:constructor', () => {
    it('should work if not iframeId provided', () => {
      postRobotChannel = createPostRobotChannel({ logLevel: 'info' });
      expect(postRobotChannel._getWindow()).not.toBe(null);
    });
  });

  describe('method:_getWindow', () => {
    it('should get a window correctly', () => {
      expect(postRobotChannel._getWindow()).not.toBe(null);
    });

    it('should return null if iframe can not be found', () => {
      postRobotChannel = createPostRobotChannel({ iframeId: 'fake-frame-id-not-exists' });
      expect(postRobotChannel._getWindow()).toBe(null);
    });

    it('should return parent.window if no config.iframeId is provided', () => {
      postRobotChannel = createPostRobotChannel({ logLevel: 'info' });
      expect(postRobotChannel._getWindow()).toBe(window.parent);
    });
  });

  describe('method:send with retryStrategy should retry send', () => {
    it('should work if not iframeId provided', async () => {
      const extendedConfig = {
        iframeId: 'iframe-does-not-exists',
        retryStrategy: {
          enabled: true,
        },
      };
      const customConfig = { ...postRobotConfig, ...extendedConfig };
      postRobotChannel = createPostRobotChannel(customConfig);

      const received = [];
      postRobotChannel.on('eventName', (n) => received.push(n));

      const type = 'eventName';
      const data = [1, 2, 3];

      postRobotChannel.send(type, data);

      expect(postRobotChannel.getBuffer().length).toBe(1);
      expect(postRobotChannel.getBuffer()).toContainEqual({
        event: [1, 2, 3], reject: expect.any(Function), resolve: expect.any(Function), type: 'eventName',
      });
    });
  });

  describe('method:getConfig', () => {
    it('should call getConfig with args', () => {
      const config = postRobotChannel.getConfig();

      expect(config).toEqual(postRobotConfig);
    });
  });

  describe('method:setConfig', () => {
    it('should call setConfig with args', () => {
      const config = {
        iframeId: 'iframe-id',
        logLevel: 'error',
      };

      postRobotChannel.setConfig(config);
      const savedConfig = postRobotChannel.getConfig();

      expect(config).toEqual(savedConfig);
    });
  });

  describe('method:send with mock', () => {
    it('should call transport.send', () => {
      postRobotChannel.send = jest.fn();
      const type = 'eventName';
      const data = [1, 2, 3];

      postRobotChannel.send(type, data);
      expect(postRobotChannel.send).toHaveBeenCalled();
      expect(postRobotChannel.send).toHaveBeenCalledWith(type, data);
    });
  });

  describe('method:send test failure case calls the hanldeSendError', () => {
    it('should call _handleSendError when there is an error on the send', async () => {
      const sendErrorObj = new Error('No handler found for eventName');
      postRobot.send.mockImplementation(() => new Promise((resolve, reject) => reject(sendErrorObj)));

      postRobotChannel._handleSendError = jest.fn();
      postRobotChannel.setWindowInitialized(true);

      const type = 'eventName';
      const data = [1, 2, 3];

      await postRobotChannel.send(type, data);
      expect(postRobot.send).toHaveBeenCalled();
      expect(postRobotChannel._handleSendError).toHaveBeenCalledWith(sendErrorObj, type, data);
    });

    it('should call enqueue when there is an error "No handler found for eventName"', async () => {
      const sendErrorObj = new Error('No handler found for eventName');
      postRobot.send.mockImplementation(() => new Promise((resolve, reject) => reject(sendErrorObj)));

      postRobotChannel.enqueue = jest.fn(() => new Promise((resolve) => resolve('Enqueue ok')));
      postRobotChannel.setWindowInitialized(true);

      const type = 'eventName';
      const data = [1, 2, 3];

      await postRobotChannel.send(type, data);
      expect(postRobot.send).toHaveBeenCalled();
      expect(postRobotChannel.enqueue).toHaveBeenCalledWith(type, data);
    });
  });

  describe('method:send without mock', () => {
    it('should call send callback. Success case. Check postRobot send is called correctly', async () => {
      const received = [];
      postRobotChannel.on('eventName', (n: number) => received.push(n));
      postRobotChannel.setWindowInitialized(true);

      const type = 'eventName';
      const data = [1, 2, 3];

      await postRobotChannel.send(type, data);

      expect(postRobot.send).toHaveBeenCalledWith(expect.any(Object), 'eventName', [1, 2, 3], { domain: '*' });
    });
  });

  describe('method:send without mock', () => {
    it('should call send callback. Error case. Check event is saved on the buffer', () => {
      const customConfig = { ...postRobotConfig, ...{ iframeId: 'iframe-does-not-exists' } };
      postRobotChannel = createPostRobotChannel(customConfig);
      const received = [];
      postRobotChannel.on('eventName', (n: number) => received.push(n));

      const type = 'eventName';
      const data = [1, 2, 3];

      postRobotChannel.send(type, data);

      expect(postRobotChannel.getBuffer().length).toBe(1);
      expect(postRobotChannel.getBuffer()[0]).toMatchObject({
        event: [1, 2, 3], reject: expect.any(Function), resolve: expect.any(Function), type: 'eventName',
      });
    });
  });

  describe('method:addListener without mock', () => {
    it('should call postRobot.on. Success case.', async () => {
      await postRobotChannel.addListener('eventName', () => null);
      expect(postRobot.on).toHaveBeenCalledWith('eventName', expect.any(Function), { domain: '*' });
    });
  });

  describe('method:once without mock', () => {
    it('should call postRobot.once. Success case.', async () => {
      await postRobotChannel.once('eventName', () => null);
      expect(postRobot.once).toHaveBeenCalledWith('eventName', expect.any(Function), { domain: '*' });
    });
  });

  describe('method:enqueue method:flush without mock', () => {
    it('should call enqueue. Should see the enqueded events on the buffer.', async () => {
      postRobotChannel.enqueue('eventName1', { ids: [1, 2, 3] });
      postRobotChannel.enqueue('eventName2', { ids: [4, 5, 6] });
      postRobot.send.mockImplementation(() => new Promise((resolve) => resolve({})));

      postRobotChannel.setWindowInitialized(true);
      expect(postRobotChannel.getBuffer().length).toBe(2);
      expect(postRobotChannel.getBuffer()[0]).toMatchObject({
        event: { ids: [1, 2, 3] }, reject: expect.any(Function), resolve: expect.any(Function), type: 'eventName1',
      });
      expect(postRobotChannel.getBuffer()[1]).toMatchObject({
        event: { ids: [4, 5, 6] }, reject: expect.any(Function), resolve: expect.any(Function), type: 'eventName2',
      });

      postRobotChannel.flush();
      expect(postRobot.send).toHaveBeenCalled();
      expect(postRobotChannel.getBuffer().length).toBe(0);
    });
  });
});
