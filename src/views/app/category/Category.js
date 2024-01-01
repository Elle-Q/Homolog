import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import SideBar from "./SideBar/SideBar";
import {useParams} from "react-router-dom";
import {GetCat} from "../../../api/cat.service";
import Header from "./header/header";
import Waterfall from "./waterfall/waterfall";

function Category(props) {

    let params = useParams();
    let id = params.id;
    const [category, setCategory] = useState({});

    useEffect(() => {
        GetCat(id).then((data) => {
            setCategory(data)
        })
    }, [])

    return (
        <React.Fragment>
            <Header category={category}/>
            <Box sx={{
                borderRadius: '10px',
                backgroundColor: "transparent",
                display:"flex",
                mt:'40px',
            }}>
                {/*<SideBar/>*/}
                <Waterfall catId={category.ID}></Waterfall>
            </Box>

        </React.Fragment>
    );
}

export default Category;