import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Badge from '@mui/material/Badge';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import {styled, useTheme} from '@mui/material/styles';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import {ColorModeContext} from "../../../../App";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import SearchIcon from '@mui/icons-material/Search';
import {alpha} from "@mui/system";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import suggetionJson from '../../../../json/suggesttion.json'
import Popper from '@mui/material/Popper';
import Paper from "@mui/material/Paper";
import {Link, useNavigate} from "react-router-dom";
import community from '../../../../assets/community1.svg'
import categoryS from '../../../../assets/category_S.svg'
import AppLogo from "./AppLogo";
import {CustomBadge} from "../../../../components/ui/CustomBadge";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../../../api/authSlice";
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import {useEffect} from "react";
import {getUser} from '../../../../api/user.service'
import {getColorFromUserStatus} from "../../../../utils/ToolUtil";
import useScroll from "../../../../hook/useScroll";
import {selectShowNavBar, setShow} from "../navBarSlice";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: '50px',
    backgroundColor: '#edf2f4',
    '&:hover': {
        backgroundColor: alpha('#edf2f4', 0.9),
    },
    marginLeft: '10%',
    width: '1000px',
    [theme.breakpoints.up('sm')]: {
        marginRight: theme.spacing(5),
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

function NavBar(props) {
    const theme = useTheme();
    const navigate = useNavigate();
    const {isLogin, user} = useSelector(selectAuth);
    const colorMode = React.useContext(ColorModeContext);
    const dispatch = useDispatch();
    const scroll = useScroll()

    const suggestions = suggetionJson.map((s) => s.label);


    useEffect(() => {
        dispatch(getUser())
    }, [])


    const enterAccount = (e) => {
        e.preventDefault();
        if (isLogin) {
            navigate('/app/account')
        } else {
            navigate('/login');
        }
    };


    return (
        <Box sx={{
            flexGrow: 1,
            boxShadow: "none",
            position: "sticky",
            zIndex: 50,
            top: 0,
            transform: `${scroll.direction === 'down' ? 'translateY(-100%)' : ''}`,
            transition: 'transform 0.6s ease-in-out',
            '& > *': {
                border: "none",
            }
        }}>
            <AppBar position="static" sx={{backgroundColor: alpha('#0A1929', 0.5)}}>
                <Toolbar sx={{
                    backgroundColor: alpha('#0A1929', 0.5),
                    display: 'inline-flex',
                    minHeight: '64px'
                }}>
                    <AppLogo title="LEET-ROLL"/>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon sx={{color: '#3399FF'}}/>
                        </SearchIconWrapper>

                        <Autocomplete
                            size="small"
                            disableClearable
                            options={suggestions}
                            PopperComponent={(props) => (
                                <Popper {...props} element='bottom-start'/>
                            )}
                            PaperComponent={(props) => (
                                <Paper {...props} sx={{
                                    backgroundImage: 'linear-gradient( 109.6deg,  #003f88 11.2%, #004e98 91.2% )',
                                    color: 'white',
                                    borderRadius: '15px',
                                    fontWeight: "bold"
                                }}/>
                            )}
                            freeSolo
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Search..."
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                        style: {
                                            paddingLeft: '50px',
                                            fontWeight: "bold",
                                        }
                                    }}
                                />
                            )}
                        />
                    </Search>

                    <Box sx={{flexGrow: 1}}/>
                    <Stack direction="row" spacing={2}>
                        <Button sx={{ml: 1}} onClick={colorMode.toggleColorMode} color="inherit" size="large">
                            {theme.palette.mode === 'dark' ? <BedtimeIcon fontSize="small"/> :
                                <WbSunnyIcon fontSize="small"/>}
                        </Button>

                        <Button size="large" component={Link} to={"/app/community"}>
                            <img style={{width: 20, height: 20}} alt="community" title="社区" src={community}/>
                        </Button>
                        <Button size="large" color="inherit"
                                component={Link} to={"/app/home"}>
                            <HomeIcon fontSize="small"/>
                        </Button>
                        <Button size="large" color="inherit"
                                component={Link} to={"/app/category/133"}>
                            <img style={{width: 20, height: 20}} alt="category" title="分类" src={categoryS}/>
                        </Button>
                        <Button size="large" color="inherit"
                                component={Link} to={"/app/partner"}>
                            <Badge badgeContent={4} color="error">
                                <ChatBubbleOutlineIcon fontSize="small"/>
                            </Badge>
                        </Button>
                        <Button
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon fontSize="small"/>
                            </Badge>
                        </Button>
                        {
                            user && user.Admin &&
                            <Button size="large" color="inherit"
                                    component={Link} to={"/admin"}>
                                <AdminPanelSettingsRoundedIcon fontSize="small"/>
                            </Button>
                        }

                        <CustomBadge
                            overlap="circular"
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            variant="dot"
                            component={Link}
                            to={"/"}
                            onClick={enterAccount}
                            sx={{
                                '& .MuiBadge-badge': {
                                    backgroundColor: user && getColorFromUserStatus(user.Status),
                                    color: user && getColorFromUserStatus(user.Status),
                                }
                            }}
                        >
                            <Avatar alt="elle" src={user && user.Avatar}/>
                        </CustomBadge>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export {NavBar};