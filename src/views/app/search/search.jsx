import React, {useEffect, useState} from 'react';
import {ListItems, TotalSize, totalSize} from "../../../api/cat.service";
import ItemCard from "../../../components/item-card/item-card";
import "./search.scss"
import IconButton from "@mui/material/IconButton";
import FilterListIcon from '@mui/icons-material/FilterList';
import Stack from "@mui/material/Stack";
import Three from "../../../assets/menu/3d.svg";
import Texture from "../../../assets/menu/texture.svg";
import Book from "../../../assets/menu/book.svg";
import Video from "../../../assets/menu/video.svg";
import Soft from "../../../assets/menu/soft.svg";
import InfiniteScroll from "react-infinite-scroller";
import {useSelector} from "react-redux";
import {selectSearch} from "../../../store/Search";
import SearchBar from "./searchbar/SearchBar";

function Search() {

    const {doSearch, keyword} = useSelector(selectSearch);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalSize, setTotalSize] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [cat, setCat] = useState(null);
    const [metric, setMetric] = useState(null);

    useEffect(() => {
        search()
    }, [doSearch, cat, metric]);

    const loadMoreItems = () => {
        if (list.length >= totalSize) return
        ListItems(page, keyword, cat, metric).then((data) => {
            let newList = [...list, ...data]
            setList(newList)
            setPage(page + 1);
            setHasMore(newList.length < totalSize)
        });

    };

    const search = () => {
        ListItems(1, keyword, cat, metric).then((items) => {
            setList(items)
            TotalSize(keyword, cat, metric).then((size) => {
                setTotalSize(size)
                setHasMore(items.length < size)
            })
        })
        setPage(2);
    }

    const handleClickNavCat = (cat) => {
        setCat(cat)
    }

    const handleClickMetric = (metric) => {
        setMetric(metric)
    }

    return (
        <div className="search-container">
            <SearchBar
                handleClickNavCat={handleClickNavCat}
                handleClickMetric={handleClickMetric}
            />
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