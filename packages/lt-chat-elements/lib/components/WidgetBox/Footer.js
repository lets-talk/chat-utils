import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Footer = (props) => {
  const {
    children,
    height,
    className,
  } = props;

  const StyledFlexFooter = styled.div`
    flex: 0 0 auto;
    flex-basis: ${() => `${height}px`};
  `;
  StyledFlexFooter.displayName = 'StyledFlexFooter';

  return (
    <StyledFlexFooter className={className}>
      {children}
    </StyledFlexFooter>
  );
};

Footer.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.number,
  className: PropTypes.string,
};

Footer.defaultProps = {
  height: 50,
  className: 'WidgetBoxFooter-Container',
};

Footer.displayName = 'WidgetBoxFooter';

export default Footer;
