import React, {useEffect, useState} from 'react';
import ItemCard from "../../../../../components/item-card/item-card";
import InfiniteScroll from "react-infinite-scroller";
import {countCart, pageCart} from "../../../../../api/cart.service";
import '../tab.scss'

function Cart({totalSize}) {

    const [items, setItems] = useState([])
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        search();
    }, []);

    const search = () => {
        let fetchItems = async () => {
            await pageCart(1).then((items) => {
                setItems(items)
                setHasMore(items ? items.length < totalSize : false)
            })
        }
        fetchItems().catch()
        setPage(2);
    }

    const loadMoreItems = () => {
        if (items.length >= totalSize) return
        pageCart(page).then((data) => {
            let newList = [...items, ...data]
            setItems(newList)
            setPage(page + 1);
            setHasMore(newList ? newList.length < totalSize : false)
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
                        <ItemCard key={item.id} item={item} width="250px"/>
                    ))
                }
            </div>
        </InfiniteScroll>
    );
}

export default Cart;