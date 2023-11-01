import React, {useEffect, useState} from 'react';
import Stack from "@mui/material/Stack";
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles({
    prev: {
        width: '1/4',
        maxHeight: '100px',
        cursor: "pointer",
        borderRadius: '5px',

        '&:hover': {
            filter: 'grayscale(90%)',
            transform: 'scale(1.1)',
            border: '5px solid white',
        }
    }
})

function PrevShow(props) {
    const {preList} = props
    const classes = useStyles();
    const [currentPrev, setCurrentPrev] = useState();

    useEffect(() => {
        setCurrentPrev(preList && preList.length > 0 && preList[0].QnLink)
    }, [preList])


    function handlePrevChange(prev, event) {
        setCurrentPrev(prev.QnLink);
        let element = document.getElementById("prevList");
        for (let i = 0; i < element.children.length; i++) {
            element.children[i].style.border = '0px';
        }
        event.target.style.border = '5px solid white';
        event.target.style.borderRadius = '5px';
    }

    return (
        <React.Fragment>
            <img src={currentPrev} alt='prevShow' style={{maxHeight: '750px', borderRadius: '25px'}}/>
            <Stack id={"prevList"} direction={'row'} spacing={1} style={{justifyContent: "center"}}>
                {
                    preList && preList.map((prev, index) =>
                        <img src={prev.QnLink} alt='smallPrev'
                             key={'prev'.concat(index)}
                             className={classes.prev}
                             onClick={(event) => handlePrevChange(prev, event)}/>)
                }
            </Stack>
        </React.Fragment>
    );
}

export default PrevShow;