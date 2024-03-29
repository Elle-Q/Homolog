import React, {useEffect, useState} from 'react';
import {ListItems, TotalSize} from "../../../api/cat.service";
import "./search.scss"
import IconButton from "@mui/material/IconButton";
import FilterListIcon from '@mui/icons-material/FilterList';
import Navbar from "./navbar/navbar";
import {useSearchParams} from "react-router-dom";
import SearchBody from "./search-body/search-body";

function Search() {
    let [params] = useSearchParams();

    const [totalSize, setTotalSize] = useState(0);
    const [catId, setCatId] = useState()

    const catIdP = params.get("catId");
    const keywordP = params.get("keyword");
    const metricP = params.get("metric");

    useEffect(() => {
        setCatId(catIdP)
    }, [catIdP]);

    const updateSize = (size) => {
        setTotalSize(size)
    }

    return (
        <div className="search-container">
            <Navbar catId={catId}/>
            <div className="filter-container">
                <span>{totalSize}个资源 </span>
                <IconButton><FilterListIcon fontSize="small"/>过滤</IconButton>
            </div>
            <SearchBody keyword={keywordP} catId={catIdP} metric={metricP} updateSize={updateSize}/>
        </div>
    );
}

export default Search;