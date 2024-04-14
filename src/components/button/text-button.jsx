import React from 'react';
import "./button.scss"
export const OKButton = (props) => {
    const {handleClick} = props;

    return (
        <button className="btn btn__text btn__text--light" autoFocus onClick={handleClick}>
            {props.children}
        </button>
    )
}

export const CancelButton = (props) => {
    const {handleClick} = props;

    return (
        <button className="btn btn__text btn__text--dark" autoFocus onClick={handleClick}>
            {props.children}
        </button>
    )
}

