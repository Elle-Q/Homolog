import React, {useState} from 'react';
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
import {useNavigate} from "react-router-dom";
import {getInternalDaysFromNow} from "../../../../utils/DateUtil";
import {getOrderStatus} from "../../../../utils/ToolUtil";
import Logo28 from '../../../../assets/logo/logo_28.png'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import './issue-card.scss'

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
    const {issue} = props
    const navigate = useNavigate();
    const [expand, setExpand] = useState(false)

    const handleGoToIssue = (e) => {
        e.stopPropagation()
        navigate('/issue')
    }

    const handleExpand = (e) => {
        e.stopPropagation()
        setExpand(!expand)
    }

    return (
        <Grid container>
            <Grid item xs={1} style={{display: "flex", justifyContent: "end", padding: '10px'}}>
                <Avatar
                    sx={{width: '50px', height: '50px'}}
                    src={issue.userAvatar}
                />
            </Grid>
            <Grid item xs={11} style={{position: "relative"}}>
                <ColoredLabel color={getOrderStatus(issue.status).color} content={issue.status} style={{
                    fontWeight: 'bold',
                    fontSize: '14px',
                    right: 0,
                    top: 0,
                    position: "absolute",
                    padding: '3px 8px',
                    zIndex: 10,
                }}/>
                <Card onClick={handleGoToIssue} className="issue-card-container">
                    <i></i>
                    <Box sx={{display: 'flex', flexGrow: 1, flexDirection: 'column'}}>
                        <Typography className="issue-card-header" component="div" display="flex">
                            {issue.userName} {getInternalDaysFromNow(issue.createTime)}天前打开
                            <span style={{fontSize: '12px', color: '#00a896', margin: '0 10px'}}>#{issue.id}</span>
                            <img alt="logo_28" src={Logo28} style={{width: '15px', display: 'inline'}}/>
                        </Typography>
                        <Divider sx={{backgroundColor: '#403D39'}}/>
                        <CardContent sx={{flex: '1 0 auto', maxHeight: `${expand ? '' : '6.5em'}`, overflow: 'hidden'}}>
                            <Typography component="div" sx={{color: '#d2cfcb', fontSize: '22px', fontWeight: '600'}}>
                                {issue.title}
                            </Typography>
                            <pre style={{color: '#c0bbb4', fontSize: '14px', lineHeight: 1.5, padding: '0 10px'}}>
                                {issue.content}
                            </pre>
                        </CardContent>
                        <Box sx={{display: 'flex', pb: 1, mt: 1, ml: 1, zIndex: 10}}>
                            <IconLabel icon={<FavoriteBorderRoundedIcon className={classes.icon}/>}
                                       label={issue.collects}/>
                            <IconLabel icon={<ThumbUpOffAltIcon className={classes.icon}/>} label={issue.likes}/>
                            <IconLabel icon={<ThumbDownOffAltIcon className={classes.icon}/>} label={issue.hates}/>
                            <IconLabel icon={<ModeCommentOutlinedIcon className={classes.icon}/>}
                                       label={issue.comments}/>

                            {
                                expand ? <ExpandLessIcon onClick={handleExpand} fontSize="small"
                                                         sx={{color: '#fff', marginLeft: '10px'}}/>
                                    : <ExpandMoreIcon onClick={handleExpand} fontSize="small"
                                                      sx={{color: '#fff', marginLeft: '10px'}}/>
                            }
                        </Box>
                    </Box>
                    {/*<CardMedia
                        component="img"
                        sx={{
                            width: 110,
                            height: 100,
                            filter: 'grayscale(0%)',
                            mixBlendMode: 'exclusion',
                            marginRight: '10px',
                            '&:hover': {
                                filter: 'grayscale(100%)',
                            }
                        }}
                        src={Logo}
                    />*/}
                </Card>
            </Grid>
        </Grid>

    );
}

export default IssueCard;