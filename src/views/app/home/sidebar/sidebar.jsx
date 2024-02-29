import React from 'react';
import Divider from "@mui/material/Divider";
import {Drawer} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {closeSider, selectSider} from "../../../../store/sider-slice";
import Cart from "../../cart/cart";
import Pay from "../../pay/pay/pay";

function Sidebar(props) {
    const dispatch = useDispatch();
    const {open, show} = useSelector(selectSider);

    const handleCloseSider = () => {
        dispatch(closeSider())
    }

    return (
        <Drawer
            anchor='right'
            PaperProps={{sx: {backgroundColor: "rgba(49,47,46,0.9)", width: '23%'}}}
            open={open}
            onClose={handleCloseSider}
        >
            <div>
                <span className={'cart-span'}>
                    {show==='cart'?'购物车':'支付'}
                </span>
            </div>
            <Divider sx={{marginBottom: '20px'}}></Divider>
            <div style={{padding: '10px'}}>
                {
                    show === 'cart' ? <Cart />
                    : <Pay />
                }
            </div>
        </Drawer>
    );
}

export default Sidebar;