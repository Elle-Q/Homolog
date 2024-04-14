import React, {useEffect, useState} from 'react';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {styled, useTheme} from '@mui/material/styles';
import Piece from "./piece/Piece";
import Cart from "./cart/Cart";
import Collect from "./collect/Collect";
import Like from "./like/Like";
import {TotalActionSize} from "../../../../api/item.service";
import {countCart} from "../../../../api/cart.service";

function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
            style={{
                backgroundColor: '#0f141a',
                padding: '30px'
            }}
        >
            {value === index && (
                children
            )}
        </div>
    );
}

const StyledTabs = styled((props) => (
    <Tabs
        {...props}
        TabIndicatorProps={{children: <span className="MuiTabs-indicatorSpan"/>}}
    />
))({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 0,
    },
});

function TabBar(props) {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const [pieces, setPieces] = useState([])
    const [carts, setCarts] = useState([])
    const [collects, setCollects] = useState([])
    const [likes, setLikes] = useState([])

    useEffect(() => {
        TotalActionSize('like').then(resp => {
            setLikes(resp)
        })
        countCart().then(resp => {
            setCarts(resp)
        })
        TotalActionSize('collect').then(resp => {
            setCollects(resp)
        })
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <StyledTabs value={value}
                        onChange={handleChange}
                        centered
            >
                <Tab disableRipple className="account-tab__tab" label={`购物车(${carts})`}/>
                <Tab disableRipple className="account-tab__tab" label={`收藏(${collects})`}/>
                <Tab disableRipple className="account-tab__tab" label={`喜欢(${likes})`}/>
                <Tab disableRipple className="account-tab__tab" label={`作品(${pieces})`}/>
            </StyledTabs>

            <TabPanel value={value} index={0} dir={theme.direction}>
                <Cart/>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <Collect/>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
                <Like/>
            </TabPanel>
            <TabPanel value={value} index={3} dir={theme.direction}>
                <Piece/>
            </TabPanel>
        </div>
    );
}

export default TabBar;