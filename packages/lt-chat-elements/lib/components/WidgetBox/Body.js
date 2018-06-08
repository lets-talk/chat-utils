import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const StyledBodyContainer = styled.div`
  flex: 1 1 auto; /* same as flex: 1 1 auto; */
  position: relative; /* need this to position inner content */
  overflow-y: auto;
`;
StyledBodyContainer.displayName = 'StyledBodyContainer';


const Body = (props) => {
  const {
    children,
  } = props;
  return (
    <StyledBodyContainer>{children}</StyledBodyContainer>
  );
};

Body.propTypes = {
  children: PropTypes.node,
};

Body.defaultProps = {
};

export default Body;
