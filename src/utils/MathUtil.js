import React from 'react';

export function ByteToM(bytes) {
    return (bytes/Math.pow(1024,2)).toFixed(2);
}