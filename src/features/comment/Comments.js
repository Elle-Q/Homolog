import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CommentLabel from "./CommentLabel";
import comments from "../../json/comments.json"
import {alpha, styled} from "@mui/system";
import 'emoji-mart/css/emoji-mart.css'
import {Picker} from 'emoji-mart'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

const InputBox = styled('div')(({theme}) => ({
    zIndex: 1,
    position:'relative',
    padding:'10px 0 10px 10px',
    borderRadius: '10px',
    backgroundColor: '#0A1929',
    width: '100%',
    height: '100px',
    justifyContent: "flex-end",
    background: alpha(theme.palette.background.paper, 0.5),
    [theme.breakpoints.up('sm')]: {
        marginRight: theme.spacing(5),
    },
    '&:hover': {
        backgroundColor: alpha(theme.palette.background.paper, 0.7),
    },
    '&:focus': {
        outline: 'none',
        transition: 'width 200ms ease-out'
    }
}));

const StyledInputElement = styled('textarea')(({theme}) => ({
    resize: 'none',
    width: '95%',
    height: '100%',
    fontSize: '1rem',
    fontFamily: 'IBM Plex Sans, sans-serif',
    backgroundColor:'transparent',
    border: 'none',
    padding: '6px 10px',
    color: '#3399FF',
    transition: 'width 300ms ease',
    '&:hover': {
        backgroundColor: 'transparent',
    },
    '&:focus': {
        outline: 'none',
        transition: 'width 200ms ease-out'
    }
}));


function Comments(props) {

    const danmuRef = React.createRef();
    const [text, setText] = useState("");
    const [showPicker, setShowPicker] = useState(false);

    const handleCommentSend = () => {
        danmuRef.current.value = "";
    }

    function handleOnEnter(text) {
        console.log("enter", text);
    }

    return (
        <Box
            sx={{
                width: '100%',
                borderRadius: '10px',
                zIndex: 1,
                padding: '10px',
            }}
        >
            <Typography variant="body2" sx={{fontSize: '20px'}} color="text.fifth"> 56 评论</Typography>

            <InputBox>
                {
                    showPicker ?
                        <Picker
                            style={{
                                position:'absolute',
                                zIndex:99,
                                left:'400px',
                                top:'20px',
                            }}
                            set='apple'
                            showPreview={false}
                            showSkinTones={false}
                            color='#3399FF'
                            emojiSize={20}
                            theme='dark'
                        /> : <div/>
                }
                <StyledInputElement onClick={() => setShowPicker(false)} placeholder='Be Nice, Man'/>

                <InsertEmoticonIcon sx={{zIndex:99, color:'#e9c46a'}} onClick={() => setShowPicker(true)}/>

            </InputBox>

            {
                comments && comments.map((key, index) => (
                    <CommentLabel key={index} {...key}/>
                ))
            }
        </Box>
    );
}

export default Comments;