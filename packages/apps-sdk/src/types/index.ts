export interface ObjectIndex<T> {
  [key:string]: T;
}

export type EventData = {
  data: {
    method: string;
    args: any[];
  }
}