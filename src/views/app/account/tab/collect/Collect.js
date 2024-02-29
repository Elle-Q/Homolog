import React, {useEffect, useState} from 'react';
import ItemCard from "../../../../../components/item-card/item-card";
import InfiniteScroll from "react-infinite-scroller";
import {ListActionItems, TotalActionSize} from "../../../../../api/item.service";
import '../tab.scss'

function Collect(props) {

    const [items, setItems] = useState([])
    const [page, setPage] = useState(1);
    const [totalSize, setTotalSize] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        search();
    }, []);

    const search = () => {
        let fetchItems = async () => {
            await ListActionItems(1, 'collect').then((items) => {
                setItems(items)
                TotalActionSize('collect').then((size) => {
                    setTotalSize(size)
                    setHasMore(items.length < size)
                })
            })
        }
        fetchItems().catch()
        setPage(2);
    }

    const loadMoreItems = () => {
        if (items.length >= totalSize) return
        ListActionItems(page, 'collect').then((data) => {
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

export default Collect;