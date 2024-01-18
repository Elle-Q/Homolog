import React, {useEffect, useState} from 'react';
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Model from "../../../../assets/menu/3d.svg";
import Texture from "../../../../assets/menu/texture.svg";
import Doc from "../../../../assets/menu/book.svg";
import Tutorial from "../../../../assets/menu/video.svg";
import Soft from "../../../../assets/menu/soft.svg";
import Image from "../../../../assets/menu/image.svg";
import './searchbar.scss'
import {ListMetrics} from "../../../../api/cat.service";

const navCats = [
    {
        'name': '模型',
        'icon': Model,
        'id': 7
    },
    {
        'name': '贴图',
        'icon': Texture,
        'id': 1
    },
    {
        'name': '文档',
        'icon': Doc,
        'id': 5
    },
    {
        'name': '教程',
        'icon': Tutorial,
        'id': 3
    },
    {
        'name': '软件',
        'icon': Soft,
        'id': 2
    },
    {
        'name': '纯图片',
        'icon': Image,
        'id': 6
    },
]


function SearchBar(props) {
    const {handleClickNavCat, handleClickMetric} = props

    const [metrics, setMetrics] = useState([])
    const [catId, setCatId] = useState(null);

    useEffect(() => {
        ListMetrics(catId).then((metrics) => {
            setMetrics(metrics)
        })
    }, [catId]);

    const handleNavCatClick = (event, catId) => {
        let elements = document.getElementsByClassName("nav-cat");
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.borderBottom = 'none';
        }
        event.target.closest('div').style.borderBottom = '3px solid #595DFD';
        setCatId(catId);
        handleClickNavCat(catId)
    }

    const handleMetricClick = (event, metric) => {
        let elements = document.getElementsByClassName("metric-container");
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.borderBottom = 'none';
        }
        event.target.closest('div').style.borderBottom = '3px solid #595DFD';
        handleClickMetric(metric)
    }

    return (
        <div>
            <div className="navcat-container">
                <Stack direction="row" spacing={1}>
                    {
                        navCats.map((navCat, index) => (
                            <div className="nav-cat" onClick={(event) => handleNavCatClick(event, navCat.id)}
                                 key={index}>
                                <IconButton> <img alt="icon" src={navCat.icon}/> </IconButton>
                                <span>{navCat.name}</span>
                            </div>
                        ))
                    }
                </Stack>
                {/*<Divider variant="middle"/>*/}
                {/*{getPopularTags(tags, '热门标签:')}*/}
            </div>
            <Stack direction="row" flexWrap="wrap" gap={1} sx={{justifyContent: 'center'}}>
                {
                    metrics.map((metric, index) => (
                        <div className="metric-container" key={index} onClick={(event) => handleMetricClick(event, metric.alias)}>
                            <img src={metric.preview} alt="item"/>
                            <span> {metric.name} </span>
                        </div>
                    ))
                }
            </Stack>
        </div>
    );
}

export default SearchBar;