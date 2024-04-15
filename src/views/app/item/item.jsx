import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import {useNavigate, useParams} from "react-router-dom";
import Stack from "@mui/material/Stack";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {downloadAttachment, GetItem, TotalSizeByAction} from "../../../api/item.service";
import List from "./list/list";
import PrevShow from "./prev/prev-show";
import {useDispatch} from "react-redux";
import {setItem} from "../../../store/item-slice";
import {openSider} from "../../../store/sider-slice";
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from "@mui/material/IconButton";
import {addItem2Cart} from "../../../api/cart.service";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {toggleAtion} from "../../../api/action.service";
import Divider from "@mui/material/Divider";
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import "./item.scss"
import Comment from "../../../components/comment/comment";
import IconBadge from "../../../components/button/icon-badge";
import {CountComment} from "../../../api/comment.service";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import {isJson} from "../../../utils/ToolUtil";

function Item() {
    let params = useParams();
    let id = params.id;

    const [data, setData] = useState({});
    const [tab, setTab] = useState('review');
    const [selectedFormat, setSelectedFormat] = useState("")
    const navigate = useNavigate();
    const [commentsSize, setCommentsSize] = useState(0);
    const [likes, setLikes] = useState(0);
    const [collects, setCollects] = useState(0);
    let dispatch = useDispatch();

    useEffect(() => {
        CountComment("item", id).then(resp => {
            setCommentsSize(resp)
        })
        TotalSizeByAction(id, "like").then(resp => {
            setLikes(resp.like)
            setCollects(resp.collect)
        })
    }, [id]);


    useEffect(() => {
        const fetch = async () => {
            await GetItem(id).then((data) => {
                setData(data)
                if (data.attachments.length > 0) {
                    setSelectedFormat(data.attachments[0].format)
                }
                dispatch(setItem(data))
            })
        }
        fetch().catch()
    }, [])

    //加入购物车
    const handleAdd2Cart = () => {
        addItem2Cart(id).then(resp => {
            dispatch(openSider())
        })
    }

    //点击下载源文件
    const handleDownload = () => {
        downloadAttachment(id, selectedFormat).then(resp => {
            window.location.href = resp
        })
    }

    //获取资源的部分描述信息
    const getMark = () => {
        if (!data || !data.mark || data.mark.trim().length === 0 || !isJson(data.mark)) return
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
                setLikes(likes + 1)
                newData = {...newData, liked: data.liked + 1}
            } else {
                setLikes(likes - 1)
                newData = {...newData, liked: data.liked - 1}
            }
            setData(newData)
        })
    }

    const handleCollect = () => {
        toggleAtion(data.id, 'collect').then(resp => {
            let newData = {...data, collected: resp}
            if (resp) {
                setCollects(collects + 1)
                newData = {...newData, collectCnt: data.collectCnt + 1}
            } else {
                setCollects(collects - 1)
                newData = {...newData, collectCnt: data.collectCnt - 1}
            }
            setData(newData)
        })
    }

    return (
        <div className="item-container">
            <Grid container direction="row">
                {/*上左 预览区域*/}
                <Grid item xs={9}
                      container
                      direction="column"
                      style={{textAlign: 'center', display: "flex"}}>
                    <PrevShow preList={data.previews}/>
                </Grid>
                {/*上右 详情信息区域*/}
                <Grid item xs={3}>
                    <Stack direction='column' spacing={2} sx={{mt: '10px', ml: '20px'}}>
                        <div style={{width: '100%'}}>
                            <img src={data && data.main && data.main.link} alt="bg" className="main-img"/>
                        </div>

                        <h1> {data.name} </h1>
                        <p> {data.desp} </p>

                        <Stack>
                            <span> 价格: ￥{data.price}</span>
                            <span> 作者: {data.author}</span>
                            <span> 资源类型: {data.type}</span>
                            {data.platform && <span> 附件包含: {data.platform}</span>}
                            {getMark()}
                        </Stack>

                        <Stack className="behave-area">
                            <span> 有{data.downCnt}人下载了该资源 </span>
                        </Stack>

                        <Divider sx={{backgroundColor: '#403D39'}}/>
                        <h5>选择下载格式：</h5>
                        <Stack direction='row' sx={{flexWrap: 'wrap', justifyContent: 'flex-start'}}>
                            {
                                data.attachments && data.attachments.map(atta => (
                                    <span key={atta.id}
                                          className={`format-label ${selectedFormat === atta.format && 'select'}`}
                                          onClick={() => setSelectedFormat(atta.format)}
                                    >
                                        {atta.format}
                                    </span>
                                ))
                            }
                        </Stack>

                        <Stack sx={{alignItems: 'center'}}>
                            {
                                data.type === 'tutorial' &&
                                <div className="icon-container">
                                    <IconButton onClick={() => navigate(`/play/${data.id}`)}>
                                        <SlowMotionVideoIcon fontSize="large" sx={{color: "white"}}/>
                                    </IconButton>
                                </div>
                            }
                            <div className="icon-container">
                                {
                                    data.bought ?
                                        <React.Fragment>
                                            <IconButton onClick={handleDownload}>
                                                <DownloadIcon fontSize="large" sx={{color: "white"}}/>
                                            </IconButton>
                                        </React.Fragment>
                                        :
                                        <IconButton onClick={handleAdd2Cart}>
                                            <AddShoppingCartIcon fontSize="large" sx={{color: "white"}}/>
                                            <span style={{fontSize: '14px'}}>加入购物车</span>
                                        </IconButton>
                                }
                            </div>
                            <div className="icon-container">
                                <IconBadge cnt={commentsSize}
                                           icon={<ModeCommentOutlinedIcon className="icon-badge__icon"
                                                                          fontSize="large"/>}
                                           fontSize="large"/>
                                <IconBadge cnt={likes}
                                           handleClick={handleLike}
                                           icon={<ThumbUpOffAltIcon
                                               className={`${data.liked ? 'icon-badge__icon--selected-primary' : ''} icon-badge__icon`}
                                               fontSize="large"/>}
                                           fontSize="large"/>
                                <IconBadge cnt={collects}
                                           handleClick={handleCollect}
                                           icon={<FavoriteIcon
                                               className={`${data.collected ? 'icon-badge__icon--selected-pink' : ''} icon-badge__icon`}
                                               fontSize="large"/>}
                                           fontSize="large"/>
                            </div>
                            <Comment rescType="item"
                                     rescId={id}
                                     fontSize="large"/>
                        </Stack>
                    </Stack>
                </Grid>

                <Grid item xs={12} sx={{marginTop: '30px', display: 'flex'}}>
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