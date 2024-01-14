import React, {useEffect, useState} from 'react';
import Subject from "./subject/subject";
import {ListAllCat, ListCatsWith4Items} from "../../../../api/cat.service";
import CatCard from "./cat-card/cat-card";
import "./body.scss"

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
        <div className="body-container">
            <div className="cat-container">
                {
                    cats.map((cat, i) => (
                        <CatCard key={i} index={i} cat={cat}/>
                    ))
                }
            </div>
            {
                catItems && catItems.map((catItem, index) => {
                    return (<Subject subject={catItem}/>)
                })
            }
        </div>
    );
}

export default Body;