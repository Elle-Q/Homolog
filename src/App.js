import React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {globalTheme} from "./config/globalTheme";
import Home from "./views/home/home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Admin from "./views/admin/Admin";
import {adminTheme} from "./config/adminTheme";
import useInterceptor from "./hook/useInterceptor";
import AlertLog from "./features/alert/AlertLog";

export const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});


function App() {
    useInterceptor();
    const [mode, setMode] = React.useState('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const app_theme = React.useMemo(
        () =>
            createTheme(globalTheme, {
                palette: {
                    mode: mode,
                },
            }),
        [mode],
    );


    const admin_theme =  React.useMemo(
        () =>
            createTheme(adminTheme, {
                palette: {
                    mode: mode,
                },
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={app_theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/app/*" element={<Home/>}/>
                        <Route path="/admin/*" element={
                            <ThemeProvider theme={admin_theme}>
                                <Admin/>
                            </ThemeProvider>
                        }/>
                    </Routes>
                </BrowserRouter>

                <AlertLog />
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
