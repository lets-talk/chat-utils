import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

const StyledFlexHeader = styled.div`
  flex: 0 0 auto;
  flex-basis: 50px;
`;

const StyledFlexItemGrow = styled.div`
  flex: 1 1 auto; /* same as flex: 1 1 auto; */
  position: relative; /* need this to position inner content */
  overflow-y: auto;
`;

const StyledFlexFooter = styled.div`
  flex: 0 0 auto;
  flex-basis: 50px;
`;

const WidgetBox = (props) => {
  const {
    children,
    className,
  } = props;
  return (
    <StyledWidgetBoxContainer className={className}>
      {props.header &&
        <StyledFlexHeader>
          {props.header(props)}
        </StyledFlexHeader>
      }
      <StyledFlexItemGrow>
        {children}
      </StyledFlexItemGrow>
      {props.footer &&
        <StyledFlexFooter>
          {props.footer(props)}
        </StyledFlexFooter>
      }
    </StyledWidgetBoxContainer>
  );
};

WidgetBox.propTypes = {
  children: PropTypes.node,
  footer: PropTypes.func,
  header: PropTypes.func,
  className: PropTypes.string,
};

WidgetBox.defaultProps = {
  footer: null,
  header: null,
  className: 'LT-WidgetBox-Container',
};

export default WidgetBox;
