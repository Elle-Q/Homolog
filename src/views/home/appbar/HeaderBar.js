import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import {styled, useTheme} from '@mui/material/styles';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import {ColorModeContext} from "../../../App";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import logo from '../../../assets/cat.svg'
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from '@mui/icons-material/Search';
import {alpha} from "@mui/system";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import suggetionJson from '../../../json/suggesttion.json'
import Popper from '@mui/material/Popper';
import Paper from "@mui/material/Paper";
import {Link} from "react-router-dom";
import community from '../../../assets/community1.svg'
import categoryS from '../../../assets/category_S.svg'
import categoryB from '../../../assets/category_B.svg'
import MultilevelMenu from "../../../features/menu/MultilevelMenu";

const StyledBadge = styled(Badge)(({theme}) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '50px',
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.25),
    },
    border: '1px solid #173A5E',
    marginLeft: 0,
    width: '1000px',
    [theme.breakpoints.up('sm')]: {
        marginRight: theme.spacing(5),
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

}));

function HeaderBar(props) {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    const [showMenu,setShowMenu] = React.useState(false);

    const suggestions = suggetionJson.map((s) => s.label);

    return (
        <Box sx={{flexGrow: 1, boxShadow:"none", position:"sticky", zIndex:50, top:0}}>
            <AppBar position="static">
                <Toolbar sx={{
                    backgroundColor: 'background.default',
                    display: 'inline-flex',
                    minHeight: '64px'
                }}>
                    <IconButton>
                        <img className="logo" src={logo} style={{width:'50px',height:'50px'}} alt={"logo"}/>
                    </IconButton>

                    <Typography
                        variant="h6"
                        sx={{display: {xs: 'none', sm: 'block', fontFamily:'-apple-system'}}}
                    >
                        HOMOLOG
                    </Typography>


                    <IconButton
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ ml:20}}
                        onMouseEnter={() => setShowMenu(!showMenu)}
                    >
                        <img style={{width:25, height:25}} alt ="community" title="分类" src={categoryB}/>
                    </IconButton>
                    {
                        showMenu && (<div style={{position:'relative'}}>
                            <MultilevelMenu onMouseLeave={() => setShowMenu(!showMenu)}/>
                        </div>)
                    }

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>

                        <Autocomplete
                            sx={{
                                paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                                border: "none",
                                borderRadius: '50px',
                                boxShadow: '0 0 5px #3399FF',
                                '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.25),
                                },
                            }}
                            size="small"
                            id="free-solo-2-demo"
                            disableClearable
                            options={suggestions}
                            PopperComponent={(props) => (
                                <Popper {...props}  sx={{color:'red'}} element='bottom-start' />
                            )}
                            PaperComponent={(props) => (
                                <Paper {...props} sx={{
                                    backgroundColor:alpha(theme.palette.primary.main, 0.85),
                                    color: theme.palette.secondary.light
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
                                    }}
                                    sx={{
                                        border:"none"
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

                        <Button size="large" >
                            <img style={{width:20, height:20}} alt ="community" title="社区" src={community}/>
                        </Button>
                        <Button size="large" color="inherit"
                                component={Link} to={"/home"}>
                            <HomeIcon fontSize="small"/>
                        </Button>
                        <Button size="large" color="inherit"
                                component={Link} to={"/category/animation"}>
                            <img style={{width:20, height:20}} alt ="category" title="分类" src={categoryS}/>
                            {/*<RestoreOutlinedIcon fontSize="small"/>*/}
                        </Button>
                        <Button size="large" color="inherit">
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
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            variant="dot"
                            component={Link} to={"/account"}
                        >
                            <Avatar alt="elle" src="/avatar/avatar1.jpg"/>
                        </StyledBadge>
                    </Stack>
                </Toolbar>
            </AppBar>
            {/*{renderMobileMenu}*/}
            {/*{renderMenu}*/}
        </Box>
    );
}

export {HeaderBar};