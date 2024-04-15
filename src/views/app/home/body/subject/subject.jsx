import React from 'react';
import Stack from "@mui/material/Stack";
import ItemCard from "../../../../../components/item-card/item-card";
import {Link} from "react-router-dom";
import "./subject.scss"
import Button from "@mui/material/Button";

function Subject(props) {
    const {subject} = props;

    if (subject === undefined || subject.items.length < 1) return <></>

    return (
        <div className="subject">
            <div className="subject__heading-box">
                <div>
                    <h1 className="subject__heading subject__heading--main">
                        <span>{subject.title}</span>
                    </h1>
                    <h1 className="subject__heading subject__heading--sub">
                        <span>{subject.subTitle}</span>
                    </h1>
                </div>
                <Link to={`/search?catId=${subject.id}`} className="subject__btn-box">
                    <button className="subject__btn">更多</button>
                </Link>
            </div>
            <Stack
                direction='row'
                spacing={2}
                justifyContent="center"
                display="flex"
            >
                {
                    subject.items.map((item, index) => {
                        return <ItemCard key={index} item={item} width="23%"/>
                    })
                }
            </Stack>
        </div>

    );
}

export default Subject;