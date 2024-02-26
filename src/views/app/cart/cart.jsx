import React, {useEffect, useState} from 'react';
import {Checkbox, Drawer, FormControlLabel} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import {closeCart, selectCart} from "../../../store/cart-slice";
import Pay from "./pay/pay";
import './cart.scss'
import {delItem, getCart} from "../../../api/cart.service";
import {setOpen} from "../../../components/alert/confirm/confirmSlice";
import CartItem from "./cart_item/cart_item";


function Cart() {
    const {open} = useSelector(selectCart);
    const dispatch = useDispatch();
    const [items, setItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [isPaying, setIsPaying] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [title, setTitle] = useState('购物车')

    useEffect(() => {
        getCart().then(resp => {
            let data = resp.map(item => {
                return {...item, checked: false}
            })
            setItems(data);
        })
    }, [open, refresh]);

    useEffect(() => {
        computePrice()
    }, [items])

    useEffect(() => {
        setTitle(isPaying ? '支付' : '购物车')
    }, [isPaying])

    const computePrice = () => {
        let price = items.filter(item => item.checked).reduce(function (acc, item) {
            return acc + item.price;
        }, 0)
        setTotalPrice(price)
    }

    const togglePaying = () => {
        setIsPaying(!isPaying)
        setRefresh(!refresh)
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

    const closeCartDrawer = () => {
        setIsPaying(false)
        dispatch(closeCart())
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

    const getSelectedItems = () => {
        return items.filter(item => item.checked)
    }

    return (
        <Drawer
            anchor='right'
            PaperProps={{sx: {backgroundColor: "rgba(49,47,46,0.9)", width: '23%'}}}
            open={open}
            onClose={closeCartDrawer}
        >
            <div>
                <span className={'cart-span'}>{title}</span>
            </div>
            <Divider sx={{marginBottom: '20px'}}></Divider>
            <div style={{padding: '10px'}}>
                {
                    isPaying ?
                        <Pay togglePaying={togglePaying}
                             items={getSelectedItems()}></Pay>
                        :
                        <React.Fragment>
                            {items && items.map(item => {
                                return <FormControlLabel
                                    key={item.id}
                                    label={<CartItem item={item} handleDelItem={handleDelItem}/>}
                                    control={<Checkbox onChange={(event) => handleSelectItem(event,item)}
                                                       size="small"
                                                       sx={{'& .MuiSvgIcon-root': {color: '#e82986'}}}/>}
                                >
                                </FormControlLabel>
                            })}
                            {totalPrice > 0 &&
                                <div className={'cart-button-wrapper'}>
                                    <Button className={'cart-button'}
                                            onClick={() => setIsPaying(true)}> 去支付(￥{totalPrice})
                                    </Button>
                                </div>
                            }
                        </React.Fragment>
                }
            </div>
        </Drawer>

    );
}

export default Cart;