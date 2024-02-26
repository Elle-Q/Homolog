import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import {Link, useNavigate} from "react-router-dom";
import Logo from "./logo";
import {CustomBadge} from "../../../../components/ui/CustomBadge";
import {useDispatch, useSelector} from "react-redux";
import {getColorFromUserStatus} from "../../../../utils/ToolUtil";
import useScroll from "../../../../hook/useScroll";
import {openCart, selectCart} from "../../../../store/cart-slice";
import {setKeyword, toggleSearch} from "../../../../store/search";

import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from "@mui/material/IconButton";
import PaidIcon from '@mui/icons-material/Paid';
import "./navbar.scss"
import Badge from "@mui/material/Badge";
import {useEffect, useState} from "react";
import {countCart} from "../../../../api/cart.service";
import {countOrder} from "../../../../api/order.service";
import {selectOrder} from "../../../../store/order-slice";
import UserService from "../../../../api/user.service";
import {ListCatsWith4Items} from "../../../../api/cat.service";

function NavBar(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {open} = useSelector(selectCart);
    const {refresh} = useSelector(selectOrder);
    const [cartCount, setCartCount] = useState(0)
    const [orderCount, setOrderCount] = useState(0)
    const scroll = useScroll()
    const [user, setUser] = useState({})

    // useEffect(() => {
    //     countCart().then(resp => {
    //         setCartCount(resp);
    //     })
    // }, [open]);
    //
    // useEffect(() => {
    //     countOrder().then(resp => {
    //         setOrderCount(resp);
    //     })
    // }, [refresh]);

    useEffect(() => {
        setUser(UserService.getLocalUser())
    }, []);

    const enterAccount = (e) => {
        navigate('/account')
    };

    const handleOpenCart = () => {
        dispatch(openCart())
    }

    const handleEnter = (event) => {
        if (event.nativeEvent.keyCode === 13) {
            dispatch(setKeyword(event.target.value))
            dispatch(toggleSearch());
            navigate('/search')
        }
    }

    return (
        <div className="navbar-container"
             style={{transform: `${scroll.direction === 'down' ? 'translateY(-100%)' : ''}`}}>
            <AppBar position="static" sx={{backgroundColor: '#252422'}}>
                <Toolbar>
                    <Logo title="LEETROLL"/>
                    <div className="search-bar">
                        <input type="text" placeholder="搜索" onKeyDown={handleEnter}/>
                        <IconButton className={'search-button'} onClick={() => navigate("/search")}>
                            <SearchIcon fontSize="medium"/>
                        </IconButton>
                    </div>
                    <Stack direction="row" spacing={2} sx={{width: '20%', alignItems: 'center'}}>
                        <Link color="inherit" to={"/home"}>
                            <HomeIcon fontSize="medium"/>
                        </Link>
                        <Link color="inherit" to={"/order"}>
                            <Badge badgeContent={orderCount} color="success">
                                <PaidIcon fontSize="medium"/>
                            </Badge>
                        </Link>
                        <a color="inherit" onClick={handleOpenCart}>
                            <Badge badgeContent={cartCount} color="success">
                                <ShoppingCartIcon fontSize="medium"/>
                            </Badge>
                        </a>
                        <Link color="inherit" to={"/community"}>
                            <SupervisorAccountIcon fontSize="medium"/>
                        </Link>
                        <CustomBadge
                            overlap="circular"
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            variant="dot"
                            onClick={enterAccount}
                            sx={{
                                cursor: 'pointer',
                                '& .MuiBadge-badge': {
                                    backgroundColor: user && getColorFromUserStatus(user.status),
                                    color: user && getColorFromUserStatus(user.status),
                                }
                            }}
                        >
                            <Avatar alt="avatar" src={user && user.avatar}/>
                        </CustomBadge>
                    </Stack>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export {NavBar};