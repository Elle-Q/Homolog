import React, {useEffect, useState} from 'react';
import ItemCard from "../../../../../components/item-card/item-card";
import InfiniteScroll from "react-infinite-scroller";
import {ListItemsByActionAndUser, TotalSizeByActionAndUser} from "../../../../../api/item.service";
import '../tab.scss'

function Like({totalSize}) {

    const [items, setItems] = useState([])
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        if (!totalSize) return;
        search();
    }, []);

    const search = () => {
        let fetchItems = async () => {
            await ListItemsByActionAndUser(1, 'like').then((items) => {
                setItems(items)
                setHasMore(items.length < totalSize)
            })
        }
        fetchItems().catch()
        setPage(2);
    }

    const loadMoreItems = () => {
        if (items.length >= totalSize) return
        ListItemsByActionAndUser(page, 'like').then((data) => {
            let newList = [...items, ...data]
            setItems(newList)
            setPage(page + 1);
            setHasMore(newList.length < totalSize)
        });
    };

    return (
        <InfiniteScroll
            pageStart={page}
            loadMore={loadMoreItems}
            hasMore={hasMore}
            loader={<div key={0}>Loading...</div>}
        >
            <div className="account-tab-container">
                {
                    items && items.map(item => (
                        <ItemCard item={item} width="250px"/>
                    ))
                }
            </div>
        </InfiniteScroll>
    );
}

export default Like;