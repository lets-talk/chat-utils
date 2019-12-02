import { selectApps } from '../apps';

describe('selectApps', () => {
  it('Get the apps list', () => {
    const mockApps = [
      { id: 1, name: 'app1' },
      { id: 2, name: 'app2' },
      { id: 3, name: 'app3' },
    ];

    const mockState = {
      apps: mockApps,
    }

    const portion = selectApps(mockState);

    expect(portion).toEqual(mockApps);
  });
});

