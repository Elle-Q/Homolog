import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import SkipNextRoundedIcon from "@mui/icons-material/SkipNextRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import Stack from "@mui/material/Stack";
import {VolumeUp} from "@mui/icons-material";
import Slider from "@mui/material/Slider";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

function ControlBar({
                        play,
                        togglePlay,
                        visible,
                        barrageVisible,
                        rePlay,
                        setVolume,
                        enterFullScreen,
                        handleRateClick,
                        toggleShowBarrage,
                    }) {
    const [value, setValue] = useState(30);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setVolume(newValue);
    };

    return (
        <Box display="flex"
             flexDirection="row-start"
             sx={{
                 mr: '10px',
                 alignItems: 'center',
                 ml: '20px',
                 opacity: `${visible}` === 'visible' ? 1 : 0,
                 transition: 'opacity 2s'
             }}>
            <Button sx={{
                backgroundColor: "inherit",
                border: "none",
            }}
                    onClick={() => togglePlay(!play)}>
                {
                    play ? <PauseCircleFilledRoundedIcon fontSize="large" sx={{
                            color: 'secondary.light',

                        }}/>
                        : <PlayCircleRoundedIcon fontSize="large" sx={{color: 'secondary.light'}}/>
                }

            </Button>
            <Button sx={{
                backgroundColor: "inherit",
                border: "none",
            }}
                    onClick={() => {
                    }}>
                <SkipNextRoundedIcon fontSize="medium" sx={{color: 'secondary.light'}}/>
            </Button>
            <Button sx={{
                backgroundColor: "inherit",
                border: "none",
            }}
                    onClick={rePlay}>
                <ReplayRoundedIcon fontSize="medium" sx={{color: 'secondary.light'}}/>
            </Button>

            <Box sx={{width: 80, ml: 40, mr:2}}>
                <Stack direction="row" alignItems="center">
                    <VolumeUp/>
                    <Slider aria-label="Volume"
                            value={value}
                            onChange={handleChange}
                            sx={{color: "secondary.light"}}
                            size="small"
                    />
                </Stack>
            </Box>
            <Box sx={{
                display:"flex"
            }}>
                <FormControlLabel
                    size="small"
                    control={<Switch aria-label='Switch Danmu'
                                     size="small"
                                     sx={{
                                         "& > span.MuiSwitch-track": {backgroundColor: 'white'},
                                         ".MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb":
                                             {
                                                 backgroundColor: 'secondary.light',
                                                 boxShadow: '0 0 5px #3399FF',
                                             },
                                         ".MuiSwitch-thumb":
                                             {
                                                 backgroundColor: 'primary.dark',
                                                 boxShadow: '0 0 5px #EB5E28',
                                             },
                                     }}
                                     color="third"
                                     onChange={toggleShowBarrage}
                                     checked={barrageVisible}
                                     />}
                    label={<Typography
                        style={{
                        fontSize: '0.8rem',
                        fontFamily:'typography.fontFamily'
                        }}>弹幕</Typography>}
                />
            </Box>

            <Typography
                style={{
                    fontSize: '0.8rem',
                    fontFamily:'typography.fontFamily'
                }}>清晰度</Typography>

            <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                    <React.Fragment>
                        <Button sx={{
                            border:"none",
                            backgroundColor:"transparent",
                            color:'secondary.light',
                            fontSize:'0.8rem',
                            mt:'2px',
                            ml:'10px',
                            pl:0,
                            fontFamily:'typography.fontFamily'
                        }} {...bindTrigger(popupState)}>
                            倍速
                        </Button>
                        <Menu {...bindMenu(popupState)}>
                            <MenuItem onClick={(e)=>{handleRateClick(e,popupState)}} data-my-value='0.5'>0.5</MenuItem>
                            <MenuItem onClick={(e)=>{handleRateClick(e,popupState)}} data-my-value='1'>1</MenuItem>
                            <MenuItem onClick={(e)=>{handleRateClick(e,popupState)}} data-my-value='1.5'>1.5</MenuItem>
                            <MenuItem onClick={(e)=>{handleRateClick(e,popupState)}} data-my-value='2'>2</MenuItem>
                        </Menu>
                    </React.Fragment>
                )}
            </PopupState>

            <Button sx={{
                backgroundColor: "inherit",
                border: "none",
                display:"flex"
            }}
                    onClick={enterFullScreen}>
                <FullscreenExitIcon fontSize="medium" sx={{color: 'secondary.light'}}/>
            </Button>

        </Box>
    );
}

export default ControlBar;