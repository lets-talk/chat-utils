import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { textColor, themeColor } from '../../utils/style';

const StyledTag = styled.span`
  color: ${(props) => textColor(props.theme, 'dark', 'primary')};
  background-color: ${(props) => themeColor(props.theme, 'foreground', 'base')};
  font-size: ${(props) => props.theme.typography.classes.caption.fontSize};
  line-height: ${(props) => props.theme.typography.classes.caption.lineHeight};
  font-weight: ${(props) => props.theme.typography.weights.fontWeightMedium};

  margin: 5px 2px;
  padding: 5px;
  border-radius: 2px;
`;
StyledTag.displayName = 'StyledTag';

const Tag = (props) => {
  const { data } = props;
  return (
    <StyledTag>
      {data.name}
    </StyledTag>
  );
};

Tag.propTypes = {
  /**
   * data is an object containing the Tag data
   */
  data: PropTypes.object,
  /**
   * className to be used for this component
   */
  /* eslint-disable react/no-unused-prop-types */
  className: PropTypes.string,
};

Tag.defaultProps = {
  data: {},
  className: 'LT-Tag-Container',
};

export default Tag;
