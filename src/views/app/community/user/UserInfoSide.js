import React, {useEffect, useState} from 'react';
import Avatar from "@mui/material/Avatar";
import ColoredLabel from "../../../../components/ui/ColoredLabel";
import Typography from "@mui/material/Typography";
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import Button from "@mui/material/Button";
import {Divider} from "@mui/material";
import {makeStyles} from "@mui/styles";
import Box from "@mui/material/Box";
import medal01 from '../../../../assets/medals/01.svg'
import UserService from "../../../../api/user.service";

const useStyles = makeStyles({
    icon: {
        height: '20px',
        '&:hover': {
            color: '#3399ff',
        }
    },
    span: {
        fontSize: '12px',
        color: '#CCC5B9',
        marginRight: '10px',
        '&:hover': {
            color: '#3399ff',
        }
    }
});


function UserInfoSide(props) {
    const classes = useStyles()
    const [user, setUser] = useState({})

    useEffect(() => {
        setUser(UserService.getLocalUser)
    }, []);

    return (
        <React.Fragment>
            <div style={{position: "relative", height: '250px'}}>
                <Avatar alt="avatar"
                        src={user && user.avatar}
                        sx={{
                            width: 296,
                            height: 296,
                            position: "absolute",
                            border: '2px solid #252422',
                            boxShadow: '0 0 5px #403D39',
                            cursor: "pointer",
                            right: '10%',
                            top: -60,
                        }}
                />
                <ColoredLabel color='#3399FF' content={'🌈'} shape={'circle'}
                              style={{
                                  fontSize: '12px',
                                  left: '80%',
                                  top: 150,
                                  position: "absolute",
                                  padding: '5px',
                              }}/>
            </div>

            <div>
                <Typography component="div" variant="h4" sx={{color: 'white', fontWeight: "bold"}}>
                    {user.name}
                </Typography>
                <Typography component="div" variant="h6" sx={{color: '#8B949E'}}>
                    {user.moto}
                </Typography>
            </div>

            {/*<div styles={{marginTop: '30px', marginBottom: '30px'}}>
                <Button sx={{
                    borderRadius: '10px',
                    width: '100%',
                }}>
                    <ModeEditOutlineRoundedIcon sx={{color: 'white'}}/>
                </Button>

                <Box sx={{display: 'flex', pb: 1, alignItems: "end", marginTop: '10px', color: '#8B949E',}}>
                    <GroupRoundedIcon className={classes.icon}/>
                    <span className={classes.span}><strong>1</strong>粉丝</span>
                    <span className={classes.span}><strong>15</strong>关注</span>
                </Box>
            </div>*/}

            <Divider/>

            <div style={{marginTop: '30px', marginBottom: '30px'}}>
                <Typography component="div" sx={{color: '#8B949E', fontWeight: "bold", mb:'10px',fontSize: '18px'}}>
                    徽章
                </Typography>
                <img alt="icon" src={medal01} style={{width: '40px', height: '40px', marginLeft:'10px'}}/>
            </div>

            <Divider/>
        </React.Fragment>
    );
}

export default UserInfoSide;