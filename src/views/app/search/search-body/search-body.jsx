import React, {useEffect, useState} from 'react';
import ItemCard from "../../../../components/item-card/item-card";
import InfiniteScroll from "react-infinite-scroller";
import {ListItems, TotalSize} from "../../../../api/cat.service";
import {useSelector} from "react-redux";
import {selectSearch} from "../../../../store/search";

function SearchBody(props) {
    const {keyword, catId, metric, updateSize} = props;
    const {doSearch} = useSelector(selectSearch);
    const [totalSize, setTotalSize] = useState(0);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            return await ListItems(1, keyword, catId, metric)
        }
        const fetchSize = async () => {
            return await TotalSize(keyword, catId, metric)
        }
        fetchData().then(items => {
            setList(items)
            fetchSize().then(size => {
                updateSize(size)
                setTotalSize(size)
                setPage(2);
                setHasMore(items.length < size)
                setIsFetching(false);
            })
        })

    }, [doSearch, catId, metric, keyword]);

    const loadMoreItems = () => {
        if (isFetching) return
        setHasMore(list.length < totalSize)
        ListItems(page, keyword, catId, metric).then((data) => {
            let newList = [...list, ...data]
            setList(newList)
            setPage(page + 1);
            setHasMore(newList.length < totalSize)
        });
    };

    return (
        <React.Fragment>
            {
                !isFetching && <InfiniteScroll
                    pageStart={page}
                    loadMore={loadMoreItems}
                    hasMore={hasMore}
                    loader={<div key={0}>Loading...</div>}
                >
                    <div className="body-container">
                        {
                            list && list.map(item => (
                                <ItemCard key={item.id} item={item} width="23%"/>
                            ))
                        }
                    </div>
                </InfiniteScroll>
            }
        </React.Fragment>
    );
}

export default SearchBody;