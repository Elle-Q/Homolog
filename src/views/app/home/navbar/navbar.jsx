import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Stack from "@mui/material/Stack";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import Logo from "./logo/logo";
import {useDispatch, useSelector} from "react-redux";
import useScroll from "../../../../hook/useScroll";
import {openSider, selectSider, setShow} from "../../../../store/sider-slice";
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
import AvatarBadge from "../../../../components/avatar-badge/avatar-badge";
import MiniProfile from "./mini-profile/mini-profile";

function NavBar(props) {
    let [params] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {open} = useSelector(selectSider);
    const {refresh} = useSelector(selectOrder);
    const [cartCount, setCartCount] = useState(0)
    const [orderCount, setOrderCount] = useState(0)
    const [showMiniProfile, setShowMiniProfile] = useState(false)
    const [user, setUser] = useState({})
    const [keyword, setKeyword] = useState("")
    const scroll = useScroll()

    useEffect(() => {
        countCart().then(resp => {
            setCartCount(resp);
        })
    }, [open]);

    useEffect(() => {
        countOrder().then(resp => {
            setOrderCount(resp.open);
        })
    }, [refresh]);

    useEffect(() => {
        setUser(UserService.getLocalUser())
        return () => setShowMiniProfile(false)
    }, []);

    const handleOpenCart = () => {
        dispatch(openSider())
        dispatch(setShow('cart'))
    }

    const handleEnter = (event) => {
        if (event.nativeEvent.keyCode === 13) {
            handleSearch();
        }
    }
    const handleSearch = (event) => {
        dispatch(toggleSearch());
        navigate("/search?keyword="+keyword);
    }

    return (
        <div className="navbar-container"
             style={{transform: `${scroll.direction === 'down' ? 'translateY(-100%)' : ''}`}}>
            <AppBar position="static" sx={{backgroundColor: '#252422'}}>
                <Toolbar>
                    <Logo title="LEETROLL"/>
                    <div className="search-bar">
                        <input type="text"
                               placeholder="搜索"
                               defaultValue={params.get("keyword")}
                               onKeyDown={handleEnter}
                               onChange={(event) => setKeyword(event.target.value)}/>
                        <IconButton className={'search-button'} onClick={handleSearch}>
                            <SearchIcon fontSize="medium"/>
                        </IconButton>
                    </div>
                    <Stack direction="row" spacing={2} sx={{width: '20%', alignItems: 'center'}}>
                        <Link color="inherit" to={"/"}>
                            <HomeIcon fontSize="medium"/>
                        </Link>
                        <Link color="inherit" to={"/order/open"}>
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
                        <div style={{position: 'relative'}}>
                            <AvatarBadge handleMouseOver={() => setShowMiniProfile(true)}
                                         user={user}
                                         size={{width: 5, height: 5}}/>
                            <MiniProfile user={user} show={showMiniProfile} handleClose={() => setShowMiniProfile(false)}/>
                        </div>
                    </Stack>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export {NavBar};