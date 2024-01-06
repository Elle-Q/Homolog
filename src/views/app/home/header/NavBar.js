import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Badge from '@mui/material/Badge';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import {styled} from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import {alpha} from "@mui/system";
import {Link, useNavigate} from "react-router-dom";
import community from '../../../../assets/community1.svg'
import categoryS from '../../../../assets/category_S.svg'
import Logo from "./Logo";
import {CustomBadge} from "../../../../components/ui/CustomBadge";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../../../api/authSlice";
import {useEffect} from "react";
import {getUser} from '../../../../api/user.service'
import {getColorFromUserStatus} from "../../../../utils/ToolUtil";
import useScroll from "../../../../hook/useScroll";
import {openCart, selectCart} from "../../cart/cart-slice";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: '50px',
    backgroundColor: '#edf2f4',
    '&:hover': {
        backgroundColor: alpha('#edf2f4', 0.9),
    },
    marginLeft: '10%',
    width: '50%',
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
    const navigate = useNavigate();
    const {isLogin, user} = useSelector(selectAuth);
    const dispatch = useDispatch();
    const scroll = useScroll()


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

    const handleOpenCart = () => {
        dispatch(openCart())
    }

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
            <AppBar position="static" sx={{backgroundColor: '#252422'}}>
                <Toolbar>
                    <Logo title="LEET-ROLL"/>
                    <Box sx={{flexGrow: 1}}/>
                    <Stack direction="row" spacing={2}>
                        {/*<Button sx={{ml: 1}} onClick={colorMode.toggleColorMode} color="inherit" size="large">*/}
                        {/*    {theme.palette.mode === 'dark' ? <BedtimeIcon fontSize="small"/> :*/}
                        {/*        <WbSunnyIcon fontSize="small"/>}*/}
                        {/*</Button>*/}
                        <Button size="large" color="inherit" component={Link} to={"/app/home"}>
                            <HomeIcon fontSize="small"/>
                        </Button>
                        <Button size="large" color="inherit"
                                component={Link} to={"/app/search"}>
                            <img style={{width: 20, height: 20}} alt="search" title="search" src={categoryS}/>
                        </Button>
                        <Button size="large" color="inherit" onClick={handleOpenCart}>
                            <ShoppingCartIcon fontSize="small"/>
                        </Button>
                        <Button size="large" component={Link} to={"/app/community"}>
                            <img style={{width: 20, height: 20}} alt="community" title="社区" src={community}/>
                        </Button>
                        <Button size="large" color="inherit" component={Link} to={"/app/partner"}>
                            <Badge badgeContent={4} color="error">
                                <ChatBubbleOutlineIcon fontSize="small"/>
                            </Badge>
                        </Button>
                        <Button size="large" color="inherit">
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon fontSize="small"/>
                            </Badge>
                        </Button>
                        <CustomBadge
                            overlap="circular"
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            variant="dot"
                            component={Link}
                            to={"/"}
                            onClick={enterAccount}
                            sx={{
                                '& .MuiBadge-badge': {
                                    backgroundColor: user && getColorFromUserStatus(user.status),
                                    color: user && getColorFromUserStatus(user.status),
                                }
                            }}
                        >
                            <Avatar alt="elle" src={user && user.avatar}/>
                        </CustomBadge>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export {NavBar};