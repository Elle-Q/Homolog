import React, {createRef, useEffect} from 'react';
import Avatar from "@mui/material/Avatar";
import {alpha, styled} from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import {UserStatus} from "../../../../utils/constant/constant";
import MenuItem from "@mui/material/MenuItem";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import FormControl from "@mui/material/FormControl";
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {CustomBadge} from "../../../../components/ui/CustomBadge";
import {CancelButton, OKButton} from "../../../../components/ui/CustomButton";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import IconButton from "@mui/material/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "../../../../api/user.service";
import {getColorFromUserStatus} from "../../../../utils/ToolUtil";
import {StyledInputElement} from "../../../../components/ui/CustomInput";

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
            borderColor: '#403D39',
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
    const {user} = props;
    const {toggleDrawer} = props;
    const dispatch = useDispatch();
    const [userDetail, setUserDetail] = React.useState(user);
    const nameRef = React.createRef();
    const phoneRef = React.createRef();
    const motoRef = React.createRef();

    useEffect(() => {
        user && setUserDetail(user)
    }, [user])

    const handleGenderChange = (event) => {
        setUserDetail({
            ...userDetail,
            Gender: event.target.value
        })
    };

    const handleUserStatusChange = (event) => {
        setUserDetail({
            ...userDetail,
            Status: event.target.value
        })
    };

    const handleSave = () => {
        dispatch(updateUser({
            ...userDetail,
            Name: nameRef.current.value,
            Phone: phoneRef.current.value,
            Moto:motoRef.current.value,
        }))
        //关闭侧边栏
        toggleDrawer(false)()
    }

    const GenderRadio = () => (
        <FormControl component="fieldset" style={{marginLeft: '10px', marginTop: '20px'}}>
            <FormLabel component="legend" style={{marginBottom: '10px', color: '#403D39'}}>Gender</FormLabel>
            <RadioGroup
                aria-label="gender"
                name="controlled-radio-buttons-group"
                value={userDetail.Gender}
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
                                  label={<FemaleIcon sx={{color: '#ff7096', mr: '10px'}}/>}/>
                <FormControlLabel value="male" control={<Radio sx={radioStyle}/>}
                                  label={<MaleIcon sx={{color: '#3399ff'}}/>}/>
            </RadioGroup>
        </FormControl>
    )


    return (
        <div style={{padding: '20px'}}>
            <CustomBadge
                overlap="circular"
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                variant="dot"
                sx={{
                    mb: '10px',
                    '& .MuiBadge-badge': {
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: getColorFromUserStatus(userDetail.Status),
                        color: getColorFromUserStatus(userDetail.Status),
                        boxShadow: `0 0 0 3px #000`,
                    }
                }}
            >
                <Avatar alt="elle" src={userDetail.Avatar}
                        sx={{
                            width: 120,
                            height: 120,
                            ml: '50px',
                        }}/>
            </CustomBadge>

            <StyledInputElement
                style={{
                    display: 'flex',
                    border: "none",
                    color: '#3399ff',
                    fontSize:'12px',
                    padding:'5px',
                    fontStyle: 'italic'
                }}
                defaultValue={userDetail && userDetail.Moto && userDetail.Moto}
                placeholder={(userDetail && userDetail.Moto==='') && '展示一下你丑陋模样吧...'}
                ref={motoRef}
            >
                </StyledInputElement>
            <CusInput label="昵称" inputRef={nameRef} defaultValue={userDetail.Name} inputProps={inputProps}/>
            <CusInput label="手机号" inputRef={phoneRef} defaultValue={userDetail.Phone} inputProps={inputProps}/>
            <GenderRadio/>
            <div style={{marginTop: '30px', color: '#403D39'}}>
                <span style={{marginLeft: '10px', color: '#403D39', display: 'block'}}>背景图片</span>
                <img alt="sm_bg" src={userDetail && userDetail.BgImag} style={{width: '150px', margin: '10px 10px 0 10px',}}/>
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
                label="状态"
                value={userDetail.Status}
                inputProps={inputProps}
                onChange={handleUserStatusChange}
            >
                {Object.keys(UserStatus).map((value, index) => (
                    <CusMenuItem key={index} value={value}>
                        {UserStatus[value]}
                    </CusMenuItem>
                ))}
            </CusInput>

            <div style={{marginTop: '30px', padding: '20px'}}>
                <CancelButton/>
                <OKButton handleClick={handleSave}/>
            </div>

        </div>
    );
}

export default Modal;
