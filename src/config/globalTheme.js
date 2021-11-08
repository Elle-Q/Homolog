import {createTheme} from "@mui/material/styles";
import darkScrollbar from "@mui/material/darkScrollbar";

//#001E3C #0A1929 #132F4C #173A5E
 export const globalTheme = createTheme({
     palette: {
         primary: {
             light: '#173A5E',
             main: '#001E3C',
             dark: '#EB5E28',
             contrastText: '#fff',
         },
         secondary: {
             light:'#3399FF',
             main: '#132F4C',
             dark: '#20262d',
             contrastText: '#000',
         },
         mode:"dark",
         background: {
             default: '#0A1929'
         },
         text: {
             primary: '#3399FF',
             secondary: '#fff',
             fourth: '#EB5E28',
             third: '#000',
         },
     },

     typography: {
         fontFamily:  "Helvetica" ,
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
                         // backgroundColor:'#001E3C',
                     //
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