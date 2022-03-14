import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import {getPopularTags} from "../../../../utils/ToolUtil";
import {makeStyles} from "@mui/styles";


const tags = [
    {
        "name": "动画",
        "cnt": 370
    },
    {
        "name": "Blender",
        "cnt": 209
    },
    {
        "name": "特效",
        "cnt": 124
    },
    {
        "name": "3d模型",
        "cnt": 137
    }
]

const useStyles = makeStyles({
    fade: {
        opacity: '1 !important',
        transform: 'translateY(0px) !important'
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        // border: 0,
        // borderRadius: 3,
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        // color: 'white',
        // height: 48,
        // padding: '0 30px',
    },
    span:{
        opacity: 0,
        transition:"all 1s ease",
        transform: 'translateY(-50px)'
    }
});


function Title(props) {
    const classes = useStyles();
    const {title} = props;
    const [data, setData] = useState("")
    // const [len, setLen] = useState(0)
    const titleRef = React.createRef()

    useEffect(() => {
        const split = title.split("")
        let innerHtml = "";
        for (let i = 0; i < split.length; i++) {
            innerHtml += `<span class=${classes.span}> ${split[i]} </span>`
        }
        setData(innerHtml)
    }, [title])


    let len = title.length
    const interval = setInterval(() => {
        if (!titleRef.current) return
        len--
        if (len < 0) {
            complete()
        } else {
            const span = titleRef.current.children[len];
            span.classList.add(classes.fade)
        }
    }, 200);

    function complete() {
        clearInterval(interval);
    }

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (!titleRef.current) return
    //         len--
    //         if (len < 0) return
    //         const span = titleRef.current.children[len];
    //         span.classList.add(style.fade)
    //     }, 1000);
    //
    //     return () => clearInterval(interval);
    // }, [])

    return (
        <Box sx={{
            mt: '50px',
            mb: '5px'
        }}>
            <h1
                ref={titleRef}
                dangerouslySetInnerHTML={{__html: data}}
                style={{
                    display: 'flex',
                    fontFamily: '-apple-system',
                    // color: "white",
                    letterSpacing: '3px'
                }}
            >
                {/*{title}*/}
            </h1>
            <div
            />
            {getPopularTags(tags,)}
        </Box>
    );
}

export default Title;