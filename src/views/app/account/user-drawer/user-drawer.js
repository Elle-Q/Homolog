import React, {useEffect} from 'react';
import {alpha} from "@mui/material/styles";
import {Drawer, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import {UserStatus} from "../../../../constant/constant";
import FormControl from "@mui/material/FormControl";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import MenuItem from "@mui/material/MenuItem";
import UserService from "../../../../api/user.service";
import AvatarBadge from "../../../../components/avatar-badge/avatar-badge";
import {CancelButton, OKButton} from "../../../../components/button/text-button";
import {FlexCenter} from "../../../../components/center/center";
import "../account.scss"
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";

function UserDrawer(props) {
    const {toggleDrawer, open, user} = props;
    const [userDetail, setUserDetail] = React.useState();
    const nameRef = React.createRef();
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
        <FormControl component="fieldset" className="mt-3">
            <FormLabel component="legend" className="user-drawer__gender-label">性别: </FormLabel>
            <RadioGroup
                value={userDetail.gender}
                onChange={handleGenderChange}
                row={true}
                className="user-drawer__gender-radio-box"
            >
                <FormControlLabel value="1" control={<Radio/>}
                                  label={<FemaleIcon sx={{color: '#ff7096', mr: '10px'}}/>}/>
                <FormControlLabel value="0" control={<Radio/>}
                                  label={<MaleIcon sx={{color: '#3399ff'}}/>}/>
            </RadioGroup>
        </FormControl>
    )

    if (userDetail == null) return (<React.Fragment/>)
    return (
        <Drawer PaperProps={{sx: {backgroundColor: alpha('#0f141a', 0.95)}}}
                open={open}
                onClose={toggleDrawer(false)}
                onClick={(event) => event.stopPropagation()}
        >
            <div className="user-drawer">
                <FlexCenter>
                    <AvatarBadge user={userDetail} size={{width: 12, height: 12}}/>
                </FlexCenter>
                <textarea className="user-drawer__textarea"
                          defaultValue={userDetail.moto}
                          placeholder={(userDetail.moto === '') && '展示一下你丑陋模样吧...'}
                          ref={motoRef}>
                </textarea>
                <div className="user-drawer__input-box">
                    <span>姓名: </span>
                    <Input className="user-drawer__input" inputRef={nameRef}
                           defaultValue={userDetail.name}/>
                </div>
                <div className="user-drawer__input-box">
                    <span>手机: </span>
                    <Input className="user-drawer__input"
                           disabled={true}
                           defaultValue={userDetail.phone}/>
                </div>
                <GenderRadio/>
                <div className="user-drawer__bg-box mt-3">
                    <span>背景图片: </span>
                    <img alt="sm_bg" src={userDetail && userDetail.bgImg}/>
                    <IconButton className="user-drawer__bg-box__btn">
                        <ChangeCircleIcon fontSize="large"/>
                    </IconButton>
                </div>
                <TextField
                    className="user-drawer__input"
                    select
                    label="状态"
                    value={userDetail.status}
                    onChange={handleUserStatusChange}
                >
                    {Object.keys(UserStatus).map((value, index) => (
                        <MenuItem key={index} value={value}>
                            {UserStatus[value]}
                        </MenuItem>
                    ))}
                </TextField>

                <div className="mt-3 user-drawer__btn-box">
                    <OKButton handleClick={handleSave}>修改</OKButton>
                    <CancelButton handleClick={(event) => toggleDrawer(false)(event)}>关闭</CancelButton>
                </div>

            </div>
        </Drawer>
    );

}

export default UserDrawer;