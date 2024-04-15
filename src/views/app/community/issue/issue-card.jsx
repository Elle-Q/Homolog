import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import {Divider, Fade, Grow} from "@mui/material";
import ColoredLabel from "../../../../components/ui/ColoredLabel";
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import {getInternalDaysFromNow} from "../../../../utils/DateUtil";
import {getOrderStatus} from "../../../../utils/ToolUtil";
import Logo28 from '../../../../assets/logo/logo_28.png'
import './issue-card.scss'
import {Modal} from "../../../../components/modal/modal";
import Markdown from "react-markdown";
import {CountComment} from "../../../../api/comment.service";
import Comment from "../../../../components/comment/comment";
import IconBadge from "../../../../components/button/icon-badge";

function IssueCard(props) {
    const {issue} = props
    const [showIssue, setShowIssue] = useState(false)
    const [showComment, setShowComment] = useState(false);
    const [commentsSize, setCommentsSize] = useState(0);

    useEffect(() => {
        if (!issue) return;
        CountComment("issue", issue.id).then(resp => {
            setCommentsSize(resp)
        })
    }, []);

    const handleShowComment = (e) => {
        e.stopPropagation();
        setShowComment(!showComment);
    }
    const handleShowIssue = (e) => {
        setShowIssue(!showIssue)
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
                        <IconBadge cnt={commentsSize}
                                   handleClick={handleShowComment}
                                   icon={<ModeCommentOutlinedIcon className="icon-badge__icon"/>}/>
                    </div>
                </Box>

                {
                    showComment && <Comment rescType="issue" rescId={issue.id}/>
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