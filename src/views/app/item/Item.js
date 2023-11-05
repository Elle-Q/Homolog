import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import {useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {getStarIcons} from "../../../utils/ToolUtil";
import styled from "styled-components";
import AirplayIcon from '@mui/icons-material/Airplay';
import {AppGetItemFiles, GetItemFiles, listItem} from "../../../api/item.service";
import {BigLinkButton, CartButton} from "../../../components/ui/CustomButton";
import catBriefInfo from "../../../json/catBriefInfo.json"
import List from "./list/list";
import Cart from "./cart/cart";
import PrevShow from "./prev/prevShow";
import ThreeD from "../play/3d/ThreeD";
import Comments from "./comment/Comments";
import {useDispatch} from "react-redux";
import {setItem} from "./item-slice";

const Container = styled.div`
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  color: white;
  //position: absolute;
  
  & span {
    color: grey;
  }
`

const StarDiv = styled.div`
  width: 300px;
  min-height: 50px;
  background-color: rgba(19, 47, 76, 0.2);
  border-radius: 10px;
  margin-top: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e9c46a;
`

const TabP = styled.p`
  cursor: pointer;
  width: 110px;
  height: 30px;
  margin-bottom: 0;
  text-align: center;
  color: white;
  font-size: 14px;
  margin-right: 50px;

  &:hover {
    color: #EB5050;
    border-bottom: 3px solid #EB5050;
  }
`

function Item(props) {
    let params = useParams();
    let id = params.id;
    const [data, setData] = useState({});
    const [tab, setTab] = useState('list');
    let dispatch = useDispatch();

    useEffect(() => {
        const fetch = async () => {
            await AppGetItemFiles(id).then((data) => {
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
            ps.push(<TabP name={'tab'} id={"tab-".concat(index)} onClick={(event) => tabClick(tab, event)}>{tab}</TabP>)
        })
        return ps
    }

    function getPrevArea() {
        if (data.Type === 'three') {
            return <ThreeD models={data.Preview}/>
        } else {
            return <PrevShow preList={data.Preview}/>
        }
    }
    return (
        <div style={{backgroundSize:'100%',width: '100%', backgroundImage: `linear-gradient(to bottom,rgba(0, 0, 0,0.8), rgba(0, 0, 0, 0.8)),url(${data && data.Main})`}}>
            <Cart item={data}></Cart>
            <Container>
                <Grid container
                      direction="row"
                      alignItems="flex-start"
                      justifyContent="flex-start"
                >
                    {/*预览区域*/}
                    <Grid item xs={9} style={{textAlign: 'center', alignItems: 'end'}}>
                        {getPrevArea()}
                    </Grid>
                    <Grid item xs={3}>
                        <Stack direction='column' spacing={2} sx={{mt: '10px'}}>
                            <img src={data && data.Main} alt='bg1' style={{width: '100%', margin: "auto", borderRadius: '10px'}}/>
                            <Typography variant="h4" component="div">
                                {data.Name}
                            </Typography>

                            <Typography component="p">
                                {data.Desc}
                            </Typography>

                            <Stack>
                                <span> 作者: {data.Author}</span>
                                <span> 章节目录: >></span>
                                <span> 全部测评: {data.DownCnt}</span>
                                <span> 适用软件: blender</span>
                                <span> 时长: 3: 23: 00</span>
                                <span> 上传时间: 2023-10-12</span>
                            </Stack>

                            <Stack sx={{alignItems: 'center'}}>
                                {
                                    data.Price === 0 ?
                                        <BigLinkButton icon={<AirplayIcon/>} linkTo={`/app/play/${data.ID}`}/> :
                                        <CartButton icon={<ShoppingCartIcon fontSize="large"/>} money={data.Price}/>
                                }
                                <StarDiv>
                                    {getStarIcons(data.Scores)}
                                </StarDiv>
                            </Stack>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sx={{marginTop: '30px'}}>
                        <Stack direction={'row'} style={{justifyContent: 'center', borderBottom: '1px solid grey'}}>
                            {getTabContent(data.Type)}
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sx={{marginTop: '30px'}}>
                        {
                            tab === 'list' ? <List /> : <Comments/>
                        }
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Item;