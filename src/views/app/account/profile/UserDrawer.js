import React, {useEffect} from 'react';
import {alpha, styled} from "@mui/material/styles";
import {Drawer, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {CustomBadge} from "../../../../components/ui/CustomBadge";
import {getColorFromUserStatus} from "../../../../utils/ToolUtil";
import Avatar from "@mui/material/Avatar";
import {StyledInputElement} from "../../../../components/ui/CustomInput";
import IconButton from "@mui/material/IconButton";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import {UserStatus} from "../../../../utils/constant/constant";
import {CancelButton, OKButton} from "../../../../components/ui/CustomButton";
import FormControl from "@mui/material/FormControl";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import UserService from "../../../../api/user.service";

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

function UserDrawer(props) {
    const {toggleDrawer, open, user} = props;
    const [userDetail, setUserDetail] = React.useState();
    const nameRef = React.createRef();
    const phoneRef = React.createRef();
    const motoRef = React.createRef();

    useEffect(() => {
        setUserDetail(user)
    }, [user]);

    const handleGenderChange = (event) => {
        setUserDetail({
            ...userDetail,
            gender: event.target.value
        })
    };

    const handleUserStatusChange = (event) => {
        setUserDetail({
            ...userDetail,
            status: event.target.value
        })
    };

    const handleSave = (event) => {
        let user = {
            ...userDetail,
            name: nameRef.current.value,
            phone: phoneRef.current.value,
            moto: motoRef.current.value,
        }
        UserService.update(user).then(
            () => {
                //关闭侧边栏
                toggleDrawer(false)(event)
            }
        )

    }

    const GenderRadio = () => (
        <FormControl component="fieldset" style={{marginLeft: '10px', marginTop: '20px'}}>
            <FormLabel component="legend" style={{marginBottom: '10px', color: '#403D39'}}>性别</FormLabel>
            <RadioGroup
                value={userDetail.gender}
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

    if (userDetail==null) return (<React.Fragment />)
    return (
        <Drawer PaperProps={{sx: {backgroundColor: alpha('#252422', 0.9)}}}
                open={open}
                onClose={toggleDrawer(false)}
                onClick={(event) => event.stopPropagation()}
        >
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
                            backgroundColor: getColorFromUserStatus(userDetail.status),
                            color: getColorFromUserStatus(userDetail.status),
                            boxShadow: `0 0 0 3px #000`,
                        }
                    }}
                >
                    <Avatar alt="avatar" src={userDetail.avatar}
                            sx={{
                                width: 120,
                                height: 120,
                                ml: '50px',
                            }}/>
                </CustomBadge>

                <StyledInputElement
                    style={{
                        display: 'flex',
                        fontSize: '12px',
                        fontStyle: 'italic'
                    }}
                    defaultValue={userDetail.moto}
                    placeholder={(userDetail.moto === '') && '展示一下你丑陋模样吧...'}
                    ref={motoRef}
                >
                </StyledInputElement>
                <CusInput label="昵称" inputRef={nameRef} defaultValue={userDetail.name} inputProps={inputProps}/>
                <CusInput label="手机号" inputRef={phoneRef} defaultValue={userDetail.phone} inputProps={inputProps}/>
                <GenderRadio/>
                <div style={{marginTop: '30px', color: '#403D39'}}>
                    <span style={{marginLeft: '10px', color: '#403D39', display: 'block'}}>背景图片</span>
                    <img alt="sm_bg" src={userDetail && userDetail.bgImg} style={{width: '150px', margin: '10px 10px 0 10px',}}/>
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
                    value={userDetail.status}
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
                    <CancelButton handleClick={(event) => toggleDrawer(false)(event)}/>
                    <OKButton handleClick={handleSave}/>
                </div>

            </div>
        </Drawer>
    );

}

export default UserDrawer;