import React, {useEffect, useState} from 'react';
import './order.scss'
import {NavLink, Route, Routes} from "react-router-dom";
import Tab from "./tab/tab";
import {countOrder} from "../../../api/order.service";

function Order(props) {

    const [closedCnt, setClosedCnt] = useState(0)
    const [openCnt, seOpenCnt] = useState(0)

    useEffect(() => {
        countOrder().then(resp => {
            setClosedCnt(resp.closed);
            seOpenCnt(resp.open);
        })
    }, []);

    const sty = {
        marginLeft: '30px',
        color: 'grey',
        fontSize: '12px',
        textDecoration: 'none',
    }

    return (
        <div className="order">
            <div className="order__heading">
                <span>订单交易</span>
                <NavLink to="/order/open" style={sty}>进行中 ({openCnt})</NavLink>
                <NavLink to="/order/complete" style={sty}>已完成 ({closedCnt})</NavLink>
            </div>
            <Routes>
                <Route path="/open" element={<Tab status="ongoing"/>} key="/open"/>
                <Route path="/complete" element={<Tab status="closed"/>} key="/complete"/>
            </Routes>
        </div>
    );
}

export default Order;