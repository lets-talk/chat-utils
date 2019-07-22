const decoder = (value: string) => {
  if (/^(\d+|\d*\.\d+)$/.test(value)) {
    return parseFloat(value);
  }

  const keywords: any = {
    true: true,
    false: false,
    null: null,
    // eslint-disable-next-line object-shorthand
    undefined: undefined
  };
  if (value in keywords) {
    return keywords[value];
  }

  return value;
};

export {
  decoder,
}