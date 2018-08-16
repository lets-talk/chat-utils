export type PayloadType = 'html' | 'json';

export type ObjectIndex = {
  [key:string]: string;
}

export type App = {
  name: string;
  payload_type: PayloadType;
  payload: string;
  settings: ObjectIndex;
  organization_id: Number;
}