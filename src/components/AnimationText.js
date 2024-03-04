import React from 'react';
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    fade: {
        opacity: '1 !important',
        transform: 'translateY(0px) !important',
        textShadow:'0 8px 5px rgba(0,0,0,1)',
        '&:hover': {
            color: '#00a896'
        }
    },
    span: {
        opacity: 0,
        transition: "all 1s ease",
        transform: 'translateY(-50px) ',
        textShadow:'0 8px 5px rgba(0,0,0,1)',
    }
});

function AnimationText(props) {
    const classes = useStyles();
    const {title, fontSize, color, spacing, display} = props;
    const titleRef = React.createRef()

    return (
        <div style={{display:'inline-block'}}>
            <h1
                ref={titleRef}
                style={{
                    display: `${display ? display : 'flex'}`,
                    fontFamily: '-apple-system',
                    letterSpacing: `${spacing ? spacing : 3}px`,
                    fontSize: `${fontSize}px`,
                    color: `${color ? color : 'white'}`,
                }}
            >
                <span className={classes.fade}>{title}</span>
            </h1>
        </div>
    );
}

export default AnimationText;