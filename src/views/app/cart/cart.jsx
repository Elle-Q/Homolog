import React, {useEffect, useState} from 'react';
import {Drawer} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import {closeCart, selectCart} from "../../../store/cart-slice";
import Pay from "./pay";
import './cart.scss'
import {selectAuth} from "../../../api/authSlice";
import {getCart} from "../../../api/cart.service";


function Cart(props) {
    const {open} = useSelector(selectCart);
    const dispatch = useDispatch();
    const [items, setItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [isPaying, setIsPaying] = useState(false)
    const [title, setTitle] = useState('购物车')
    const {user} = useSelector(selectAuth);

    useEffect(() => {
        getCart(7).then(resp => {
            setItems(resp);
            let price = resp.reduce(function (acc, item) {
                return acc + item.price;
            }, 0)
            setTotalPrice(price)
        })
    }, [open]);

    const togglePaying = () => {
        setIsPaying(!isPaying)
        setTitle(isPaying ? '购物车' : '支付')
    }

    function handleDelItem() {
    }

    return (
        <Drawer
            anchor='right'
            PaperProps={{sx: {backgroundColor: "rgba(49,47,46,0.9)", width: '23%'}}}
            open={open}
            onClose={() => dispatch(closeCart())}
        >
            <div>
                <span className={'cart-span'}>{title}</span>
            </div>
            <Divider sx={{marginBottom: '20px'}}></Divider>
            <div style={{padding: '10px'}}>
                {
                    isPaying ?
                        <Pay togglePaying={togglePaying} totalPrice={totalPrice}></Pay>
                        :
                        <React.Fragment>
                            {items && items.map(item => {
                                return <Stack style={{display: 'flex', marginBottom: '20px'}} spacing={2} key={item.id}>
                                    <Stack style={{display: 'flex', justifyContent: 'space-between'}}
                                           direction={'row'}
                                           spacing={1}>
                                        <img src={item.main.link} alt='prevShow'
                                             style={{
                                                 maxHeight: '100px',
                                                 marginRight: '10px',
                                                 borderRadius: '25px'
                                             }}/>
                                        <Stack sx={{color: '#6e6d6d', fontSize: '12px', flex: '1'}} spacing={0}>
                                            <span style={{fontSize: '16px'}}>{item.name}</span>
                                            <span> 作者: {item.author}</span>
                                            <span> 适用软件: blender</span>
                                            <span> 价格: <span style={{color: '#e82986'}}>￥{item.price}</span></span>
                                        </Stack>
                                        <Tooltip title="从购物车移除">
                                            <IconButton onClick={handleDelItem}>
                                                <DeleteIcon sx={{color: '#ffffff'}} fontSize='medium'/>
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </Stack>
                            })}

                            { totalPrice > 0 &&
                                <div className={'cart-button-wrapper'}>
                                    <Button className={'cart-button'}
                                            onClick={togglePaying}> 去支付(￥{totalPrice})
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