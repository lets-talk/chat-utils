// style.js
import { keyframes } from 'styled-components';
import { niceCircles } from './';

export function truncate(width) {
  return `
    width: ${width};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
}

export function ellipsis(width) {
  return `
    display: inline-block;
    max-width: ${width};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `;
}

export function themeColor(theme, key = 'primary', variant = 'base') {
  return theme.palette.colors[key][variant];
}

export function textColor(theme, key = 'light', variant = 'primary') {
  return theme.palette.contrastColors[key][variant];
}

export function animate(animationName) {
  let result;
  if (animationName === 'slide-in') {
    result = keyframes`
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    `;
  } else if (animationName === 'slide-out') {
    result = keyframes`
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(10px);
      }
    `;
  }

  return result;
}
export function animation(delay, duration, animationName) {
  const innerAnimation = animate(animationName);

  const animateProperty = `
    ${innerAnimation}

    -webkit-animation-delay: ${delay};
    -webkit-animation-duration: ${duration};
    -webkit-animation-name: ${animationName};
    -webkit-animation-fill-mode: forwards; /* this prevents the animation from restarting! */

    -moz-animation-delay: ${delay};
    -moz-animation-duration: ${duration};
    -moz-animation-name: ${animationName};
    -moz-animation-fill-mode: forwards; /* this prevents the animation from restarting! */

    animation-delay: ${delay};
    animation-duration: ${duration};
    animation-name: ${animationName};
    animation-fill-mode: forwards; /* this prevents the animation from restarting! */
  `;

  return animateProperty;
}

export function headerMenuButton(width) {
  return `
    width: ${width};
    background-color: transparent;
    border: 0;
    display: block;
  `;
}

export function flexRow() {
  return `
    display: flex;
    flex: 1;
    flex-wrap: nowrap;
    flex-direction: column;
  `;
}

export function flexColumn() {
  return `
    display: flex;
    flex: 1;
    flex-wrap: nowrap;
    flex-direction: row;
  `;
}

// This is used to generate differnet avatar sizes
export function avatarStyle(element, sizeName) {
  const unit = '8px';
  let sizeValue;
  if (sizeName === 'xsmall') sizeValue = `calc( 4 * ${unit})`;
  if (sizeName === 'small') sizeValue = `calc( 5 * ${unit})`;
  if (sizeName === 'medium') sizeValue = `calc( 7 * ${unit})`;
  if (sizeName === 'large') sizeValue = `calc(13 * ${unit})`;
  if (sizeName === 'xlarge') sizeValue = `calc(21 * ${unit})`;

  if (element === 'container') {
    return `
      width: ${sizeValue};
      height: ${sizeValue};
    `;
  } else if (element === 'image') {
    return `
      width: calc(${sizeValue} - 5px);
      height: calc(${sizeValue} - 5px);
    `;
  } else if (element === 'status') {
    let bottom = 0;
    let right = 0;
    let border = 1;
    if (sizeName === 'xsmall') {
      bottom = 0;
      right = 0;
      border = 1;
    } else if (sizeName === 'small') {
      bottom = 0;
      right = 0;
      border = 1;
    } else if (sizeName === 'medium') {
      bottom = 2;
      right = 1;
      border = 1;
    } else if (sizeName === 'large') {
      bottom = 8;
      right = 4;
      border = 2;
    } else if (sizeName === 'xlarge') {
      bottom = 16;
      right = 8;
      border = 2;
    }

    return `
      width: calc(${sizeValue} / 9);
      height: calc(${sizeValue} / 9);
      bottom: ${bottom}px;
      right: ${right}px;
      border: ${border}px solid #FFFFFF;
    `;
  } else if (element === 'letter') {
    return `
      font-size: calc(0.8 * ${sizeValue});
    `;
  }
  return '';
}

export function avatarGroupItem(index, total, groupType, xDistance = 3, yDistance = 10) {
  let result;
  const circles = niceCircles(total);
  const circle = circles[index];
  const zIndex = (index % 2) === 0 ? 10 : 0;

  if (groupType === 'circle') {
    const hStep = xDistance;
    const vStep = yDistance;

    const left = (circle[0]) * hStep;
    const top = (circle[1]) * vStep;
    result = `
      top: ${top}px;
      left: ${left}px;
      z-index: ${zIndex * index};
    `;
  } else {
    const hStep = xDistance;
    const left = hStep * index;
    result = `
      top: 0px;
      left: ${left}px;
    `;
  }

  return result;
}
