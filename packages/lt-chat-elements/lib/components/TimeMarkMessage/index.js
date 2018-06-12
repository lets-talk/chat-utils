import React from 'react';
import PropTypes from 'prop-types';
import StyledTimeMarkContainer from './styles';

const TimeMarkMessage = (props) => {
  const { message } = props;
  return (
    <StyledTimeMarkContainer className={props.className}>
      <div>
        <span>
          {message.text}
        </span>
      </div>
    </StyledTimeMarkContainer>
  );
};

TimeMarkMessage.propTypes = {
  className: PropTypes.string,
  message: PropTypes.shape({
    text: PropTypes.string,
  }),
};

TimeMarkMessage.defaultProps = {
  message: { text: '' },
  className: 'LT-TimeMarkMessage-Container',
};

TimeMarkMessage.displayName = 'TimeMarkMessage';

export default TimeMarkMessage;
