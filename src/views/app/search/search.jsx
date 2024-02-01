import React, {useEffect, useState} from 'react';
import {ListItems, TotalSize} from "../../../api/cat.service";
import ItemCard from "../../../components/item-card/item-card";
import "./search.scss"
import IconButton from "@mui/material/IconButton";
import FilterListIcon from '@mui/icons-material/FilterList';
import InfiniteScroll from "react-infinite-scroller";
import {useSelector} from "react-redux";
import {selectSearch} from "../../../store/Search";
import SearchBar from "./searchbar/SearchBar";
import {useSearchParams} from "react-router-dom";

function Search() {
    let [params] = useSearchParams();

    const {doSearch, keyword} = useSelector(selectSearch);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalSize, setTotalSize] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    const catId = params.get("catId");
    const metric = params.get("metric");

    useEffect(() => {
        search()
    }, [doSearch, catId, metric]);

    const loadMoreItems = () => {
        if (list.length >= totalSize) return
        ListItems(page, keyword, catId, metric).then((data) => {
            let newList = [...list, ...data]
            setList(newList)
            setPage(page + 1);
            setHasMore(newList.length < totalSize)
        });

    };

    const search = () => {
        ListItems(1, keyword, catId, metric).then((items) => {
            setList(items)
            TotalSize(keyword, catId, metric).then((size) => {
                setTotalSize(size)
                setHasMore(items.length < size)
            })
        })
        setPage(2);
    }

    return (
        <div className="search-container">
            <SearchBar catId={catId}/>
            <div className="filter-container">
                <span>{totalSize}个资源 </span>
                <IconButton><FilterListIcon fontSize="small"/>过滤</IconButton>
            </div>

            <InfiniteScroll
                pageStart={page}
                loadMore={loadMoreItems}
                hasMore={hasMore}
                loader={<div key={0}>Loading...</div>}
            >
                <div className="body-container">
                    {
                        list && list.map(item => (
                            <ItemCard item={item}/>
                        ))
                    }
                </div>
            </InfiniteScroll>
        </div>
    );
}

export default Search;