import React from 'react';
import {alpha, styled} from '@mui/system';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Button from "@mui/material/Button";

const StyledInputElement = styled('input')`
  width: 92%;
  font-size: 1rem;
  font-family: -apple-system, sans-serif;
  font-weight: 400;
  line-height: 1.4375em;
  background: transparent;
  border: none;
  border-radius: 10px;
  padding: 6px 10px;
  //transition: width 300ms ease;

  &:focus {
    outline: none;
    width: 90%;
    transition: width 200ms ease-out;
  }
`;

const DanmuBox = styled('div')(({theme}) => ({
    zIndex: 1,
    borderRadius: '10px',
    backgroundColor: 'rgb(65,63,63)',
    boxShadow: '0 0 3px gray',
    width: '100%',
    paddingRight: '10px',
    justifyContent: "flex-end",
    '&:hover' : {
        transform: 'scale(1.01)'
    },
    [theme.breakpoints.up('sm')]: {
        marginRight: theme.spacing(5),
    },
}));


function DanmuInput(props, ref) {
    const {handleDanmuSend} = props;

    return (
        <DanmuBox>
            <StyledInputElement ref={ref}
                                aria-label="danmu input"
                                placeholder={"讲文明 树新风 :) "} />
            <Button
                sx={{
                    backgroundColor: "transparent",
                    color: "secondary.light",
                    border: "none",
                    mr: 0,
                    justifyContent: "flex-end",
                    width: '8%'
                }}
                onClick={handleDanmuSend}
            >
                <SendRoundedIcon/>
            </Button>
        </DanmuBox>
    )
}

export default React.forwardRef(DanmuInput)