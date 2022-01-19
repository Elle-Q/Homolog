import React, {useState} from 'react';
import {alpha, styled} from "@mui/system";
import {Picker} from "emoji-mart";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import {StyledInputElement} from "./custom-input";

const InputBox = styled('div')(({theme}) => ({
    zIndex: 1,
    position:'relative',
    padding:'10px 0 10px 10px',
    borderRadius: '10px',
    backgroundColor: '#0A1929',
    width: '100%',
    marginTop:'10px',
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


function CommentInput(props) {

    const [showPicker, setShowPicker] = useState(false);

    return (
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
            <StyledInputElement
                onClick={() => setShowPicker(false)}
                placeholder='Be Nice, Man'
                style={{
                    height: '100%',
                }}
            />

            <InsertEmoticonIcon sx={{zIndex:99, color:'#e9c46a'}} onClick={() => setShowPicker(true)}/>

        </InputBox>
    );
}

export default CommentInput;