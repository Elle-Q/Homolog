import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import CatItems from "./cat/CatItems";
import Box from "@mui/material/Box";
import {ListAllCat, ListCats, ListCatsWith4Items} from "../../../../api/cat.service";
import styled from "styled-components";
import CatCard from "./cat/CatCard";

const CatNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
`;

function Body(props) {

    const [cats, setCats] = useState([]);
    const [catItems, setCatItems] = useState([]);

    //查询所有category分类, 每个分类显示4个item卡片
    useEffect(() => {
        const fetchCatsData = async () => {
            await ListAllCat().then(data => {
                setCats(data)
            })
        }
        const fetchData = async () => {
            await ListCatsWith4Items().then(data => {
                setCatItems(data)
            })
        }
        fetchCatsData().catch()
        fetchData().catch()
    }, [])

    return (
        <Box sx={{
            width: '80%',
            ml: '10%',
            mr: '10%',
            mt: '20px',
            overflow: "hidden",
        }}>
            <Grid container
                  spacing={5}
                  direction="column"
                  alignItems="center"
            >
                <Grid item xs={12} justifyItems={"center"} justifyContent={"center"}>
                    <CatNav>
                        {
                            cats.map((cat, i) => (
                                <CatCard key={i} index={i} cat={cat}/>
                            ))
                        }
                    </CatNav>
                </Grid>
                {
                    catItems && catItems.map((catItem, index) => {
                        if (catItem.items.length === 0) return (<React.Fragment/>)
                        return (
                            <Grid item xs={12} key={index}>
                                <CatItems catItem={catItem}/>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Box>
    );
}

export default Body;