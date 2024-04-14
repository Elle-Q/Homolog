import React, {useEffect, useState} from 'react';
import Stack from "@mui/material/Stack";
import Model from "../../../../assets/menu/3d.svg";
import Texture from "../../../../assets/menu/texture.svg";
import Doc from "../../../../assets/menu/book.svg";
import Tutorial from "../../../../assets/menu/video.svg";
import Soft from "../../../../assets/menu/soft.svg";
import Image from "../../../../assets/menu/image.svg";
import All from "../../../../assets/menu/all.svg";
import {ListMetrics} from "../../../../api/cat.service";
import {useLocation, useNavigate} from "react-router-dom";
import {updateUrl} from "../../../../utils/ToolUtil";
import "../search.scss"

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
    {
        'name': '全部',
        'icon': All,
        'id': 0
    },
]


function Navbar(props) {
    const {catId} = props
    const [metrics, setMetrics] = useState([])
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        ListMetrics(catId).then((metrics) => {
            setMetrics(metrics)
        })
    }, [catId]);

    const handleNavCatClick = (event, catId) => {
        let elements = document.getElementsByClassName("search__nav-bar");
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.borderBottom = 'none';
        }
        event.target.closest('div').style.borderBottom = '3px solid #595DFD';
        updateQueryUrl("catId", catId)
    }

    const handleMetricClick = (event, metric) => {
        let elements = document.getElementsByClassName("search__nav-metric");
        for (let i = 0; i < elements.length; i++) {
            elements[i].style.borderBottom = 'none';
        }
        event.target.closest('div').style.borderBottom = '3px solid #595DFD';
        updateQueryUrl("metric", metric)
    }

    const updateQueryUrl = (key, newValue) => {
        let url = updateUrl(key, newValue, location.search, location.pathname)
        navigate(url)
    };

    return (
        <div>
            <div className="search__nav-box">
                <Stack direction="row" spacing={1}>
                    {
                        navCats.map((navCat, index) => (
                            <div className="search__nav-bar"
                                 style={{borderBottom: `${navCat.id === catId && '.2rem solid #868cea' }`}}
                                 onClick={(event) => handleNavCatClick(event, navCat.id)}
                                 key={index}>
                                <img alt="icon" src={navCat.icon}/>
                                <span>{navCat.name}</span>
                            </div>
                        ))
                    }
                </Stack>
                {/*<Divider variant="middle"/>*/}
                {/*{getPopularTags(tags, '热门标签:')}*/}
            </div>
            <Stack direction="row" flexWrap="wrap" gap={1}>
                {
                    metrics.map((metric, index) => (
                        <div className="search__nav-metric"
                             key={index}
                             onClick={(event) => handleMetricClick(event, metric.alias)}>
                            <img src={metric.preview} alt="item"/>
                            <span> {metric.name} </span>
                        </div>
                    ))
                }
            </Stack>
        </div>
    );
}

export default Navbar;