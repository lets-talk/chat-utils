const serialize = (data: any) => {
  return btoa(JSON.stringify(data));
}

const deserialize = (data: any) => {
  return JSON.parse(atob(data));
}

export {
  serialize,
  deserialize,
};