import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CommentLabel from "./CommentLabel";
import comments from "../../json/comments.json"
import 'emoji-mart/css/emoji-mart.css'
import CommentInput from "../../common/comment-input";


function Comments(props) {

    //ref要传进去, CommentInput用forwardRef
    const commentRef = React.createRef();

    const handleCommentSend = () => {
        commentRef.current.value = "";
    }

    return (
        <Box
            sx={{
                width: '100%',
                borderRadius: '10px',
                zIndex: 1,
                padding: '10px',
                marginTop:'10px'
            }}
        >
            <Typography variant="body2" sx={{fontSize: '20px'}} color="text.fifth"> 56 评论</Typography>

            <CommentInput />

            {
                comments && comments.map((key, index) => (
                    <CommentLabel key={index} {...key}/>
                ))
            }
        </Box>
    );
}

export default Comments;