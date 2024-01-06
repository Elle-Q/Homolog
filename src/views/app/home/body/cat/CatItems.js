import React from 'react';
import Stack from "@mui/material/Stack";
import ItemCard from "./ItemCard";
import AnimationText from "../../../../../components/AnimationText";
import GradientButton from "../../../../../components/ui/GradientButton";
import {Link} from "react-router-dom";

function CatItems(props) {
    const {catItem} = props;

    if (catItem === undefined || catItem.items.length < 1) return <></>

    return (
        <React.Fragment>
            <div style={{display: 'grid',gridTemplateColumns:'70% 30%'}}>
                <div style={{gridColumn: 2/3}}>
                    <AnimationText title={catItem.title}/>
                    &nbsp;&nbsp;
                    <AnimationText title={catItem.subTitle}
                                   fontSize={15}
                                   spacing={1}
                                   color='white'
                                   display="inline"
                    />
                </div>
                <div style={{display:'flex', alignItems: 'center',justifyContent:"flex-end"}}>
                    <Link to={`/app/search`}>
                        <GradientButton name="更多" color="linear-gradient(to right, #8184FF 0%, #595DFD 51%, #8184FF 100%)"/>
                    </Link>
                </div>
            </div>
            <Stack direction='row'
                   spacing={2}
                   sx={{mt: '20px'}}
                   justifyContent="center"
                   display="flex"
            >
                {
                    catItem.items.map((item, index) => {
                        return <ItemCard key={index} item={item}/>
                    })
                }
            </Stack>
        </React.Fragment>

    );
}

export default CatItems;