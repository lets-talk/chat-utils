import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import WidgetBoxHeader from './Header';
import WidgetBoxFooter from './Footer';
import WidgetBoxBody from './Body';

const StyledWidgetBoxContainer = styled.div`
  border-radius: 10px 10px 0px 0px;
  box-shadow: 0px 0px 8px 1px rgba(0,0,0,0.44);
  
  margin: 0;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
          
  background: rgba(255, 255, 255, .1);
`;

const WidgetBox = (props) => {
  const {
    className,
    children,
  } = props;
  return (
    <StyledWidgetBoxContainer className={className}>{children}</StyledWidgetBoxContainer>
  );
};

WidgetBox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

WidgetBox.defaultProps = {
  className: 'LT-WidgetBox-Container',
};

WidgetBox.Header = WidgetBoxHeader;
WidgetBox.Footer = WidgetBoxFooter;
WidgetBox.Body = WidgetBoxBody;

export default WidgetBox;
