import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Stack from "@mui/material/Stack";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import useScroll from "../../../../hook/useScroll";
import {openSider, selectSider, setShow} from "../../../../store/sider-slice";
import {toggleSearch} from "../../../../store/search";
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
import {updateUrl} from "../../../../utils/ToolUtil";
import logo from "../../../../assets/logo/logo.png";

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
    const location = useLocation();

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
        let url = updateUrl("keyword", keyword, location.search, "/search");
        navigate(url)
    }

    return (
        <div className="header" style={{transform: `${scroll.direction === 'down' ? 'translateY(-100%)' : ''}`}}>
            <AppBar position="static" sx={{backgroundColor: '#0f141a'}}>
                <Toolbar sx={{gap: 5}}>
                    <div className="header__logo-box" onClick={() => navigate("/")}>
                        <img className="header__logo-img" src={logo} alt="logo"/>
                        <h1 className="header__logo-text"> LEETROLL </h1>
                    </div>
                    <div className="header__search-bar">
                        <input className="header__search-input" type="text"
                               placeholder="搜索"
                               defaultValue={params.get("keyword")}
                               onKeyDown={handleEnter}
                               onChange={(event) => setKeyword(event.target.value)}/>
                        <IconButton className="header__search-button" onClick={handleSearch}>
                            <SearchIcon fontSize="large" sx={{color: "#fff"}}/>
                        </IconButton>
                    </div>
                    <Stack direction="row" spacing={2} className="header__nav">
                        <Link color="inherit" to={"/"}>
                            <HomeIcon fontSize="large"/>
                        </Link>
                        <Link color="inherit" to={"/order/open"}>
                            <Badge badgeContent={orderCount} color="success">
                                <PaidIcon fontSize="large"/>
                            </Badge>
                        </Link>
                        <a color="inherit" onClick={handleOpenCart}>
                            <Badge badgeContent={cartCount} color="success">
                                <ShoppingCartIcon fontSize="large"/>
                            </Badge>
                        </a>
                        <Link color="inherit" to={"/community"}>
                            <SupervisorAccountIcon fontSize="large"/>
                        </Link>
                        <div className="header__user">
                            <AvatarBadge handleMouseOver={() => setShowMiniProfile(true)}
                                         user={user}
                                         size={{width: 5, height: 5}}/>
                            <MiniProfile user={user} show={showMiniProfile}
                                         handleClose={() => setShowMiniProfile(false)}/>
                        </div>
                    </Stack>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export {NavBar};