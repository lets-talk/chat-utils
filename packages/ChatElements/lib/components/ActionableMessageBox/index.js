import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FaCloudDownload from 'react-icons/lib/fa/cloud-download';

import './index.scss';

const ActionableMessageBox = (props) => {
  const { data, onClickAction } = props;
  const { actions } = data;

  return (
    <ul className={classNames('letstalk-actionable-mbox')}>
      {actions.map((action, index) =>
        (
          <li
            key={action.id}
            className="letstalk-actionable-item"
            role="button"
            onClick={onClickAction && ((e) => onClickAction(action, index, e))}
          >
            {action.name}
          </li>
        ))}
    </ul>
  );
};

ActionableMessageBox.defaultProps = {
  data: {},
  onClickAction: null,
};

ActionableMessageBox.propTypes = {
  data: PropTypes.object,
  onClickAction: PropTypes.func,
};

export default ActionableMessageBox;
