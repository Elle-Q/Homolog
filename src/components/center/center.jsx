import React from 'react';

export const FlexCenter = (props) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            {...props}
        >{props.children}
        </div>
    );
}
