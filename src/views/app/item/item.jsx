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
import {ThumbUpButton} from "../../../components/ui/IconButton";
import {openSider} from "../../../store/sider-slice";
import DownloadIcon from '@mui/icons-material/Download';
import "./item.scss"
import IconButton from "@mui/material/IconButton";
import {addItem2Cart} from "../../../api/cart.service";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {toggleAtion} from "../../../api/action.service";


function Item() {
    let params = useParams();
    let id = params.id;

    const [data, setData] = useState(null);
    const [tab, setTab] = useState('review');
    let dispatch = useDispatch();

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
        addItem2Cart(id).then(resp => {
            dispatch(openSider())
        })
    }

    //点击下载源文件
    const handleDownload = () => {

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

    const handleLike = () => {
        toggleAtion(data.id, 'like').then(resp => {
            let newData = {...data, liked: resp}
            if (resp) {
                newData = {...newData, liked: data.liked+1}
            } else {
                newData = {...newData, liked: data.liked-1}
            }
            setData(newData)
        })
    }

    const handleCollect = () => {
        toggleAtion(data.id, 'collect').then(resp => {
            let newData = {...data, collected: resp}
            if (resp) {
                newData = {...newData, collectCnt: data.collectCnt+1}
            } else {
                newData = {...newData, collectCnt: data.collectCnt-1}
            }
            setData(newData)
        })
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
                            <span> 有{data.likeCnt}人觉得该资源很赞 </span>
                            <span> 有{data.downCnt}人下载了该资源 </span>
                            <span> 有{data.collectCnt}人收藏了该资源 </span>
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
                                <ThumbUpButton onClick={handleLike} color={`${data.liked ? '#595DFD': 'white'}`}></ThumbUpButton>
                                <IconButton onClick={handleCollect}>
                                    <FavoriteIcon fontSize="small" sx={{color: `${data.collected ? '#ff0a54' : 'white'}`}}/>
                                </IconButton>
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