import { selectMountedApps } from '../mounted_apps';

describe('selectMountedApps', () => {
  it('Get the mounted_apps list', () => {
    const mockMountedApps = {
      1: true,
      2: false,
      3: true,
    }

    const mockState = {
      mounted_apps: mockMountedApps,
    }

    const portion = selectMountedApps(mockState);

    expect(portion).toEqual(mockMountedApps);
  });
});
