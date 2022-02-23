import React from 'react';
import {styled} from "@mui/system";

export const RatioInput = styled('input')`
    appearance: none;
    border: 1px solid #fff;
    border-radius: 50%;
    box-shadow: 0 0 5px #3399ff;
    background: white;
    content: " ";
    height: 15px;
    position: absolute;
    right: 0;
    top: 0;
    width: 15px;
    
    &:hover {
        background: #0A1929;
        border-color: #173A5E;
    }

    &:focus {
        background: #3399ff;
        outline: none;
        border-color:#3399ff;
    }
`;