// test-utils/index.js

import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';
import { ThemeProvider } from 'styled-components';

const defaultTheme = {
  palette: {
    common: {
      black: 'rgb(0, 0, 0)',
      white: 'rgb(255, 255, 255)',
      online: 'rgb(67, 160, 71)',
      offline: 'rgb(229, 57, 53)',
      sleeping: 'rgb(253, 216, 53)',
    },
    colors: {
      primary: {
        base: 'rgb(4, 38, 73)',
        light: 'rgb(86, 165, 246)',
        dark: 'rgb(0, 0, 0)',
      },
      accent: {
        base: 'rgb(255, 87, 50)',
        light: 'rgb(255, 171, 152)',
        dark: 'rgb(203, 37, 0)',
      },
      foreground: {
        base: 'rgb(94, 124, 139)',
        light: 'rgb(151, 173, 184)',
        dark: 'rgb(53, 70, 78)',
      },
      background: {
        base: 'rgb(255, 255, 255)',
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(204, 204, 204)',
      },
    },
    contrastColors: {
      dark: {
        primary: 'rgb(255, 255, 255)',
        secondary: 'rgba(255, 255, 255, 0.7)',
        disabled: 'rgba(255, 255, 255, 0.5)',
        hint: 'rgba(255, 255, 255, 0.12)',
      },
      light: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.54)',
        disabled: 'rgba(0, 0, 0, 0.38)',
        hint: 'rgba(0, 0, 0, 0.12)',
      },
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    divider: 'rgba(255, 255, 255, 0.1)',
    action: {
      active: 'rgba(255, 255, 255, 0.9)',
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(255, 255, 255, 0.14)',
      disabled: 'rgba(255, 255, 255, 0.26)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
    },
  },
  shadows: {
    '2p': '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
    '3p': '0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 1px 8px 0 rgba(0, 0, 0, 0.12)',
    '4p': '0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    '6p': '0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.2)',
    '8p': '0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)',
    '16p': '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  },
  typography: {
    fontFamily: "'Nimbus sans-serif', 'Sans', 'Helvetica', 'Arial'",
    fontSize: 'calc(1 * 1px)',
    weights: {
      fontWeightUltraThin: 100,
      fontWeightThin: 300,
      fontWeightNormal: 300,
      fontWeightMedium: 500,
      fontWeightSemibold: 600,
      fontWeightBold: 700,
    },
    classes: {
      body: {
        fontSize: 'calc(16 * 1px)',
        lineHeight: 'calc(16 * 1px)',
      },
      caption: {
        fontSize: 'calc(12 * 1px)',
        lineHeight: 'calc(16 * 1px)',
      },
      footnote: {
        fontSize: 'calc(14 * 1px)',
        lineHeight: 'calc(16 * 1px)',
      },
      small: {
        fontSize: 'calc(10 * 1px)',
        lineHeight: 'calc(16 * 1px)',
      },
      headline: {
        fontSize: 'calc(24 * 1px)',
        lineHeight: 'calc(16 * 1px)',
      },
      subhead: {
        fontSize: 'calc(18 * 1px)',
        lineHeight: 'calc(16 * 1px)',
      },
      title: {
        fontSize: 'calc(20 * 1px)',
        lineHeight: 'calc(16 * 1px)',
      },
      jumbo: {
        fontSize: 'calc(44 * 1px)',
        lineHeight: 'calc(16 * 1px)',
      },
      mega: {
        fontSize: 'calc(56 * 1px)',
        lineHeight: 'calc(16 * 1px)',
      },
    },
  },
  components: {
    conversationBox: {
      externalBackgroundColor: 'rgba(94, 124, 139, 0.1)',
      internalBackgroundColor: 'rgba(255, 213, 0, 0.2)',
      importantBackgroundColor: 'rgb(255, 246, 244)',
    },
    loader: {
      backgroundColor: 'rgb(252, 88, 48)',
    },
  },
};

const shallowWithTheme = (component) => {
  const context = shallow(<ThemeProvider theme={defaultTheme} />)
    .instance()
    .getChildContext();
  return shallow(component, {
    context,
    childContextTypes: ThemeProvider.childContextTypes,
  });
};

const mountWithTheme = (component) => {
  const context = shallow(<ThemeProvider theme={defaultTheme} />)
    .instance()
    .getChildContext();

  return mount(component, {
    context,
    childContextTypes: ThemeProvider.childContextTypes,
  });
};

const renderWithTheme = (component) => renderer.create(<ThemeProvider theme={defaultTheme}>{component}</ThemeProvider>);

const staticWithTheme = (component) => render(<ThemeProvider theme={defaultTheme}>{component}</ThemeProvider>);

export {
  defaultTheme,
  shallowWithTheme,
  mountWithTheme,
  staticWithTheme,
  renderWithTheme,
};
