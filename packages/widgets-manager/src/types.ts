export type PayloadType = 'html' | 'json';

export type App = {
  name: string;
  payload_type: PayloadType;
  payload: string;
  settings: {
    [key:string]: string
  };
  organization_id: Number;
}