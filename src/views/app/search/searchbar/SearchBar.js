import React, {useEffect, useState} from 'react';
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Model from "../../../../assets/menu/3d.svg";
import Texture from "../../../../assets/menu/texture.svg";
import Doc from "../../../../assets/menu/book.svg";
import Tutorial from "../../../../assets/menu/video.svg";
import Soft from "../../../../assets/menu/soft.svg";
import './searchbar.scss'
import {ListMetrics} from "../../../../api/cat.service";

const navCats = [
    {
        'name': '模型',
        'cat': 'model',
        'icon': Model
    },
    {
        'name': '贴图',
        'cat': 'texture',
        'icon': Texture
    },
    {
        'name': '文档',
        'cat': 'doc',
        'icon': Doc
    },
    {
        'name': '教程',
        'cat': 'tutorial',
        'icon': Tutorial
    },
    {
        'name': '软件',
        'cat': 'soft',
        'icon': Soft
    },
]


function SearchBar(props) {
    const {handleClickNavCat, handleClickMetric} = props

    const [metrics, setMetrics] = useState([])
    const [cat, setCat] = useState(null);

    useEffect(() => {
        ListMetrics(cat).then((metrics) => {
            setMetrics(metrics)
        })
    }, [cat]);

    const handleNavCatClick = (event, catName) => {
        let elements = document.getElementsByClassName("nav-cat");
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.borderBottom = 'none';
        }
        event.target.closest('div').style.borderBottom = '3px solid #595DFD';
        setCat(catName);
        handleClickNavCat(catName)
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
                            <div className="nav-cat" onClick={(event) => handleNavCatClick(event, navCat.cat)}
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