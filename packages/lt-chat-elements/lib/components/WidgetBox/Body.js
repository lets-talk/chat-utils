import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledBodyContainer = styled.div`
  display: flex;
  flex: 1 1 auto; /* same as flex: 1 1 auto; */
  position: relative; /* need this to position inner content */
  overflow-y: auto;
`;
StyledBodyContainer.displayName = 'StyledBodyContainer';

const StyledBodyContainerContent = styled.div`
  display: flex;
  flex: 1 1 auto; /* same as flex: 1 1 auto; */
  flex-direction: column;
`;
StyledBodyContainerContent.displayName = 'StyledBodyContainerContent';


const WidgetBoxBody = (props) => {
  const {
    children, className,
  } = props;
  return (
    <StyledBodyContainer className={className}>
      <StyledBodyContainerContent>
        {children}
      </StyledBodyContainerContent>
    </StyledBodyContainer>
  );
};

WidgetBoxBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

WidgetBoxBody.defaultProps = {
  className: 'WidgetBoxBody-Container',
};

WidgetBoxBody.displayName = 'WidgetBoxBody';

export default WidgetBoxBody;
