import { GridManager } from '../grid';
import { AppendAppStrategy } from '../strategies/mounting/append';
const windowObject: Window = window;

test('I can create a GridManager', () => {
  const settings = {
    columns: 3,
    gutter: 10,
    padding: 10,
    positions: [
      'top-left',
      'top-center',
      'top-right',
      'center-left',
      'center-center',
      'center-right',
      'bottom-left',
      'bottom-center',
      'bottom-right',
    ]
  };
  const addStrategy = new AppendAppStrategy();
  const gm = new GridManager(settings, windowObject, addStrategy);
  expect(gm.grid.cells.length).toBe(9);
  expect(gm.grid.cells).toContainEqual(
    {
      id: 'top-left',
      apps: [],
      position: {
        x: 0,
        y: 0,
      },
      size: {
        width: windowObject.innerWidth / 3,
        height: windowObject.innerHeight / 3,
      }
    }
  );

  expect(gm.grid.cells).toContainEqual(
    {
      id: 'top-right',
      apps: [],
      position: {
        x: 2 * (windowObject.innerWidth / 3),
        y: 0,
      },
      size: {
        width: windowObject.innerWidth / 3,
        height: windowObject.innerHeight / 3,
      }
    }
  );

});

test('GridManager _setGridDimensions works on different scenarios', () => {
  const settings = {
    columns: 3,
    gutter: 10,
    padding: 10,
    positions: [
      'top-left',
      'top-center',
      'top-right',
      'center-left',
      'center-center',
      'center-right',
      'bottom-left',
      'bottom-center',
      'bottom-right',
    ]
  };
  const addStrategy = new AppendAppStrategy();
  const gm = new GridManager(settings, windowObject, addStrategy);

  const mobileWidth = 300;
  const mobileHeight = 600;

  gm._setGridDimensions(1, mobileWidth, mobileHeight);

  expect(gm.grid.cells.length).toBe(9);
  expect(gm.grid.cells).toContainEqual(
    {
      id: 'top-left',
      apps: [],
      position: {
        x: 0,
        y: 0,
      },
      size: {
        width: mobileWidth,
        height: mobileHeight / 9,
      }
    }
  );

  expect(gm.grid.cells).toContainEqual(
    {
      id: 'top-center',
      apps: [],
      position: {
        x: 0,
        y: mobileHeight / 9,
      },
      size: {
        width: mobileWidth,
        height: mobileHeight / 9,
      }
    }
  );
});
