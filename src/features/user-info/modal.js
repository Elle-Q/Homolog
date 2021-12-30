import React from 'react';
import Avatar from "@mui/material/Avatar";
import {alpha, styled} from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import {CatStatus, Gender, UserStatus} from "../../common/constant/constant";
import MenuItem from "@mui/material/MenuItem";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import FormControl from "@mui/material/FormControl";
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {StyledBadge} from "../../common/StyledBadge";
import {CancelButton, SaveButton} from "../../common/CustomButton";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import IconButton from "@mui/material/IconButton";
import bg from '../../assets/bg/bg2.jpg'

const CusInput = styled(TextField)({
    display: "flex",
    marginTop: '40px',
    '& .MuiInputLabel-root': {
        fontSize: '20px',
        color: '#403D39',
    },

    '& .MuiInputLabel-root.Mui-focused': {
        color: '#EB5E28',
    },

    '& .MuiSelect-select': {
        color: '#CCC5B9',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#252422',
            fontSize: '15px'
        },
        '&:hover fieldset': {
            borderColor: '#EB5E28',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#EB5E28',
            // color:'#EB5E28'
        },
    },
});

const CusMenuItem = styled(MenuItem)({
    color: '#CCC5B9',

});

const inputProps = {
    min: 0,
    style: {
        textAlign: 'center',
        color: '#CCC5B9'
    }
}

const radioStyle = {
    '& .MuiSvgIcon-root': {
        fontSize: 17,
    }
}

function Modal(props) {

    const [gender, setGender] = React.useState('female');
    const [userStatus, setUserStatus] = React.useState('online');

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleUserStatusChange = (event) => {
        setUserStatus(event.target.value);
    };


    function getColorFromUserStatus() {
        switch (userStatus) {
            case 'online':
                return '#44b700'
            case 'offline':
                return '#252422'
            case 'busy':
                return '#FF0000'
        }
    }

    const GenderRadio = () => (
        <FormControl component="fieldset" style={{marginLeft: '10px', marginTop: '20px'}}>
            <FormLabel component="legend" style={{marginBottom: '10px', color: '#403D39'}}>Gender</FormLabel>
            <RadioGroup
                aria-label="gender"
                name="controlled-radio-buttons-group"
                value={gender}
                onChange={handleGenderChange}
                row={true}
                sx={{
                    textAlign: "center",
                    ml: '35px',
                    '& .MuiRadio-root.Mui-checked': {
                        color: 'white',
                    }
                }}
            >
                <FormControlLabel value="female" control={<Radio sx={radioStyle}/>}
                                  label={<FemaleIcon sx={{color: '#ff7096'}}/>}/>
                <FormControlLabel value="male" control={<Radio sx={radioStyle}/>}
                                  label={<MaleIcon sx={{color: '#3399ff'}}/>}/>
            </RadioGroup>
        </FormControl>
    )


    return (
        <div style={{padding: '20px'}}>
            <StyledBadge
                overlap="circular"
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                variant="dot"
                sx={{
                    '& .MuiBadge-badge': {
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: getColorFromUserStatus(),
                        color: getColorFromUserStatus(),
                        boxShadow: `0 0 0 3px #000`,
                    }
                }}
            >
                <Avatar alt="elle" src="/avatar/avatar1.jpg"
                        sx={{
                            width: 120,
                            height: 120,
                            ml: '50px'
                        }}/>
            </StyledBadge>

            <CusInput label="昵称" defaultValue="Elle Qu" inputProps={inputProps}/>
            <CusInput label="手机号" defaultValue="19542813042" inputProps={inputProps}/>
            <GenderRadio/>
            <div style={{marginTop: '30px', color: '#403D39'}}>
                <span style={{marginLeft: '10px', color: '#403D39', display:'block'}}>背景图片</span>
                <img alt="sm_bg" src={bg} style={{width:'150px', margin: '10px 10px 0 10px',}}/>
                <IconButton
                    sx={{
                        color: alpha('#dcddde', 0.5),
                        marginBottom: '20px'
                    }}>
                    <ChangeCircleIcon fontSize="large"/>
                </IconButton>
            </div>
            <CusInput
                select
                label="状态 (即时生效)"
                value={userStatus}
                inputProps={inputProps}
                onChange={handleUserStatusChange}
            >
                {Object.keys(UserStatus).map((value, index) => (
                    <CusMenuItem key={index} value={value}>
                        {UserStatus[value]}
                    </CusMenuItem>
                ))}
            </CusInput>

            <div style={{marginTop:'30px', padding:'20px'}}>
                <CancelButton/>
                <SaveButton/>
            </div>

        </div>
    );
}

export default Modal;