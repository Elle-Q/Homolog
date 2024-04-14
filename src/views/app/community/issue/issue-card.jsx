import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import {Divider} from "@mui/material";
import ColoredLabel from "../../../../components/ui/ColoredLabel";
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import {makeStyles} from "@mui/styles";
import {getInternalDaysFromNow} from "../../../../utils/DateUtil";
import {getOrderStatus} from "../../../../utils/ToolUtil";
import Logo28 from '../../../../assets/logo/logo_28.png'
import './issue-card.scss'
import IconButton from "@mui/material/IconButton";
import {Modal} from "../../../../components/modal/modal";
import Markdown from "react-markdown";
import CommentInput from "../../item/comment/CommentInput";
import {AddComment, CountComment, ListComment} from "../../../../api/comment.service";

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
    const [showIssue, setShowIssue] = useState(false)
    const [showComment, setShowComment] = useState(false)
    const [comments, setComments] = useState([])
    const [commentsSize, setCommentsSize] = useState([])

    useEffect(() => {
        CountComment('issue', issue.id).then(resp => {
            setCommentsSize(resp)
        })
    }, []);

    const handleShowIssue = (e) => {
        setShowIssue(!showIssue)
    }

    const handleShowComment = (e) => {
        e.stopPropagation();
        setShowComment(!showComment);
        ListComment('issue', issue.id).then(resp => {
            setComments(resp)
        })
    }

    const handleSendComment = (content) => {
        let params = {
            rescType: 'issue',
            rescId: issue.id,
            content: content,
        }
        AddComment(params);
        setShowComment(false);
    }


    return (
        <Grid container>
            <Grid item xs={1} className="issue-card__avatar-box">
                <Avatar className="issue-card__avatar" src={issue.userAvatar}/>
            </Grid>
            <Grid item xs={11} className="issue-card__body">
                <ColoredLabel color={getOrderStatus(issue.status).color}
                              content={issue.status}
                              className="issue-card__body--fixed-label"/>

                <Box className="issue-card__body--main" onClick={handleShowIssue}>
                    <Typography className="issue-card__heading" component="div" display="flex">
                        {issue.userName} {getInternalDaysFromNow(issue.createTime)}天前打开
                        <span>#{issue.id}</span>
                        <img alt="logo_28" src={Logo28}/>
                    </Typography>
                    <Divider variant="middle"/>
                    <CardContent className="issue-card__content">
                        <h2> {issue.title} </h2>
                        <pre>{issue.content} </pre>
                    </CardContent>
                    <div className="issue-card__footer">
                        <IconButton className="issue-card__footer-icon" onClick={handleShowComment}>
                            <ModeCommentOutlinedIcon className={classes.icon}/>
                            {
                                commentsSize > 0 &&
                                <div className="issue-card__footer-icon--badge">{commentsSize}</div>
                            }
                        </IconButton>
                    </div>
                </Box>
                {
                    showComment && <React.Fragment>
                        <CommentInput handleSend={handleSendComment}/>
                        {comments.map((comment, _) => (
                            <div className="issue-card__comment">
                                <Avatar className="issue-card__comment-avatar" src={comment.userAvatar}/>
                                <p className="issue-card__comment-name">{comment.userName}: &nbsp;</p>
                                <span className="issue-card__comment-content">{comment.content}</span>
                                <p>{comment.createTime}</p>
                            </div>
                        ))}
                    </React.Fragment>
                }
            </Grid>
            <Modal
                maxWidth="md"
                open={showIssue}
                handleClose={handleShowIssue}
                actions={false}>
                <Markdown children={issue.content} className="issue-card__md"/>
            </Modal>
        </Grid>

    );
}

export default IssueCard;