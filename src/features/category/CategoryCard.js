import React from 'react';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import red from "@mui/material/colors/red";
import {useTheme} from "@mui/system";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import Link from "@mui/material/Link";

function CategoryCard(props) {
    const theme = useTheme();
    const {name, imgSrc, score} = props;

    const getStarIcons = () => {
        const stars = [];
        const scoreInt = Math.floor(score);
        for (let i = 0; i < scoreInt; i++) {
            stars.push(<StarRateRoundedIcon key={i}/>)
        }
        if (score % scoreInt !== 0) {
            stars.push(<StarHalfRoundedIcon/>)
        }
        return stars;
    }

    return (
        <Card sx={{
            maxWidth: 345,
            boxShadow: 10,
            textShadow: 10,
            borderRadius: 3,
            // backgroundColor: 'primary.main',
        }}>
            <Link href="http://www.google.com" target="_blank">
                <CardMedia
                    component="img"
                    height="300"
                    width="300"
                    image={imgSrc}
                    alt={name}
                    sx={{
                        boxShadow: 5,
                        borderRadius: 2,
                    }}
                />
            </Link>
            <Typography variant="h6" component="div"
                        color={theme.palette.secondary.light}
                        sx={{mt: '5px', ml: '15px'}}>
                {name}
            </Typography>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <Typography variant="h7" component="div" color="text.fourth">
                {getStarIcons()}
            </Typography>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon/>
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon/>
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default CategoryCard;