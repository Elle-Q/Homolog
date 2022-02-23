import React from 'react';
import TextField from "@mui/material/TextField";
import {alpha, styled} from '@mui/material/styles';
import MaximizeRoundedIcon from '@mui/icons-material/MaximizeRounded';

const CssTextField = styled(TextField)({

    '& .MuiInputLabel-root': {
        fontSize: '15px',
        color: '#CCC5B9',
    },
    '& label.Mui-focused': {
        color: '#3399ff',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#CCC5B9',
    },
    '& .MuiOutlinedInput-root ': {
        width: 90,
        height: 40,
        '& fieldset': {
            borderColor: '#CCC5B9',
        },
        '&:hover fieldset': {
            borderColor: '#3399ff',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#3399ff',
        },
    },
});

function PriceFilter(props) {
    return (
        <div>
            <h4 style={{color: '#CCC5B9', marginTop: '20px'}}> 价格 </h4>
            <CssTextField label="最低" id="custom-css-outlined-input"/>
            <MaximizeRoundedIcon sx={{color: '#CCC5B9'}}/>
            {/*<Box style={{height:'1px', width:'20px', backgroundColor:'red' }} />*/}
            <CssTextField label="最高" id="custom-css-outlined-input"/>
        </div>
    );
}

export default PriceFilter;