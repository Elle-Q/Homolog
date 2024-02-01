import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import {useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {GetItem} from "../../../api/item.service";
import catBriefInfo from "../../../json/catBriefInfo.json"
import List from "./list/list";
import PrevShow from "./prev/prev-show";
import {useDispatch} from "react-redux";
import {setItem} from "./item-slice";
import {ThumbDownButton, ThumbUpButton} from "../../../components/ui/IconButton";
import {addItem, openCart} from "../cart/cart-slice";
import DownloadIcon from '@mui/icons-material/Download';
import "./item.scss"
import IconButton from "@mui/material/IconButton";


function Item() {
    let params = useParams();
    let id = params.id;
    let dispatch = useDispatch();
    const [data, setData] = useState(null);
    const [tab, setTab] = useState('review');
    const [applyFor, setApplyFor] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            await GetItem(id).then((data) => {
                setData(data)
                dispatch(setItem(data))
            })
        }
        fetch().catch()
    }, [])

    const tabClick = (tab, event) => {
        setTab(tab === '测评' ? "review" : "list");
        let allTabs = document.getElementsByName("tab");
        allTabs.forEach(tab => {
            tab.style.color = 'white';
            tab.style.borderBottom = 'none';
        })
        event.target.style.borderBottom = '3px solid #EB5050';
        event.target.style.color = '#EB5050';
    }

    function getTabContent(type) {
        if (type === undefined) return null;
        let tabInfo = catBriefInfo[type].tab;
        const ps = [];
        tabInfo.forEach((tab, index) => {
            ps.push(<p className="tab" id={"tab-".concat(index)} onClick={(event) => tabClick(tab, event)}>{tab}</p>)
        })
        return ps
    }

    //加入购物车
    const handleAdd2Cart = () => {
        dispatch(openCart())
        dispatch(addItem(data))
    }

    //点击下载源文件
    const handleDownload = () => {
        if (applyFor == null) {
            window.location.href = data.attachments[0].link
        }
    }

    //获取资源的部分描述信息
    const getMark = () => {
        if (!data || !data.mark) return
        let json = JSON.parse(data.mark)
        let spans = []
        Object.keys(json).forEach(key => {
            spans.push(<span>{key}:{json[key]}</span>)
        });
        return spans
    }

    if (data == null) {
        return <React.Fragment/>
    }
    return (
        <div className="item-container">
            <Grid container direction="row">
                {/*上左 预览区域*/}
                <Grid item xs={9} direction="column"
                      style={{textAlign: 'center', justifyContent: 'space-between', display: "flex"}}>
                    <PrevShow preList={data.previews}/>
                </Grid>
                {/*上右 详情信息区域*/}
                <Grid item xs={3}>
                    <Stack direction='column' spacing={2} sx={{mt: '10px', ml: '20px'}}>
                        <div style={{width: '100%'}}>
                            <img src={data && data.main && data.main.link} alt="bg" className="main-img"/>
                        </div>
                        <Typography component="h4"> {data.name} </Typography>
                        <Typography component="p"> {data.desp} </Typography>

                        <Stack>
                            <span> 价格: ￥{data.price}</span>
                            <span> 作者: {data.author}</span>
                            <span> 资源类型: {data.type}</span>
                            {
                                getMark()
                            }
                        </Stack>

                        <Stack className="behave-area">
                            <span> 有255人觉得该资源很赞 </span>
                            <span> 有550人下载了该资源 </span>
                            <span> 有550人收藏了该资源 </span>
                        </Stack>

                        <Stack sx={{alignItems: 'center'}}>
                            <div className="icon-container">
                                {
                                    data.price === 0 ?
                                        <IconButton onClick={handleDownload}><DownloadIcon fontSize="large"
                                                                                           sx={{color: "red"}}/>
                                        </IconButton> :
                                        <IconButton onClick={handleAdd2Cart}><AddShoppingCartIcon fontSize="large"
                                                                                                  sx={{color: "red"}}/>
                                            <span style={{fontSize: '14px'}}>加入购物车</span>
                                        </IconButton>
                                }
                            </div>
                            <div className="icon-container">
                                <ThumbUpButton></ThumbUpButton>
                                <ThumbDownButton></ThumbDownButton>
                            </div>
                        </Stack>
                    </Stack>
                </Grid>

                <Grid item xs={12} sx={{marginTop: '30px'}}>
                    {/*<Stack direction={'row'} style={{justifyContent: 'center', borderBottom: '1px solid grey'}}>*/}
                    {/*    {getTabContent(data.type)}*/}
                    {/*</Stack>*/}
                </Grid>

                <Grid item xs={12} sx={{marginTop: '30px'}}>
                    {
                        tab === 'list' ? <List/> : <React.Fragment/>/*<Comments/>*/
                    }
                </Grid>
            </Grid>
        </div>
    );
}

export default Item;