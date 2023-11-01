import React from 'react';
import {Drawer} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {selectItemModal,close} from "../item-slice";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import styled from "styled-components";

const PayButton = styled(Button) `
  color: white;
  width: 120px;
  height: 40px;
  
  &:hover {
    background-color: alpha('#403D39', 0.2);
  }

`
function Cart(props) {
    const {item} = props
    const {openDrawer} = useSelector(selectItemModal);
    const dispatch = useDispatch();

    const handlePay = () => {
    }

    function handleDelCart() {

    }

    return (
        <Drawer
            anchor='right'
            PaperProps={{sx: {backgroundColor: "rgba(49,47,46,0.9)", padding: '20px', width: '23%'}}}
            open={openDrawer}
            onClose={() => dispatch(close())}
            onClick={(event) => event.stopPropagation()}
        >
            <Typography variant={'h4'} sx={{color: '#e82986', fontFamily: 'cursive', padding: '10px'}}>购物车</Typography>
            <Divider sx={{marginBottom: '20px'}}/>
            <Stack style={{display: 'flex'}} spacing={2}>
                <Stack style={{display: 'flex', justifyContent: 'space-between'}} direction={'row'} spacing={1}>
                    <img src={item.Main} alt='prevShow'
                         style={{maxHeight: '100px', marginRight: '10px', borderRadius: '25px'}}/>
                    <Stack sx={{color: '#6e6d6d', fontSize: '12px', flex: '1'}} spacing={0}>
                        <span style={{fontSize: '16px'}}>{item.Name}</span>
                        <span> 作者: {item.Author}</span>
                        <span> 适用软件: blender</span>
                        <span> 总时长: 156分钟</span>
                        <span> 价格: <span style={{color: '#e82986'}}>￥{item.Price}</span></span>
                    </Stack>
                    <Tooltip title="从购物车移除">
                        <IconButton onClick={handleDelCart}>
                            <DeleteIcon onClick={handleDelCart} sx={{color: '#ffffff'}} fontSize='medium'/>
                        </IconButton>
                    </Tooltip>
                </Stack>
                <div style={{textAlign: 'center', marginTop: '10px'}}>
                    <PayButton onClick={handlePay}> 支付(￥{item.Price}) </PayButton>
                </div>
            </Stack>
        </Drawer>
    );
}

export default Cart;