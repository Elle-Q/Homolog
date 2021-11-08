import React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {globalTheme} from "./config/globalTheme";
import Home from "./views/home/home";
import VideoPlayer from "./features/video-play/VideoPlayer";
import Play from "./views/paly/Play";
import Link from "@mui/material/Link";
import {HeaderBar} from "./views/home/appbar/HeaderBar";
import {BrowserRouter, Route, Routes} from "react-router-dom";

export const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});


function App() {
    const [mode, setMode] = React.useState('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme(globalTheme, {
                palette: {
                    mode: mode,
                },
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/*" element={<Home/>}/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
