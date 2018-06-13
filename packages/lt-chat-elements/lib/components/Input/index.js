/**
*
* Input
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { textColor } from '../../utils/style';

const StyledInputContainer = styled.div`
  width: ${(props) => `${props.width}px`};

  color: ${(props) => textColor(props.theme, 'light', 'primary')};
  font-size: ${(props) => props.theme.typography.classes.body.fontSize};
  line-height: ${(props) => props.theme.typography.classes.body.lineHeight};
  
  input, label {
    display:block;
  }

  label {
    font-size: ${(props) => props.theme.typography.classes.small.fontSize};
  }

  input {
    width: 100%;
    display: block;
    border: none;
    padding: 10px 0;
    border-bottom: solid 1px #7DBC37;
    -webkit-transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
    transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
    background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 96%, #7DBC37 4%);
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 96%, #7DBC37 4%);
    background-position: ${(props) => `-${props.width}px`} 0;
    background-size: ${(props) => `${props.width}px`} 100%;
    background-repeat: no-repeat;
    color: #0e6252;
  }
  
  input:focus, input:valid {
   box-shadow: none;
   outline: none;
   background-position: 0 0;
  }

  input::-webkit-input-placeholder {
    color: ${(props) => textColor(props.theme, 'light', 'disabled')};
    font-family: 'roboto', sans-serif;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
   }
   
   input:focus::-webkit-input-placeholder, input:valid::-webkit-input-placeholder {
    color: #7DBC37;
    font-size: 11px;
    -webkit-transform: translateY(-12px);
    transform: translateY(-12px);
    visibility: visible !important;
   }
`;

const Input = (props) => (
  <StyledInputContainer width={props.width}>
    <label htmlFor={props.name}>
      {props.label}
      <input type={props.type} id={props.name} name={props.name} placeholder={props.placeholder} required autoComplete="false" />
    </label>
  </StyledInputContainer>
);

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.number,
  placeholder: PropTypes.string,
};

Input.defaultsProps = {
  width: 250,
  placeholder: '',
};

export default Input;
