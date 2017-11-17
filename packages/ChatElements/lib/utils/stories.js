import React from 'react';
import PropTypes from 'prop-types';
// Storybook stuff
import { ThemeProvider } from 'styled-components';
import { LightTheme, DarkTheme } from '../../../theme';

const themes = {
  light: LightTheme,
  dark: DarkTheme,
};

const wrapWithThemes = (ComponentToWrap) => {
  // information that we don’t want everything to access

  // return a newly generated React component
  // using a functional, stateless component

  const Wrapee = (props) => {
    const { themeName } = props;
    const theme = themes[themeName];
    // Wrapp it and pass all the other props that we might be given
    return (
      <div className={`theme-${themeName}`}>
        <ThemeProvider theme={theme}>
          <ComponentToWrap {...props} />
        </ThemeProvider>
      </div>
    );
  };

  Wrapee.propTypes = {
    themeName: PropTypes.string,
  };

  return Wrapee;
};


export {
  wrapWithThemes,
};
