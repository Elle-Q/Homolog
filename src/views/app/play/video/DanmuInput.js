import React from 'react';
import {alpha, styled} from '@mui/system';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Button from "@mui/material/Button";

const StyledInputElement = styled('input')`
  width: 92%;
  font-size: 1rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  line-height: 1.4375em;
  background: #132F4C;
  border: none;
  border-radius: 10px;
  padding: 6px 10px;
  color: white;
  transition: width 300ms ease;

  &:hover {
    background: #0A1929;
    border-color: #173A5E;
  }

  &:focus {
    outline: none;
    width: 90%;
    transition: width 200ms ease-out;
  }
`;

const DanmuBox = styled('div')(({theme}) => ({
    position: "absolute",
    zIndex: 1,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#132F4C',
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.25),
    },
    border: '1px solid #173A5E',
    width: '100%',
    top: '530px',
    paddingRight: '10px',
    justifyContent: "flex-end",
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
                                placeholder={"不好请别骂   请用鸡蛋砸   文明你我他 :) "} />
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