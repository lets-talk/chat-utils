import { selectApps } from '../apps';

describe('selectApps', () => {
  it('Get the apps list', () => {
    const expectedApps = [
      { id: 1, name: 'app1', slug: 'app-1', initialData: { metadata: { vip: true }} },
      { id: 2, name: 'app2', slug: 'app-2', initialData: {} },
      { id: 3, name: 'app3', slug: 'app-3',  initialData: {} },
    ];

    const mockState = {
      initial_data: {
        'app-1': { metadata: { vip: true }},
      },
      apps: [
        { id: 1, name: 'app1', slug: 'app-1' },
        { id: 2, name: 'app2', slug: 'app-2' },
        { id: 3, name: 'app3', slug: 'app-3'  },
      ],
    };

    const portion = selectApps(mockState);

    expect(portion).toMatchObject(expectedApps);
  });
});

