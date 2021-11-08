import React from 'react';
import {HeaderBar} from "./appbar/HeaderBar";
import {Route, Routes} from "react-router-dom";
import Play from "../paly/Play";
import Body from "./body/Body";

function Home(props) {
    return (
        <React.Fragment>
            <HeaderBar/>
            <Routes>
                <Route path="/" element={<Body/>}/>
                <Route path="play" element={<Play/>}/>
            </Routes>

        </React.Fragment>
    );
}

export default Home;