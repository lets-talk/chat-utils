const getCircles = (n, offset = 0) => {
  switch (n) {
    case 0:
      return [];
    case 1:
      return [[0, 0]];
    default:
      return [...Array(n).keys()].map((i) => {
        const fraccion = (parseFloat(i) / parseFloat(n));
        const rads = (fraccion * 2 * Math.PI) + offset;
        const x = Math.cos(rads);
        const y = Math.sin(rads);
        return [x, y];
      });
  }
};

const niceCircles = (n) => {
  switch (n) {
    case 3:
      return getCircles(n, -Math.PI / 2);
    case 4:
      return getCircles(n, -Math.PI / 4);
    default:
      return getCircles(n);
  }
};

export { niceCircles };
