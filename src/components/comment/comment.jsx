import React, {useEffect, useState} from 'react';
import CommentInput from "../../views/app/item/comment/CommentInput";
import Avatar from "@mui/material/Avatar";
import {AddComment, CountComment, ListComment} from "../../api/comment.service";
import "./comment.scss"
import IconBadge from "../button/icon-badge";
import UserService from "../../api/user.service";

function Comment(props) {
    const {resctype, rescid} = props
    const [comments, setComments] = useState([]);

    useEffect(() => {
        ListComment(resctype, rescid).then(resp => {
            setComments(resp)
        })
    }, []);

    const handleSendComment = (content) => {
        let params = {
            rescType: resctype,
            rescId: rescid,
            content: content,
        }

        AddComment(params);
        let localUser = UserService.getLocalUser();
        setComments([...comments, {
            userAvatar: localUser.avatar,
            userName: localUser.name,
            content: content,
        }])
    }

    return (
        <div className="comment fadein" {...props}>
            <CommentInput handleSend={handleSendComment}/>
            {comments.map((comment, _) => (
                <div className="comment__user-box" key={comment.id}>
                    <div className="comment__user">
                        <Avatar className="comment__user-avatar" src={comment.userAvatar}/>
                        <p className="comment__user-name">{comment.userName}: &nbsp;</p>
                        <span className="comment__user-content">{comment.content}</span>
                    </div>
                    <p className="comment__user-time">{comment.createTime}</p>
                </div>
            ))}
        </div>
    );
}

export default Comment;