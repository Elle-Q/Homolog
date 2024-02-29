import React, {useEffect, useState} from 'react';
import './order.scss'
import {listOrder} from "../../../api/order.service";
import Card from "./card/card";
import Stack from "@mui/material/Stack";
import {useDispatch, useSelector} from "react-redux";
import {selectOrder, setRefresh} from "../../../store/order-slice";

function Order(props) {
    const [orders, setOrders] = useState([])
    const {refresh} = useSelector(selectOrder);
    const dispatch = useDispatch();

    useEffect(() => {
        listOrder().then(resp => {
            setOrders(resp);
        })
    }, [refresh]);

    const cancelOrder = (id) => {
        let newOrders = orders.filter(order => order.order.id !== id)
        dispatch(setRefresh())
        setOrders(newOrders)
    }

    return (
        <div className="order-container">
            <div className="header">
                <span>订单交易</span>
            </div>
            <Stack spacing={2} sx={{alignItems:'center', marginTop: '20px'}}>
                {
                    orders.map(order => {
                        return <Card key={order.id} data={order} cancelOrder={() => cancelOrder(order.order.id)}></Card>
                    })
                }
            </Stack>
        </div>
    );
}

export default Order;