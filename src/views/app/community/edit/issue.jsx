import React, {useRef, useState} from 'react';
import ReactQuill from 'react-quill';
import Box from "@mui/material/Box";
import {makeStyles} from "@mui/styles";
import {alpha} from "@mui/system";
import {StyledSingleInputElement} from "../../../../components/ui/CustomInput";
import 'react-quill/dist/quill.snow.css';

const useStyles = makeStyles({
    quill: {
        width: '100%',
        color: 'white',
        textAlign: "center",
        '& > .ql-toolbar.ql-snow': {
            backgroundColor: '#252422 ',
            border: "1px solid #30363d",
            borderRadius: 0,
            borderBottom: 'none',
            borderTop: 'none',
        },
        '& > .ql-container.ql-snow': {
            backgroundColor: alpha('#1c1c1c', 1),
            border: "1px solid #30363d",
            borderRadius: '0 0 10px 10px',
        },
        '& .ql-editor': {
            height: '800px'
        },
    }
});


function Issue(props) {
    const [value, setValue] = useState('');
    const classes = useStyles()

    const modules = {
        toolbar: [
            [{'header': [1, 2, false]}],
            [{'color': []}, {'background': []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ],
        history: {          // Enable with custom configurations
            'delay': 2500,
            'userOnly': true
        },
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'color', 'background'
    ]

    return (
        <Box sx={{
            width: '60%',
            ml: '20%',
            mr: '20%',
            borderRadius: '10px',
            backgroundColor: "transparent",
            mt: '40px',
        }}>
            <StyledSingleInputElement
                style={{
                    backgroundColor: alpha('#1c1c1c', 1),
                    width: '100%',
                    border: "1px solid #30363d",
                    borderRadius: '10px 10px 0 0',
                    borderBottom: "none",
                    color: 'white',
                    fontSize: '20px',
                    padding: '10px',
                    verticalAlign: 'center'
                }}
                placeholder='标题'
            >
            </StyledSingleInputElement>
            <ReactQuill
                className={classes.quill}
                theme="snow"
                modules={modules}
                formats={formats}
                value={value}
                onChange={setValue}
            >
            </ReactQuill>
        </Box>
    );
}

export default Issue;