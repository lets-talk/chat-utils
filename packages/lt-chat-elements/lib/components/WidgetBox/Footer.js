import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Footer = (props) => {
  const {
    children,
  } = props;

  const StyledFlexFooter = styled.div`
    flex: 0 0 auto;
    flex-basis: ${() => `${props.height}px`};
  `;
  StyledFlexFooter.displayName = 'StyledFlexFooter';

  return (
    <StyledFlexFooter>
      {children}
    </StyledFlexFooter>
  );
};

Footer.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.number,
};

Footer.defaultProps = {
  height: 50,
};


export default Footer;
