import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { rgba } from 'polished';

import { textColor, themeColor } from '../../utils/style';

const StyledItemsList = styled.ul`
  display: block;
  cursor: pointer;
  padding: 0;
  margin: 0;
  border-radius: 5px;
  background-color: ${(props) => props.theme.palette.common.white};
  font-size: ${(props) => props.theme.typography.classes.caption.fontSize};
  line-height: ${(props) => props.theme.typography.classes.caption.lineHeight};
  font-weight: ${(props) => props.theme.typography.weights.fontWeightMedium};
  box-shadow: ${(props) => props.theme.shadows['4p']};
`;

const StyledListItem = styled.li`
  list-style: none;
  padding: 15px;
  color: ${(props) => textColor(props.theme, 'light', 'secondary')};

  &:hover {
    color: ${(props) => themeColor(props.theme, 'accent', 'base')};
    background-color: ${(props) => rgba(themeColor(props.theme, 'accent', 'base'), 0.1)};
  }

  ${(props) =>
    props.withDivider &&
      css`
        &:not(:first-child) {
          border-top: 1px solid #e0e0e0;
        }
      `};
`;
StyledListItem.displayName = 'StyledListItem';

const ItemsMenu = (props) => {
  const {
    items, onItemClick, render, withDivider,
  } = props;

  return (
    <StyledItemsList>
      {items.map((item, index) =>
        (
          <StyledListItem
            key={item.id}
            role="button"
            tabIndex={index}
            withDivider={withDivider}
            onClick={onItemClick && ((e) => onItemClick(item, index, e))}
            onKeyUp={onItemClick && ((e) => onItemClick(item, index, e))}
          >
            {render(item)}
          </StyledListItem>
        ))}
    </StyledItemsList>
  );
};

ItemsMenu.defaultProps = {
  onItemClick: null,
  className: 'LT-ItemsMenu-Container',
};

ItemsMenu.propTypes = {
  /**
   * Render prop is called passing each item
   */
  render: PropTypes.func.isRequired,
  /**
   * Array of elements to display
   */
  items: PropTypes.array.isRequired,
  /**
   * Whether to show or not an horizontal line dividing each item
   */
  withDivider: PropTypes.bool,
  /**
   * Extra className to style the component
   */
  /* eslint-disable react/no-unused-prop-types */
  className: PropTypes.string,
  /**
   * Callback function called when user clicks on an action Item
   * The callback has the following signature:
   * callback (action, index, e)
   */
  onItemClick: PropTypes.func,
};

ItemsMenu.defaultProps = {
  className: 'LT-ItemsMenu-Wrapper',
  withDivider: true,
};

ItemsMenu.displayName = 'ItemsMenu';

export default ItemsMenu;
