import React from 'react';

function Button({ textToDisplay, classes, callback }) {
  return (
    <button className={classes} onClick={callback}>
      {textToDisplay}
    </button>
  );
}

export default Button;
