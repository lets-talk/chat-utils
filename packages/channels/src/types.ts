export type ObjectIndex<T> = {
  [key:string]: T;
}

export type channelConfig = {
  transport: Transport;
}

export type postrobotChannelConfig = {
  [key:string]: any;
}

export type websocketChannelConfig = {
  [key:string]: any;
}

export type WebsocketConfig = {
  url: string;
}

export type Event = {
  type: string;
  data: ObjectIndex<any>;
}

export type EventHandler = (data?: ObjectIndex<any>) => void;

export interface Transport {
  setHandler(handler: EventHandler): void;
  send(action: string, data: Event): Promise<any>;
}
