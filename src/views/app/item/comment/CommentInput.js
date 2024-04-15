import React, {useState} from 'react';
import {alpha, styled} from "@mui/system";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import {StyledInputElement} from "../../../../components/ui/CustomInput";
import SendIcon from '@mui/icons-material/Send';
import IconButton from "@mui/material/IconButton";

const InputBox = styled('div')(({theme}) => ({
    display: 'flex',
    justifyContent: "space-between",
    flexDirection: 'column',
    zIndex: 1,
    borderRadius: '1rem 1rem  0 0 ',
    backgroundColor: '#0A1929',
    width: '100%',
    minHeight: '5rem',
    padding: '0 1rem',
    background: alpha('#0a0908', 0.7),
    '&:hover': {
        backgroundColor: alpha('#0a0908', 0.9),
    },
    '&:focus': {
        outline: 'none',
        transition: 'width 200ms ease-out'
    }
}));


function CommentInput(props) {
    const {handleSend} = props;
    const [showPicker, setShowPicker] = useState(false);
    const [comment, setComment] = useState("")

    const handleSelectEmoji = (e) => {
        setComment(comment + e.native)
    }

    const handleSendComment = () => {
        if (comment.trim().length == 0) return;
        handleSend(comment);
    }

    return (
        <div style={{position: 'relative'}} onClick={(e) => e.stopPropagation()}>
            <InputBox>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                    <IconButton onClick={handleSendComment}>
                        <SendIcon fontSize="large" sx={{zIndex: 99, color: '#ffffff'}}></SendIcon>
                    </IconButton>
                    <InsertEmoticonIcon
                        fontSize="large"
                        sx={{zIndex: 99, color: '#595DFD'}}
                        onClick={() => setShowPicker(true)}/>
                </div>
                <StyledInputElement placeholder='Be Nice, Man'
                                    onClick={() => setShowPicker(false)}
                                    value={comment}
                                    onChange={(event) => setComment(event.target.value)}
                />
            </InputBox>
            {
                showPicker &&
                <div style={{
                    position: 'absolute',
                    zIndex: 999,
                    left: '3rem',
                    top: '0',
                }}>
                    <Picker data={data} onEmojiSelect={handleSelectEmoji}/>
                </div>
            }
        </div>
    );

}

export default CommentInput;