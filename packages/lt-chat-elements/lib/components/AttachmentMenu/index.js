import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';

import { Flex, Box } from 'grid-styled';

import MdImage from 'react-icons/lib/md/image';
import MdVideo from 'react-icons/lib/md/video-library';
import MdAudioTrack from 'react-icons/lib/md/audiotrack';
import MdLockOpen from 'react-icons/lib/md/lock-open';
import MdAttachFile from 'react-icons/lib/md/attach-file';

import { textColor, themeColor } from '../../utils/style';

const StyledMenuList = styled.ul`
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

const renderIcon = (type, size) => {
  switch (type) {
    case 'image':
      return <MdImage size={size} />;
    case 'video':
      return <MdVideo size={size} />;
    case 'audio':
      return <MdAudioTrack size={size} />;
    case 'document':
      return <MdImage size={size} />;
    case 'link':
      return <MdLockOpen size={size} />;
    default:
      return <MdAttachFile size={size} />;
  }
};

const AttachmentMenu = (props) => {
  const { data, onItemClick, iconSize } = props;
  const { items } = data;

  return (
    <StyledMenuList className={props.className}>
      {items.map((item, index) =>
        (
          <li
            key={item.id}
          >
            <div
              role="button"
              tabIndex={index}
              onClick={onItemClick && ((e) => onItemClick(item, index, e))}
              onKeyUp={onItemClick && ((e) => onItemClick(item, index, e))}
            >
              <Flex flex="1 1 auto" alignItems="center">
                <Box p={2}>
                  {renderIcon(item.type, iconSize)}
                </Box>
                <Box p={2} ml="auto" width={1}>
                  <span>{item.name}</span>
                </Box>
              </Flex>
            </div>
          </li>
        ))}
    </StyledMenuList>
  );
};

AttachmentMenu.defaultProps = {
  onItemClick: null,
  className: 'LT-AttachmentMenu-Container',
};

AttachmentMenu.propTypes = {
  /**
   * Array of element to display as Action items [{ id: '1', name: 'MyAction'}]
   */
  data: PropTypes.object.isRequired,
  /**
   * Extra className to style the component
   */
  className: PropTypes.string,
  /**
   * Size for the icons
   */
  iconSize: PropTypes.number,
  /**
   * Callback function called when user clicks on an action Item
   * The callback has the following signature:
   * callback (action, index, e)
   */
  onItemClick: PropTypes.func,
};

AttachmentMenu.defaultProps = {
  className: 'LT-AttachmentMenu-Wrapper',
  iconSize: 20,
};

AttachmentMenu.displayName = 'AttachmentMenu';

export default AttachmentMenu;
