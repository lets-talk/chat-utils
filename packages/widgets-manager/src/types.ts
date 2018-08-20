export type PayloadType = 'html' | 'json';

export type ObjectIndex = {
  [key:string]: string;
}

export type Settings = {
  css: string;
  inlineCss: ObjectIndex;
}

export type App = {
  name: string;
  payload_type: PayloadType;
  payload: string;
  settings: Settings;
  organization_id: Number;
}