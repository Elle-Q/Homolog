import {styled} from "@mui/material/styles";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import Switch from "@mui/material/Switch";
import {alpha} from "@mui/system";
import TableRow from "@mui/material/TableRow";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#001E3C',
        color: '#3399ff',
        fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: alpha('#fff', 0.5)
    },
    [`&.${tableCellClasses.root}`]: {
        borderBottom: '1px solid #403D39;'
    },
}));

export const StyledSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: '#0aa858',
        '&:hover': {
            backgroundColor: alpha('#0aa858', theme.palette.action.hoverOpacity),
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#0aa858',
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },

    '&:hover': {
        backgroundColor:alpha('#403D39', 0.2)
    }
}));