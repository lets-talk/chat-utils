import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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

  li {
    list-style: none;
    padding: 15px;
    color: ${(props) => textColor(props.theme, 'light', 'secondary')};

    &:hover {
      color: ${(props) => themeColor(props.theme, 'accent', 'base')};
      background-color: ${(props) => rgba(themeColor(props.theme, 'accent', 'base'), 0.1)};
    }
  }
`;

const StyledListItem = styled.div``;

const StyledListDivider = styled.hr`
  margin: 0;
  margin-top: -1px;
  margin-left: 0;
  height: 1px;
  border: none;
  background-color: #e0e0e0;
`;

const ItemsMenu = (props) => {
  const {
    items, onItemClick, render, withDivider,
  } = props;

  return (
    <StyledItemsList>
      {items.map((item, index) =>
        (
          <StyledListItem
            role="button"
            tabIndex={index}
            onClick={onItemClick && ((e) => onItemClick(item, index, e))}
            onKeyUp={onItemClick && ((e) => onItemClick(item, index, e))}
          >
            <li
              key={item.id}
            >
              {render(item)}
            </li>
            {withDivider && <StyledListDivider />}
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

export default ItemsMenu;
