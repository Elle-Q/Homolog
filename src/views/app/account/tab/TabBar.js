import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
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
                backgroundColor: '#111',
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

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({theme}) => ({
        textTransform: 'none',
        fontWeight: 400,
        fontSize: theme.typography.pxToRem(14),
        marginRight: theme.spacing(1),
        color: 'rgba(255, 255, 255, 0.7)',
        '&.Mui-selected': {
            color: '#595DFD',
            backgroundColor: '#111',
        },
        '&:hover': {
            color: '#595DFD',
        },
        '&.Mui-focusVisible': {
            backgroundColor: 'rgba(100, 95, 228, 0.32)',
        },
    }),
);

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
        <Box sx={{width: '100%', backgroundColor: '#222'}}>
            <StyledTabs value={value}
                        onChange={handleChange}
                        centered
            >
                <StyledTab label={`购物车(${carts})`}/>
                <StyledTab label={`收藏(${collects})`}/>
                <StyledTab label={`喜欢(${likes})`}/>
                <StyledTab label={`作品(${pieces})`}/>
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
        </Box>
    );
}

export default TabBar;