import {createTheme} from "@mui/material/styles";
import darkScrollbar from "@mui/material/darkScrollbar";

//#001E3C #0A1929 #132F4C #173A5E
 export const adminTheme = createTheme({
     palette: {
         primary: {
             light:'#EB5E28',
             main: '#252422',
             secondary: '#403D39',
             contrastText: '#fff',
         },
         secondary: {
             light:'#CCC5B9',
             main: '#FFFCF2',
             dark: '#0a0908',
             contrastText: '#000',
         },
         third: {
             light: '#173A5E',
             main: '#001E3C',
             dark: '#EB5E28',
             contrastText: '#fff',
         },
         mode:"dark",
         background: {
             default: '#252422',
             paper:'#0a0908'
         },
         text: {
             primary: '#fff',
             secondary: '#3399ff',
             fourth: '#0aa858',
             third: '#000',
         },
         icon: {
             first:'#e9c46a'
         },

     },

     typography: {
         fontFamily:  "open sans,helvetica neue,Helvetica,Arial,sans-serif" ,
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
                     backgroundColor:'#403D39',
                     minWidth:"42px"
                 },
             },
         },
         MuiTextField: {
             styleOverrides: {
                 root: {
                     '& .MuiOutlinedInput-root': {
                         '&:hover fieldset': {
                             borderColor: '#403D39',
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