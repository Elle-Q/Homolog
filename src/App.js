import React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {globalTheme} from "./config/globalTheme";
import Home from "./views/home/home";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import Admin from "./views/admin/Admin";
import {adminTheme} from "./config/adminTheme";
import useInterceptor from "./hook/useInterceptor";
import AlertLog from "./features/alert/AlertLog";
import Login from "./views/login/login";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import "./styles.css";

export const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});


function App() {
    useInterceptor();
    const [mode, setMode] = React.useState('light');

    const app_theme = React.useMemo(
        () =>
            createTheme(globalTheme, {
                palette: {
                    mode: mode,
                },
            }),
        [mode],
    );


    const admin_theme = React.useMemo(
        () =>
            createTheme(adminTheme, {
                palette: {
                    mode: mode,
                },
            }),
        [mode],
    );

    const routes = [
        {path: '/app/*', name: 'app', component: <Home/>},
        {
            path: '/admin/*',
            name: 'admin',
            component: <ThemeProvider theme={admin_theme}>
                <Admin/>
            </ThemeProvider>
        },
        {path: '/login', name: 'login', component: <Login/>},
    ]

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );



    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={app_theme}>
                <BrowserRouter>
                    <Routes>
                        {routes.map(({path, component}) => (
                            <Route path={path} element={component} key={path}/>
                        ))}
                    </Routes>
                </BrowserRouter>
                <AlertLog/>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
