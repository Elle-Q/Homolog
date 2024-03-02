import React, {useEffect, useState} from 'react';
import Card from "../card/card";
import Stack from "@mui/material/Stack";
import {useDispatch, useSelector} from "react-redux";
import {selectOrder, setRefresh} from "../../../../store/order-slice";
import {listOrder} from "../../../../api/order.service";

function Tab(props) {

    const {status} = props
    const [orders, setOrders] = useState([])
    const {refresh} = useSelector(selectOrder);
    const dispatch = useDispatch();

    useEffect(() => {
        listOrder(status).then(resp => {
            setOrders(resp);
        })
    }, [refresh]);

    const cancelOrder = (id) => {
        let newOrders = orders.filter(order => order.order.id !== id)
        dispatch(setRefresh())
        setOrders(newOrders)
    }

    return (
        <Stack spacing={2} sx={{alignItems:'center', marginTop: '20px'}}>
            {
                orders.map(order => {
                    return <Card key={order.id} data={order} cancelOrder={() => cancelOrder(order.order.id)}></Card>
                })
            }
        </Stack>
    );
}

export default Tab;