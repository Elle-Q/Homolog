import {createTheme} from "@mui/material/styles";
import darkScrollbar from "@mui/material/darkScrollbar";

 export const globalTheme = createTheme({
     palette: {
         primary: {
             light: '#173A5E',
             main: '#001E3C',
             dark: '#EB5E28',
             contrastText: '#fff',
         },
         secondary: {
             light:'#3399ff',
             main: '#132f4c',
             dark: '#20262d',
             contrastText: '#000',
         },
         third: {
             main: '#3399FF',
         },
         mode:"dark",
         background: {
             default: '#252422',//0A1929
             paper:'#0a0908'
         },
         text: {
             primary: '#3399FF',
             secondary: '#fff',
             fourth: '#EB5E28',
             third: '#000',
             fifth:'#CCC5B9',
             sixth:'#ba2d0b',
             seventh: '#00a896'
         },
         icon: {
             first:'#e9c46a'
         },
     },

     typography: {
         fontFamily: '-apple-system',
         fontSize: 14,
         fontWeightLight: 300,
         fontWeightRegular: 400,
         fontWeightMedium: 500
     },

     components: {
         MuiButton: {
             styleOverrides: {
                 root: {
                     fontSize: '1rem',
                     border: '1px solid #173A5E',
                     borderRadius: '10px',
                     backgroundColor:'#001E3C',
                     minWidth:"42px"
                 },
             },
         },
         MuiTextField: {
             styleOverrides: {
                 root: {
                     '& .MuiOutlinedInput-root': {
                         '&:hover fieldset': {
                             borderColor: '#001E3C',
                         },
                         border:'none',
                         borderRadius: '50px',
                     },
                 },
             }
         },
         MuiCssBaseline: {
             styleOverrides: {
                 body:  darkScrollbar()
             },
         },
     },
 })