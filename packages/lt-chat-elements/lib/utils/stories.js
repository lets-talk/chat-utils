import React from 'react';
import PropTypes from 'prop-types';
// Storybook stuff
import { ThemeProvider } from 'styled-components';

import '../common/styles/themes/globalStyle';

// Extract our Sass variables into a JS object
/* eslint-disable import/no-unresolved */
const variables = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../common/styles/_themes.scss');

const WrapWithTheme = (props) => {
  const { themeName } = props;
  const theme = variables.themes[themeName];
  // Wrapp it and pass all the other props that we might be given
  return (
    <div className={`theme-${themeName}`}>
      <ThemeProvider theme={theme}>
        {props.children}
      </ThemeProvider>
    </div>
  );
};

WrapWithTheme.propTypes = {
  children: PropTypes.node,
  themeName: PropTypes.string,
};

const themeOptions = {
  default: 'DefaultTheme', light: 'LightTheme', dark: 'DarkTheme', lightest: 'LightestTheme', darkest: 'DarkestTheme',
};
const defaultTheme = 'default';

export {
  defaultTheme,
  themeOptions,
  WrapWithTheme,
};
