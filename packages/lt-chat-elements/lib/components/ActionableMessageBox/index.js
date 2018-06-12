import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';
import { themeColor } from '../../utils/style';

const StyledActionList = styled.ul`
  display: block;
  cursor: pointer;
  padding: 0;
  margin: 0;
  border-radius: 5px;
  background-color: ${(props) => props.theme.palette.common.white};
  font-size: ${(props) => props.theme.typography.classes.caption.fontSize};
  line-height: ${(props) => props.theme.typography.classes.caption.lineHeight};
  font-weight: ${(props) => props.theme.typography.weights.fontWeightMedium};

  li {
    list-style: none;
    padding: 15px;
    color: ${(props) => themeColor(props.theme, 'accent', 'base')};

    &:hover {
      background-color: ${(props) => rgba(themeColor(props.theme, 'accent', 'base'), 0.1)};
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
  }
`;

const ActionableMessageBox = (props) => {
  const { data, onClickAction } = props;
  const { actions } = data;

  return (
    <StyledActionList className={props.className}>
      {actions.map((action, index) =>
        (
          <li
            key={action.id}
          >
            <span
              role="button"
              tabIndex={index}
              onClick={onClickAction && ((e) => onClickAction(action, index, e))}
              onKeyUp={onClickAction && ((e) => onClickAction(action, index, e))}
            >
              {action.name}
            </span>
          </li>
        ))}
    </StyledActionList>
  );
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


ActionableMessageBox.defaultProps = {
  onClickAction: null,
  className: 'LT-ActionableMessageBox-Container',
};

ActionableMessageBox.displayName = 'ActionableMessageBox';

export default ActionableMessageBox;
