import styled from 'styled-components';
import { rgba } from 'polished';

import { textColor, themeColor } from '../../utils/style';

const StyledTimeMarkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    position: relative;
    background-color: ${(props) => rgba(themeColor(props.theme, 'foreground', 'base'), 0.1)};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    margin: 5px 0px;
    padding: 6px 9px 8px 9px;
    float: left;
    max-width: 70%;
    align-items: center;
    justify-content: center;
  }

  div > span {
    text-align: center;
    display: inline-block;
    color: ${(props) => textColor(props.theme, 'light', 'secondary')};
    font-size: $font-size-caption;
    font-weight: $font-weight-semi-bold;
  }
`;

export default StyledTimeMarkContainer;
