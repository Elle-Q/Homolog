import React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import {Divider} from "@mui/material";
import ColoredLabel from "../../../../components/ui/ColoredLabel";
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import {makeStyles} from "@mui/styles";
import {Link} from "react-router-dom";

const IconLabel = ({icon, label}) => {
    return (
        <React.Fragment>
            {icon}
            <span style={{fontSize: '12px', fontStyle: 'italic', color: '#CCC5B9', marginRight: '10px'}}>{label}</span>
        </React.Fragment>
    )
}
const useStyles = makeStyles({
    icon: {
        width: '20px',
        height: '16px',
        color: 'white',
        '&:hover': {
            color: '#3399ff',
        }
    }
});

function IssueCard(props) {
    const classes = useStyles()
    const {item} = props

    return (
        <Grid container>
            <Grid item xs={1} style={{display: "flex", justifyContent: "end", padding: '10px'}}>
                <Avatar
                    sx={{width: '50px', height: '50px'}}
                    src={item.UserAvatar}
                />
            </Grid>
            <Grid item xs={11} style={{position: "relative"}}>
                <ColoredLabel color={item.Color} content={item.Status} style={{
                    fontWeight: 'bold',
                    fontSize: '9px',
                    right: -10,
                    top: -10,
                    position: "absolute",
                    padding: '3px 5px',
                    zIndex: 10,

                }}/>
                <Card sx={{
                    display: 'flex',
                    justifyContent: "end",
                    backgroundColor: "transparent",
                    cursor: "pointer"
                }}>
                    <Box sx={{display: 'flex', flexGrow: 1, flexDirection: 'column'}}>

                        <Typography component="div"
                                    sx={{color: 'gray', fontSize: '12px', letterSpacing: '1px', m: '5px 0 5px 20px'}}>
                            {item.UserName} 23天前打开
                        </Typography>
                        <Divider/>
                        <CardContent sx={{flex: '1 0 auto'}}>
                            <Typography component="div" sx={{color: 'white', fontSize: '18px',fontWeight: "bold"}}>
                                {item.Title}
                            </Typography>
                            <Typography  component="div" sx={{color: 'text.fifth', fontSize: '16px'}}>
                                {item.Content}
                            </Typography>
                        </CardContent>
                        <Box sx={{display: 'flex', pb: 1}}>
                            <IconLabel icon={<FavoriteBorderRoundedIcon className={classes.icon}/>}
                                       label={item.Collects}/>
                            <IconLabel icon={<ThumbUpOffAltIcon className={classes.icon}/>} label={item.Likes}/>
                            <IconLabel icon={<ThumbDownOffAltIcon className={classes.icon}/>} label={item.Hates}/>
                            <IconLabel icon={<ModeCommentOutlinedIcon className={classes.icon}/>}
                                       label={item.Comments}/>
                            <span style={{fontSize: '12px', color: '#00a896'}}>#{item.ID}</span>
                        </Box>
                    </Box>
                    {/*//todo: 怎么从富文本中提取图片*/}
                    <Link to='/app/issue'>
                        <CardMedia
                            component="img"
                            sx={{
                                width: 151,
                                borderRadius: '15px',
                                filter: 'grayscale(100%)',
                                mixBlendMode: 'exclusion',
                                '&:hover': {
                                    filter: 'grayscale(0%)',
                                }
                            }}
                            image="/animation4.jpg"
                        />
                    </Link>
                </Card>
            </Grid>
        </Grid>

    );
}

export default IssueCard;