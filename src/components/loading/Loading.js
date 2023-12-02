import React from 'react';
import {
    BeatLoader,
    BounceLoader,
    ClimbingBoxLoader,
    ClipLoader,
    DotLoader,
    FadeLoader,
    GridLoader,
    MoonLoader,
    PacmanLoader,
    PropagateLoader,
    PuffLoader,
    PulseLoader,
    RiseLoader,
    RotateLoader,
    ScaleLoader,
    SyncLoader
} from "react-spinners";
import {css} from "@emotion/react";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: white;
  position: absolute;
  top: 48%;
  left: 46%;
  z-index: 1000;
`;


function Loading({loading}) {
    return (
        <BeatLoader loading={loading} size={30} color="white" css={override}/>
    );
}

export default Loading;