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

function Search() {

    const {doSearch, keyword} = useSelector(selectSearch);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(0);
    const [totalSize, setTotalSize] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        ListItems(0, keyword).then((items) => {
            setList(items)
            setPage(page + 1);
            TotalSize(keyword).then((size) => {
                setTotalSize(size)
                setHasMore(items.length < size)
            })
        })
    }, [doSearch]);

    const loadMoreItems = () => {
        if (list.length >= totalSize) return
        ListItems(page, keyword).then((data) => {
            let newList = [...list, ...data]
            setList(newList)
            setPage(page + 1);
            setHasMore(newList.length < totalSize)
        });

    };

    return (
        <div className="search-container">
            {/*<SearchBar/>*/}
            <div className="nav-container">
                <Stack direction="row" spacing={1}>
                    <div className="nav-cat">
                        <IconButton> <img alt="icon" src={Three}/> </IconButton>
                        <span>模型</span>
                    </div>
                    <div className="nav-cat">
                        <IconButton> <img alt="icon" src={Texture}/> </IconButton>
                        <span>贴图</span>
                    </div>
                    <div className="nav-cat">
                        <IconButton> <img alt="icon" src={Book}/> </IconButton>
                        <span>文档</span>
                    </div>
                    <div className="nav-cat">
                        <IconButton> <img alt="icon" src={Video}/> </IconButton>
                        <span>教程</span>
                    </div>
                    <div className="nav-cat">
                        <IconButton> <img alt="icon" src={Soft}/> </IconButton>
                        <span>软件</span>
                    </div>
                </Stack>
            </div>
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