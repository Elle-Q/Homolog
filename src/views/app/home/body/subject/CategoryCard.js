import React, {useState} from 'react';
import Card from "@mui/material/Card";
import {useTheme} from "@mui/system";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { Link } from "react-router-dom";
import {getStarIcons} from "../../../../../utils/ToolUtil";
import PriceTag from "../../../../../components/PriceTag";

function CategoryCard(props) {
    const theme = useTheme();
    const {width, item} = props;
    const [collected, setCollected] = useState(false);

    return (
        <Card sx={{
            width:{width},
            minWidth: 200,
            maxWidth: 360,
            boxShadow: 10,
            textShadow: 10,
            borderRadius: 3,
        }}>
            <Link to={`/app/item/${item.ID}`} key={item.ID}>
                <CardMedia
                    component="img"
                    height="300"
                    width="300"
                    image={item.Preview}
                    alt="Preview"
                    sx={{
                        boxShadow: 5,
                        borderRadius: 2,
                    }}
                />
            </Link>
            <Typography variant="h6" component="div"
                        color={theme.palette.secondary.light}
                        sx={{mt: '5px', ml: '15px'}}>
                {item.Name}
            </Typography>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <Typography variant="h7" component="div" color="text.fourth">
                {getStarIcons(item.Scores)}
            </Typography>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites" onClick={() => setCollected(!collected)}>
                    <FavoriteIcon sx={{color:`${collected ? 'red':'white'}`}}/>
                </IconButton>
                <IconButton aria-label="share" style={{marginRight:'100px'}}>
                    <ShareIcon/>
                </IconButton>
                <PriceTag height={36} price={item.Price}/>
            </CardActions>
        </Card>
    );
}

export default CategoryCard;