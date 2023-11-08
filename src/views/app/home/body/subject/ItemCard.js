import React, {useState} from 'react';
import Card from "@mui/material/Card";
import {alpha, useTheme} from "@mui/system";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";
import PriceTag from "../../../../../components/PriceTag";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {addItem, openCart} from "../../../cart/cart-slice";
import {useDispatch} from "react-redux";

function ItemCard(props) {
    const theme = useTheme();
    const {width, item} = props;
    const [collected, setCollected] = useState(false);
    let dispatch = useDispatch();

    const handleAdd2Cart =() => {
        dispatch(openCart())
        dispatch(addItem(item))
    }

    return (
        <Card sx={{
            width:'25%',
            height:'550px',
            boxShadow: 5,
            textShadow: 10,
            borderRadius: 10,
            backgroundColor: alpha('#000', 0.4),
            '&:hover' : {
                transform: 'scale(1.03) translateY(-10px)',
                transition: 'all 100ms ease-in',
            }
        }}>

            <Link to={`/app/item/${item.ID}`} key={item.ID}>
                <CardMedia
                    component="img"
                    height="60%"
                    image={item.Main}
                    alt="Preview"
                    sx={{
                        boxShadow: 5,
                        borderRadius: 2,
                        '&:hover': {
                            filter:' brightness(110%)'
                        }
                    }}
                />
            </Link>

            <Typography variant="h6" component="div"
                        color={theme.palette.text.seventh}
                        sx={{mt: '5px', ml: '15px', fontWeight:"bold",height: '32px'}}>
                {item.Name}
            </Typography>
            <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{overflow: "hidden",height: '40px'}}>
                    {item.Desc}
                </Typography>
            </CardContent>
            <Typography component="div"  sx={{ml: '15px', fontSize: '12px', color:"#5b5756"}}>
                有255人觉得该资源很赞
            </Typography>
            <Typography component="div"  sx={{ml: '15px', fontSize: '12px', color:"#5b5756"}}>
                有50人发表了评测
            </Typography>
            <Typography component="div"  sx={{ml: '15px', fontSize: '12px', color:"#5b5756"}}>
                有550人下载了该资源
            </Typography>
            <CardActions disableSpacing sx={{display: 'flex'}}>
                <IconButton aria-label="add to favorites" onClick={() => setCollected(!collected)}>
                    <FavoriteIcon sx={{color:`${collected ? '#ff0a54':'white'}`}}/>
                </IconButton>
                <IconButton aria-label="buy" style={{marginRight:'50%'}}>
                    <ShoppingCartIcon onClick={handleAdd2Cart}/>
                </IconButton>
                <PriceTag height={24} price={item.Price}/>
            </CardActions>
        </Card>
    );
}

export default ItemCard;