import React from 'react';
import PropTypes from 'prop-types';
// Storybook stuff
import { ThemeProvider } from 'styled-components';
import { LightTheme, DarkTheme, DefaultTheme } from '../../../theme';

const themes = {
  default: DefaultTheme,
  light: LightTheme,
  dark: DarkTheme,
};

const WrapWithTheme = (props) => {
  const { themeName } = props;
  const theme = themes[themeName];
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
