import React from 'react';
import './glowing-button.scss'

function GlowingButton(props) {
    const {label} = props;

    return (
        <a className="glowing-button">{label}</a>
    );
}

export default GlowingButton;