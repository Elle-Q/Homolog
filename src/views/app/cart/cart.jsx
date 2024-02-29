import React, {useEffect, useState} from 'react';
import {Checkbox, FormControlLabel} from "@mui/material";
import {useDispatch} from "react-redux";
import Button from "@mui/material/Button";
import './cart.scss'
import {delItem, listCart} from "../../../api/cart.service";
import {setOpen} from "../../../components/alert/confirm/confirmSlice";
import CartItem from "./cart_item/cart_item";
import {setData, setShow} from "../../../store/sider-slice";


function Cart() {
    const dispatch = useDispatch();
    const [items, setItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        listCart().then(resp => {
            let data = resp.map(item => {
                return {...item, checked: false}
            })
            setItems(data);
        })
    }, []);

    useEffect(() => {
        computePrice()
    }, [items])

    const computePrice = () => {
        let price = items.filter(item => item.checked).reduce(function (acc, item) {
            return acc + item.price;
        }, 0)
        setTotalPrice(price)
    }

    const handleSelectItem = (event, item) => {
        items.forEach(i => {
            if (i.id === item.id) {
                i.checked = event.target.checked
            }
        })
        setItems(items)
        computePrice()
    }

    //刪除购物车条目
    function handleDelItem(id) {
        let ops = () => {
            delItem(id).then(() => {
                let newItems = items.filter(item => item.id !== id);
                setItems(newItems);
            })
        }
        dispatch(setOpen({
            open: true,
            okHandle: ops
        }));
    }

    const handleGoPay = () => {
        let order = {
            payType: 'wepay', //默认微信支付
            details: items.filter(item => item.checked),
            totalPrice: totalPrice
        }
        dispatch(setData(order))
        dispatch(setShow("pay"))
    }

    return (
        <React.Fragment>
            {items && items.map(item => {
                return <FormControlLabel
                    key={item.id}
                    label={<CartItem item={item} handleDelItem={handleDelItem}/>}
                    control={<Checkbox onChange={(event) => handleSelectItem(event, item)}
                                       size="small"
                                       sx={{'& .MuiSvgIcon-root': {color: '#e82986'}}}/>}
                >
                </FormControlLabel>
            })}
            {totalPrice > 0 &&
                <div className={'cart-button-wrapper'}>
                    <Button className={'cart-button'}
                            onClick={handleGoPay}> 去支付(￥{totalPrice})
                    </Button>
                </div>
            }
        </React.Fragment>

    );
}

export default Cart;