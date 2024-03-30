import React, {useEffect, useState} from 'react';
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Link} from "react-router-dom";
import PriceTag from "../PriceTag";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {openSider} from "../../store/sider-slice";
import {useDispatch} from "react-redux";
import "../../views/app/home/body/subject/subject.scss"
import Stack from "@mui/material/Stack";
import './item-card.scss'
import DownloadIcon from '@mui/icons-material/Download';
import {addItem2Cart} from "../../api/cart.service";
import {toggleAtion} from "../../api/action.service";
import Box from "@mui/material/Box";
import {ColoredButton} from "../ui/CustomButton";
import Debugger from "../debugger/debugger";

function ItemCard(props) {
    const {item, width} = props;
    const [collected, setCollected] = useState(false);
    const [added, setAdded] = useState(false);
    let dispatch = useDispatch();

    useEffect(() => {
        setCollected(item.collected)
    }, [item]);

    const handleAdd2Cart = () => {
        setAdded(!added)
        addItem2Cart(item.id).then(resp => {
            dispatch(openSider())
        })
    }

    //点击下载源文件
    const handleDownload = () => {
        window.location.href = item.attachments[0].link
    }

    const handleCollect = () => {
        toggleAtion(item.id, 'collect').then(resp => {
            setCollected(resp)
        })
    }

    const getClass = () => {
        if (item.type === 'hdri') {
            return 'media-container media-container_hdri'
        } else if (item.type === 'doc') {
            return 'media-container media-container_doc'
        } else if (item.type === 'model') {
            return 'media-container'
        } else if (item.type === 'model_bundle') {
            return 'media-container media-container_bundle'
        } else if (item.type === 'tutorial') {
            return 'media-container media-container_tutorial'
        } else if (item.type === 'image') {
            return 'media-container media-container_img'
        } else if (item.type === 'texture') {
            return 'media-container media-container_texture'
        }
    }

    return (
        <Box className="item-card" sx={{width: `${width}`, position: 'relative'}}>
            <Link to={`/item/${item.id}`} key={item.id}>
                <div className={getClass()}>
                    <img src={item.main && item.main.link} alt="item"/>
                </div>
            </Link>

            <span> {item.name}</span>
            <Stack direction="row" sx={{justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                    <IconButton onClick={handleCollect}>
                        <FavoriteIcon fontSize="small" sx={{color: `${collected ? '#ff0a54' : 'white'}`}}/>
                    </IconButton>
                    {
                        item.bought ?
                            <IconButton onClick={handleDownload}>
                                <DownloadIcon fontSize="small"/>
                            </IconButton>
                            :
                            <IconButton onClick={handleAdd2Cart}>
                                <AddShoppingCartIcon fontSize="small" sx={{color: `${added ? '#ff0a54' : 'white'}`}}/>
                            </IconButton>
                    }
                </div>
                {
                    item.price !== 0 && <PriceTag price={item.price}/>
                }
            </Stack>
            {/*调试窗口*/}
           {/*<Debugger item={item} />*/}
        </Box>
    );
}

export default ItemCard;