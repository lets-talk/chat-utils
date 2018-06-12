import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { textColor } from '../../utils/style';

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 5px 0px;
    padding: 6px 9px 8px 9px;
    float: left;
    max-width: 70%;
    align-items: center;
    justify-content: center;

    div {
      text-align: center;
      line-height: 1;
      display: inline-block;

      color: ${(props) => textColor(props.theme, 'light', 'disabled')};
      font-size: ${(props) => props.theme.typography.classes.caption.fontSize};
      line-height: ${(props) => props.theme.typography.classes.caption.lineHeight};
      font-weight: ${(props) => props.theme.typography.weights.fontWeightMedium};

      span {
        display: inline-block;
        position: relative;
      }

      span:before,
      span:after {
        content: "";
        position: absolute;
        height: 10px;
        border-bottom: 1px solid ${(props) => textColor(props.theme, 'light', 'disabled')};
        top: 0;
        width: 100%;
      }
      span:before {
        right: 100%;
        margin-right: 15px;
      }
      span:after {
        left: 100%;
        margin-left: 15px;
      }
    }
  }
`;

const SystemMessage = (props) => {
  const { message } = props;
  return (
    <StyledContainer className={props.className}>
      <div>
        <div>
          <span>{message.text}</span>
        </div>
      </div>
    </StyledContainer>
  );
};

SystemMessage.propTypes = {
  className: PropTypes.string,
  message: PropTypes.shape({
    text: PropTypes.string,
  }),
};

SystemMessage.displayName = 'SystemMessage';

export default SystemMessage;
