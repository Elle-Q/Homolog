import React, {useEffect, useState} from 'react';
import Stack from "@mui/material/Stack";
import "../search.scss"
import {AllMenu} from "../../../../api/cat.service";
import {useNavigate, useParams} from "react-router-dom";


function Navbar(props) {
    let params = useParams();
    let curCat = params.cat ? params.cat : "model";
    const [cats, setCats] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        AllMenu().then(resp => {
            setCats(resp)
        })
    }, []);

    const handleClick = (cat) => {
        navigate(`/search/${cat}`)
    }
    return (
        <div>
            <div className="search__nav-box">
                <Stack direction="row" spacing={1}>
                    {
                        cats.map((navCat, index) => (
                            <div key={index}
                                 className={`search__nav-link ${navCat.link === curCat ? 'search__nav-link--active' : ''}`}>
                                <a key={index} onClick={() => handleClick(navCat.link)}>
                                    <img alt="icon" src={navCat.icon}/>
                                    <span>{navCat.name}</span>
                                </a>
                                <div className="search__nav-menu">
                                    {navCat.sub.map(col => (
                                        <div key={col.name}
                                             className={`search__nav-menu--col ${(col.link === 'game' || navCat.link === 'tutorial') ? 'search__nav-menu--col-wider' : ''}`}>
                                            <h1>{col.name}</h1>
                                            {
                                                col.sub.map(sub => (
                                                    <div className="search__nav-menu--row" key={sub.name}>
                                                        <a className="search__nav-menu-link search__nav-menu-link--main"
                                                           onClick={() => navigate(`/search/${navCat.link}/${col.link}-${sub.link}`)}>
                                                            <span>{sub.name}</span>
                                                            <span className="span--cnt">{sub.cnt}</span>
                                                        </a>
                                                        <br/>
                                                        {sub.sub.map(child => (
                                                            <a className="search__nav-menu-link search__nav-menu-link--sub"
                                                               key={child.name}
                                                               onClick={() => navigate(`/search/${navCat.link}/${col.link}-${child.link}`)}>
                                                                <span>{child.name}</span>
                                                                <span className="span--cnt">{child.cnt}</span>
                                                            </a>
                                                        ))}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ))}

                                </div>
                                <div className="search__nav-overlay"></div>
                            </div>
                        ))
                    }
                </Stack>
                {/*<Divider variant="middle"/>*/}
                {/*{getPopularTags(tags, '热门标签:')}*/}
            </div>
            {/*<Stack direction="row" flexWrap="wrap" gap={1}>*/}
            {/*    {*/}
            {/*        metrics.map((metric, index) => (*/}
            {/*            <div className="search__nav-metric"*/}
            {/*                 key={index}*/}
            {/*                 onClick={(event) => handleMetricClick(event, metric.alias)}>*/}
            {/*                <img src={metric.preview} alt="item"/>*/}
            {/*                <span> {metric.name} </span>*/}
            {/*            </div>*/}
            {/*        ))*/}
            {/*    }*/}
            {/*</Stack>*/}
        </div>
    );
}

export default Navbar;