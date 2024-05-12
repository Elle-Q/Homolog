import React, {useEffect, useState} from 'react';
import ItemCard from "../../../../components/item-card/item-card";
import InfiniteScroll from "react-infinite-scroller";
import {ListItems, TotalSize} from "../../../../api/cat.service";
import SoundCard from "../../../../components/sound-card/sound_card";
import {useParams} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import {useSelector} from "react-redux";
import {selectSearch} from "../../../../store/search";

function SearchBody(props) {
    let params = useParams();
    let cat = params.cat ? params.cat : "model";
    let keyword = params.keyword ? params.keyword : "all";

    const {doSearch} = useSelector(selectSearch);
    const [totalSize, setTotalSize] = useState(0);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        setIsFetching(true)
        const fetchData = async () => {
            return await ListItems(1, keyword, cat)
        }
        const fetchSize = async () => {
            return await TotalSize(keyword, cat)
        }
        fetchData().then(items => {
            setList(items)
            fetchSize().then(size => {
                setTotalSize(size)
                setPage(2);
                setHasMore(items.length < size)
                setIsFetching(false);
            })

        })

    }, [doSearch, cat, keyword]);

    const loadMoreItems = () => {
        if (isFetching) return

        const fetchData = async () => {
            setIsFetching(true)
            return await ListItems(page, keyword, cat);
        }

        fetchData().then((data) => {
            let newList = [...list, ...data]
            setList(newList)
            setPage(page + 1);
            setHasMore(newList.length < totalSize)
            setIsFetching(false)
        })
    };

    return (
        <React.Fragment>
            <div className="search__filter-box">
                <span>{totalSize}个资源 </span>
                <IconButton><FilterListIcon fontSize="small"/>过滤</IconButton>
            </div>
            <InfiniteScroll
                pageStart={page}
                loadMore={loadMoreItems}
                hasMore={hasMore}
                loader={<div key={0}>Loading...</div>}
            >
                <div className="search__body">
                    {
                        list && list.map(item => {
                            if (item.type === 'sound') {
                                return <SoundCard key={item.id} item={item}/>
                            } else {
                                return <ItemCard key={item.id} item={item} width="23%"/>
                            }
                        })
                    }
                </div>
            </InfiniteScroll>
        </React.Fragment>
    );
}

export default SearchBody;