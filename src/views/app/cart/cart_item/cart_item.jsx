import React from 'react';
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";


function CartItem(props) {

    const {item, handleDelItem} = props;

    return (
        <div style={{display: 'flex', marginBottom: '20px'}} key={item.id}>
            <Stack style={{display: 'flex', justifyContent: 'space-between'}}
                   direction={'row'}
                   spacing={1}>
                <img src={item.main} alt='prevShow'
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
                    <IconButton onClick={() => handleDelItem(item.id)}>
                        <DeleteIcon sx={{color: '#ffffff'}} fontSize='medium'/>
                    </IconButton>
                </Tooltip>
            </Stack>
        </div>

    );
}

export default CartItem;