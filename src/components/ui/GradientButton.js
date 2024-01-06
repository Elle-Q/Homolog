import React from 'react';
import {makeStyles} from "@mui/styles";
import Button from "@mui/material/Button";


const useStyles = makeStyles({
    grad: {
        width: '100px',
        border: 'none',
        margin: '10px',
        textAlign: 'center',
        textTransform: 'uppercase',
        transition: '0.5s',
        backgroundSize: '200% auto',
        color: '#fff',
        boxShadow: '0 0 2px #eee',
        borderRadius: '20px',
        display: 'inline-block',
        fontWeight: "bold",
        fontFamily: '-apple-system',
        '&:hover': {
            backgroundPosition: 'right center',
            color: '#fff',
            textDecoration: 'none',
        }
    }
})

function GradientButton(props) {
    const classes = useStyles();
    const {name, color="linear-gradient(to right, #00c6ff 0%, #0072ff  51%, #00c6ff 100%)", width, fontSize, onClick} = props
    return (
        <Button onClick={onClick}
                className={classes.grad}
                style={{
                    backgroundImage: `${color}`,
                    width: width,
                    fontSize: fontSize,
                }}>{name}</Button>
    );
}

export default GradientButton;