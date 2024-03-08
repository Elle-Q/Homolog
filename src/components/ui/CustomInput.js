import {styled} from "@mui/system";

export const StyledInputElement = styled('textarea')(({theme}) => ({
    resize: 'none',
    width: '95%',
    fontSize: '1rem',
    fontFamily: '-apple-system',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '10px',
    padding: '6px 10px',
    color: '#3399FF',
    transition: 'width 300ms ease',
    '&:hover': {
        backgroundColor: 'transparent',
    },
    '&:focus': {
        outline: 'none',
        transition: 'width 200ms ease-out'
    }
}));

export const StyledSingleInputElement = styled('input')(({theme}) => ({
    resize: 'none',
    width: '95%',
    fontSize: '1rem',
    fontFamily: '-apple-system',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '10px',
    padding: '6px 10px',
    color: '#3399FF',
    transition: 'width 300ms ease',
    '&:hover': {
        backgroundColor: 'transparent',
    },
    '&:focus': {
        outline: 'none',
        transition: 'width 200ms ease-out'
    }
}));
