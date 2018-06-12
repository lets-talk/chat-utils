import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withAutoScroll } from '../../utils/hoc';

const StyledScrollableListContainer = styled.div`
  max-height: 100vh;
  background-color: ${(props) => props.theme.palette.common.white};
  overflow-y: auto;
  padding: 10px;
`;

const ScrollableList = (props) => {
  const {
    cmpRef, className,
  } = props;
  return (
    <StyledScrollableListContainer
      innerRef={cmpRef}
      className={className}
      id="messages"
    >
      { props.children }
    </StyledScrollableListContainer>
  );
};

ScrollableList.displayName = 'ScrollableList';

ScrollableList.propTypes = {
  children: PropTypes.array,
  cmpRef: PropTypes.func,
  className: PropTypes.string,
};

ScrollableList.defaultProps = {
  cmpRef: null,
  className: 'LT-ScrollableList-Container',
};

const autoScrollOptions = { threshold: 300, direction: 'bottom' };
export default withAutoScroll(autoScrollOptions)(ScrollableList);
