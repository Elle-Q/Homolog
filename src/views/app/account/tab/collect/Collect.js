import React, {useEffect, useState} from 'react';
import ItemCard from "../../../../../components/item-card/item-card";
import InfiniteScroll from "react-infinite-scroller";
import {ListItemsByActionAndUser} from "../../../../../api/item.service";
import '../tab.scss'
import SoundCard from "../../../../../components/sound-card/sound_card";

function Collect({totalSize}) {

    const [items, setItems] = useState([])
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        search();
    }, []);

    const search = () => {
        let fetchItems = async () => {
            await ListItemsByActionAndUser(1, 'collect').then((items) => {
                setItems(items.map(i => {
                    return {...i, collected: true}
                }))
                setHasMore(items ? items.length < totalSize : false)
            })
        }
        fetchItems().catch()
        setPage(2);
    }

    const loadMoreItems = () => {
        if (items.length >= totalSize) return
        ListItemsByActionAndUser(page, 'collect').then((data) => {
            let map = data.map(i => {
                return {...i, collected: true}
            });
            let newList = [...items, ...map]
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
                    items && items.map(item => {
                        if (item.type === 'sound') {
                            return <SoundCard key={item.id} item={item}/>
                        } else {
                            return <ItemCard key={item.id} item={item} width="250px"/>
                        }
                    })
                }
            </div>
        </InfiniteScroll>
    );
}

export default Collect;