import React  from 'react';
import "./search.scss"
import Navbar from "./navbar/navbar";
import {Outlet} from "react-router-dom";
import { ScrollRestoration } from 'react-router-dom';

function Search() {

    return (
        <div className="search">
            <Navbar/>
            <Outlet />
        </div>
    );
}

export default Search;