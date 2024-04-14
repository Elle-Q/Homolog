import React from 'react';
import Divider from "@mui/material/Divider";
import {Drawer} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {closeSider, selectSider} from "../../../../store/sider-slice";
import Cart from "../../cart/cart";
import Pay from "../../pay/pay";
import "./sidebar.scss"

function Sidebar(props) {
    const dispatch = useDispatch();
    const {open, show} = useSelector(selectSider);

    const handleCloseSider = () => {
        dispatch(closeSider())
    }

    return (
        <Drawer
            anchor='right'
            PaperProps={{sx: {backgroundColor: "#1C2129", width: '23%'}}}
            open={open}
            onClose={handleCloseSider}
        >
            <div>
                <span className={'sidebar__heading'}>
                    {show==='cart'?'购物车':'支付'}
                </span>
            </div>
            <div className="sidebar__body">
                {
                    show === 'cart' ? <Cart />
                    : <Pay />
                }
            </div>
        </Drawer>
    );
}

export default Sidebar;