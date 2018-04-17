import React from 'react';
import PropTypes from 'prop-types';
// Storybook stuff
import { ThemeProvider } from 'styled-components';

import '../common/styles/themes/globalStyle';

// Extract our Sass variables into a JS object
// const themes = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../common/styles/_variables.scss');
const variables = require('sass-extract-loader?{"plugins": ["sass-extract-js"]}!../common/styles/_themes.scss');

const WrapWithTheme = (props) => {
  const { themeName } = props;
  const theme = variables.themes[themeName];
  console.log('Theme:', theme);
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

export { WrapWithTheme };
