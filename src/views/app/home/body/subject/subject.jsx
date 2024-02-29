import React from 'react';
import Stack from "@mui/material/Stack";
import ItemCard from "../../../../../components/item-card/item-card";
import AnimationText from "../../../../../components/AnimationText";
import GradientButton from "../../../../../components/ui/GradientButton";
import {Link} from "react-router-dom";
import "./subject.scss"

function Subject(props) {
    const {subject} = props;

    if (subject === undefined || subject.items.length < 1) return <></>

    return (
        <React.Fragment>
            <div className="subject-header">
                <div>
                    <AnimationText title={subject.title}/>
                    &nbsp;&nbsp;
                    <AnimationText title={subject.subTitle}
                                   fontSize={15}
                                   spacing={1}
                                   color='white'
                                   display="inline"
                    />
                </div>
                <div className="btn-container">
                    <Link to={`/search?catId=${subject.id}`}>
                        <GradientButton name="更多"
                                        color="linear-gradient(to right, #8184FF 0%, #595DFD 51%, #8184FF 100%)"/>
                    </Link>
                </div>
            </div>
            <Stack
                direction='row'
                spacing={2}
                sx={{mt: '20px'}}
                justifyContent="center"
                display="flex"
            >
                {
                    subject.items.map((item, index) => {
                        return <ItemCard key={index} item={item} width="23%"/>
                    })
                }
            </Stack>
        </React.Fragment>

    );
}

export default Subject;