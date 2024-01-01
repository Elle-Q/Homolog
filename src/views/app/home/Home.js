import React, {useEffect} from 'react';
import {NavBar} from "./header/NavBar";
import {Route, Routes, useLocation} from "react-router-dom";
import Play from "../play/Play";
import Body from "./body/Body";
import Category from "../category/Category";
import Account from "../account/Account";
import Item from "../item/Item";
import CssBaseline from "@mui/material/CssBaseline";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import "../../../styles.css";
import {Footer} from "./footer/Footer";
import Partner from "../partner/Partner";
import Community from "../community/Community";
import Issue from "../community/edit/Issue";
import {useDispatch, useSelector} from "react-redux";
import {selectShowNavBar, setNavBarShow} from "./header/NavBarSlice";
import {KeyboardArrowDown, KeyboardArrowUp} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Cart from "../cart/cart";

function Home(props) {

    const {show} = useSelector(selectShowNavBar);
    const dispatch = useDispatch();

    const routes = [
        {path: '/home', name: 'home', component: <React.Fragment> <Body/> <Footer/></React.Fragment>},
        {path: '/', name: 'home_', component: <React.Fragment> <Body/> <Footer/></React.Fragment>},
        {path: '/play/:id', name: 'play', component: <Play/>},
        {path: '/category/:id', name: 'category', component: <Category/>},
        {path: '/item/:id', name: 'item', component: <Item/>},
        {path: '/account', name: 'account', component: <Account/>},
        {path: '/partner', name: 'partner', component: <Partner/>},
        {path: '/community', name: 'community', component: <Community/>},
        {path: '/issue', name: 'issue', component: <Issue/>},
    ]

    const toggleNavBar = () => {
        let element = document.getElementById("toggleNavBar");
        if (show) {
            element.style.top = "-5px"
        } else {
            element.style.top = "50px"
        }
        dispatch(setNavBarShow(!show))
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            {
                show && <NavBar/>
            }
            <Box id="toggleNavBar" sx={{
                textAlign: "center",
                verticalAlign: "center",
                zIndex: 100, width: '100%', height: '15px',
                backgroundColor: '#00a896',
                color: '#9f9f9f',
                content: '"dd"',
                "&:hover": {
                    backgroundColor: '#e82986',
                },
            }} onClick={toggleNavBar}>
            </Box>
            {/*购物车*/}
            <Cart></Cart>
            <Routes>
                {routes.map(({path, component}, index) => (
                    <Route key={index} path={path} element={component}/>
                ))}
            </Routes>
        </React.Fragment>
    );
}

export default Home;