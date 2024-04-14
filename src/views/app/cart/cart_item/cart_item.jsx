import React from 'react';
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import "../cart.scss"

function CartItem(props) {

    const {item, handleDelItem} = props;

    return (
        <div className="cart__item">
            <img src={item.main} alt='prevShow'/>
            <Stack sx={{color: '#6e6d6d', fontSize: '12px', flex: '1'}} spacing={0}>
                <span style={{fontSize: '16px'}}>{item.name}</span>
                <span> 作者: {item.author}</span>
                <span> 适用软件: blender</span>
                <span> 价格: <span style={{color: '#e82986'}}>￥{item.price}</span></span>
            </Stack>
            <Tooltip title={<h2 className="cart__item-h2">从购物车移除</h2>}>
                <IconButton onClick={() => handleDelItem(item.id)} className="cart__item-btn">
                    <DeleteIcon fontSize='medium'/>
                </IconButton>
            </Tooltip>
        </div>

    );
}

export default CartItem;