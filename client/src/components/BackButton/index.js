import React from 'react';
import styled from 'styled-components';

function BackButton() {
  const ButtonStyled = styled.button`
    /* Adapt the colors based on primary prop */
    background: ${(props) => (props.primary ? 'palevioletred' : 'white')};
    color: ${(props) => (props.primary ? 'white' : 'palevioletred')};

    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 3px;
  `;

  return (
    <div>
      <ButtonStyled>Normal</ButtonStyled>
      <ButtonStyled primary>Primary</ButtonStyled>
    </div>
  );
}

export default BackButton;
