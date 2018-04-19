import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ActionList = styled.ul`
  display: block;
  cursor: pointer;
  padding: 0;
  margin: 0;
  border-radius: 5px;
  background-color: ${(props) => props.theme.palette.common.white};
  font-size: ${(props) => props.theme.typography.classes.caption.bold.accent.fontSize};
  font-weight: ${(props) => props.theme.typography.classes.caption.bold.accent.fontWeight};
`;

const ActionItem = styled.li`
  list-style: none;
  padding: 15px;
  color: ${(props) => props.theme.palette.action.active};

  &:hover {
    background-color: ${(props) => props.theme.palette.action.hover};
  }
  &:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  &:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.palette.divider};
  }
`;

const ActionableMessageBox = (props) => {
  const { data, onClickAction } = props;
  const { actions } = data;

  return (
    <ActionList className={props.className}>
      {actions.map((action, index) =>
        (
          <ActionItem
            key={action.id}
            role="button"
            onClick={onClickAction && ((e) => onClickAction(action, index, e))}
          >
            <span>{action.name}</span>
          </ActionItem>
        ))}
    </ActionList>
  );
};

ActionableMessageBox.defaultProps = {
  onClickAction: null,
  className: 'LT-ActionableMessageBox-Container',
};

ActionableMessageBox.propTypes = {
  /**
   * Array of element to display as Action items [{ id: '1', name: 'MyAction'}]
   */
  data: PropTypes.object.isRequired,
  /**
   * Extra className to style the component
   */
  className: PropTypes.string,
  /**
   * Callback function called when user clicks on an action Item
   * The callback has the following signature:
   * callback (action, index, e)
   */
  onClickAction: PropTypes.func,
};

export default ActionableMessageBox;
