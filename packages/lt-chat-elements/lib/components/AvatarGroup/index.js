import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Flex } from 'grid-styled';

import Avatar from '../Avatar';
import { PersonType } from '../../utils/types';
import { avatarGroupItem } from '../../utils/style';


const StyledTeamContainer = styled.div`
  width: 35px;
  height: 35px;
  position: relative;
  float: left;
`;

const AvatarGroup = (props) => {
  const {
    avatars, size, type, withStatus, groupType, xDistance, yDistance,
  } = props;

  const StyledAvatarGroupContainer = styled(Flex)`
    position: relative;
    left: 0;
    margin-right: ${() => groupType === 'line' ? avatars.length * 10 : 0}px;
  `;

  return (
    <StyledAvatarGroupContainer className={props.className}>
      <StyledTeamContainer>
        {avatars.map((person, index) => {
          const StyledAvatarContainer = styled.div`
              position: absolute;
              ${() => avatarGroupItem(index, avatars.length, groupType, xDistance, yDistance)}
              width: 100%;
              height: 100%;
          `;
          return (
            <StyledAvatarContainer key={person.id}>
              <Avatar
                size={size}
                src={person.avatar}
                status={person.status}
                withStatus={withStatus}
                type={type}
              />
            </StyledAvatarContainer>
          );
        })
        }
      </StyledTeamContainer>
    </StyledAvatarGroupContainer>
  );
};

AvatarGroup.defaultProps = {
  avatars: [],
  size: 'xsmall',
  xDistance: 12,
  yDistance: 12,
  type: 'circle',
  groupType: 'circle',
  withStatus: false,
  className: 'LT-AvatarGroup-Container',
};

AvatarGroup.propTypes = {
  /**
   * avatars: List of PersonType to show as avatars
   */
  avatars: PropTypes.arrayOf(PersonType),
  /**
   * How each avatar is showed. Valid types: default, circle, rounded(border radius 5px), flexible
   */
  type: PropTypes.oneOf(['default', 'circle', 'rounded', 'flexible']),
  /**
   * How avatars images are showed. Valid types: line, circle
   */
  groupType: PropTypes.oneOf(['line', 'circle']),
  /**
   * image size. default (25px), xsmall(30px), small(35px), medium(40px), large(45px), xlarge (55px)
   */
  size: PropTypes.string,
  /**
   * image xDistance. Distance on the x-axis between avatars
   */
  xDistance: PropTypes.number,
  /**
   * image yDistance. Distance on the y-axis between avatars
   */
  yDistance: PropTypes.number,
  /**
   * withStatus choose wheter or not show an status indicator.
   */
  withStatus: PropTypes.bool,
  /**
   * Extra className to style the component
   */
  className: PropTypes.string,
};

export default AvatarGroup;
