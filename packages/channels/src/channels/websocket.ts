import WebsocketTransport from '../transports/websocket';
import Channel from './channel';
import { websocketChannelConfig } from '../types';

export default function createChannel(config: websocketChannelConfig) {
  const { url } = config;
  const transport = new WebsocketTransport({ url });
  return new Channel({ transport });
}
