import React, {useState} from 'react';
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {Link} from "react-router-dom";
import PriceTag from "../PriceTag";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {addItem, openCart} from "../../views/app/cart/cart-slice";
import {useDispatch} from "react-redux";
import "../../views/app/home/body/subject/subject.scss"
import Stack from "@mui/material/Stack";
import './index.scss'
import DownloadIcon from '@mui/icons-material/Download';

function ItemCard(props) {
    const {item} = props;
    const [collected, setCollected] = useState(false);
    const [added, setAdded] = useState(false);
    let dispatch = useDispatch();

    const handleAdd2Cart = () => {
        setAdded(!added)
        dispatch(openCart())
        dispatch(addItem(item))
    }

    //点击下载源文件
    const handleDownload = () => {
        window.location.href = item.attachment.link
    }

    const getClass = () => {
        if (item.type === 'hdri') {
            return 'hdri-container'
        } else if (item.type === 'doc') {
            return 'doc-container'
        } else if (item.type === 'model') {
            return 'model-container'
        } else {
            return 'normal-container'
        }
    }

    return (
        <div className="item-card">
            <Link to={`/item/${item.id}`} key={item.id}>
                <div className={getClass()}>
                    <img src={item.main && item.main.link} alt="item"/>
                </div>
            </Link>

            <span> {item.name}</span>
            <Stack direction="row" sx={{justifyContent: 'center', alignItems: 'center'}}>
                <IconButton onClick={() => setCollected(!collected)}>
                    <FavoriteIcon fontSize="small" sx={{color: `${collected ? '#ff0a54' : 'white'}`}}/>
                </IconButton>
                <IconButton aria-label="buy" style={{marginRight: '40%'}}>
                    {
                        item.price === 0 ? <DownloadIcon fontSize="small" onClick={handleDownload}/>
                            :
                            <AddShoppingCartIcon fontSize="small" onClick={handleAdd2Cart}
                                                 sx={{color: `${added ? '#ff0a54' : 'white'}`}}/>
                    }

                </IconButton>
                <PriceTag price={item.price}/>
            </Stack>
        </div>
    );
}

export default ItemCard;