interface Token {
  attrGet: (attr: string) => any,
  attrSet: (attr: string, value: string) => void,
  attrIndex: (attr: string) => number,
  attrPush: (attrs: string[]) => void,

  attrs: string[],
  content: string,
  type: string,
}

interface ObjectIndex<T> {
  [key:number]: T
}
