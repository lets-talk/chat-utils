import { niceCircles } from '../index';

describe('utils/hoc', () => {
  it('Should return empty circle', () => {
    const circles = niceCircles(0).map((point) => point.map((x) => parseFloat(x.toFixed(2))));
    expect(circles).toEqual([]);
  });

  it('Should return a centered circle', () => {
    const circles = niceCircles(1).map((point) => point.map((x) => parseFloat(x.toFixed(2))));
    expect(circles).toEqual([[0.00, 0.00]]);
  });

  it('Should return 2 circles in the same row', () => {
    const circles = niceCircles(2).map((point) => point.map((x) => parseFloat(x.toFixed(2))));
    expect(circles).toEqual([[1.0, 0.0], [-1.0, 0.0]]);
  });

  it('Should return 3 circles in the 2 rows', () => {
    const circles = niceCircles(3).map((point) => point.map((x) => parseFloat(x.toFixed(2))));
    expect(circles).toEqual([[0.00, -1.00], [0.87, 0.50], [-0.87, 0.5]]);
  });

  it('Should return 4 circles in the 2 rows', () => {
    const circles = niceCircles(4).map((point) => point.map((x) => parseFloat(x.toFixed(2))));
    expect(circles).toEqual([[0.71, -0.71], [0.71, 0.71], [-0.71, 0.71], [-0.71, -0.71]]);
  });
});
