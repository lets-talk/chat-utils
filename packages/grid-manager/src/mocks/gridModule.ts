export const gridRulesMock: {
  [key in 'small' | 'medium' | 'large'];
} = {
  small: {
    label: 'mobile',
    columns: 1,
    rows: 3,
    positions: ['top', 'mid', 'bottom']
  },
  medium: {
    label: 'tablet',
    columns: 2,
    rows: 3,
    positions: [
      'top-left',
      'top-right',
      'mid-left',
      'mid-right',
      'bottom-left',
      'bottom-right'
    ]
  },
  large: {
    label: 'web',
    columns: 3,
    rows: 3,
    positions: [
      'top-left',
      'top-center',
      'top-right',
      'mid-left',
      'mid-center',
      'mid-right',
      'bottom-left',
      'bottom-center',
      'bottom-right'
    ]
  }
};