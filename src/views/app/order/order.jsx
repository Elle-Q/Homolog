import React, {useEffect, useState} from 'react';
import './order.scss'
import {listOrder} from "../../../api/order.service";
import Card from "./card/card";
import Stack from "@mui/material/Stack";
import {useDispatch} from "react-redux";
import {setRefresh} from "../../../store/order-slice";

function Order(props) {
    const [orders, setOrders] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        listOrder().then(resp => {
            setOrders(resp);
        })
    }, []);

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