import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { headerMenuButton, themeColor, textColor } from '../../utils/style';

const StyledHeaderContainer = styled.div`
  flex: 0 0 auto;
  flex-basis: ${(props) => `${props.height}px`};

  background-color: ${(props) => themeColor(props.theme, 'accent', 'base')};
  color: ${(props) => textColor(props.theme, 'dark', 'primary')};
  border-radius: 10px 10px 0 0;
  text-align: center;
  padding: 15px 20px;

  button {
    color: ${(props) => textColor(props.theme, 'dark', 'primary')};
    ${headerMenuButton('40px')};
  }

  h4 {
    margin: 0;
    font-size: ${(props) => props.theme.typography.classes.body.fontSize};
    line-height: ${(props) => props.theme.typography.classes.body.lineHeight};
    font-weight: ${(props) => props.theme.typography.weights.fontWeightMedium};
  }

  span {
    color: ${(props) => textColor(props.theme, 'dark', 'secondary')};
    font-size: ${(props) => props.theme.typography.classes.caption.fontSize};
    line-height: ${(props) => props.theme.typography.classes.caption.lineHeight};
    font-weight: ${(props) => props.theme.typography.weights.fontWeightThin};
  }
`;
StyledHeaderContainer.displayName = 'StyledHeaderContainer';

const Header = (props) => {
  const { children, className, height } = props;
  return (
    <StyledHeaderContainer className={className} height={height}>
      {children}
    </StyledHeaderContainer>
  );
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  height: PropTypes.number,
};

Header.defaultProps = {
  className: 'LT-Header-Container',
  height: 50,
};

Header.displayName = 'Header';

export default Header;
