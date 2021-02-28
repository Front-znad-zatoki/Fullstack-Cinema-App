import React from 'react';
import { Link } from 'react-router-dom';

function LinkAsButton({textToDisplay, classes, pathToRedicrect}) {
    return (
        <Link className={classes} to={pathToRedicrect}>
            {textToDisplay}
        </Link>
    )
}

export default LinkAsButton
