import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import {useParams} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {getStarIcons} from "../../../utils/ToolUtil";
import styled from "styled-components";
import AirplayIcon from '@mui/icons-material/Airplay';
import {GetItem, GetItemWithFiles} from "../../../api/item.service";
import {BigLinkButton, CartButton} from "../../../components/ui/CustomButton";
import {useDispatch} from "react-redux";
import {setItemId} from "../play/playSlice";
import catBriefInfo from "../../../json/catBriefInfo.json"
import List from "./list/list";
import Review from "./review/review";

const Container = styled.div`
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  color: white;
  position: absolute;
  top: 0;
  left: 0;

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
    const dispatch = useDispatch();
    const [item, setItem] = useState({});
    const [tab, setTab] = useState('list');

    useEffect(() => {
        const fetch = async () => {
            await GetItem(id).then((data) => {
                setItem(data)
                dispatch(setItemId(data.ID))
            })
        }
        fetch().catch()
    }, [])

    const tabClick = (tab, id) => {
        setTab(tab === '测评' ? "review" : "list");
        let allTabs = document.getElementsByName("tab");
        allTabs.forEach(tab => {
            tab.style.color = 'white';
            tab.style.borderBottom = 'none';
        })
        let tabSelect = document.getElementById(id);
        tabSelect.style.borderBottom = '3px solid #EB5050';
        tabSelect.style.color = '#EB5050';
    }

    function getTabContent(type) {
        if (type === undefined) return null;
        let tabInfo = catBriefInfo[type].tab;
        const ps = [];
        tabInfo.forEach((tab, index) => {
            let id = "tab-" + index;
            ps.push(<TabP name={'tab'} id={id} onClick={() => tabClick(tab, id)}>{tab}</TabP>)
        })
        return ps
    }

    return (
        <React.Fragment>
            <div style={{width: '100%'}}>
                <img src={`${item.Preview}`} alt='bg1'style={{width: '100%', opacity: 0.1}}/>
            </div>
            <Container>
                <Grid container
                      direction="row"
                      alignItems="flex-start"
                      justifyContent="flex-start"
                      rowSpacing={6}
                >
                    <Grid item xs={9} style={{textAlign: 'center', alignItems: 'end'}}>
                        <img src={`${item.Preview}`} alt='bg1' style={{maxWidth: '1000px', borderRadius: '25px'}}/>
                        <Stack direction={'row'} spacing={1} style={{justifyContent: "center"}}>
                            <img src={`${item.Preview}`} alt='bg1' style={{width: '1/4', maxHeight: '100px'}}/>
                            <img src={`${item.Preview}`} alt='bg1' style={{width: '1/4', maxHeight: '100px'}}/>
                            <img src={`${item.Preview}`} alt='bg1' style={{width: '1/4', maxHeight: '100px'}}/>
                            <img src={`${item.Preview}`} alt='bg1' style={{width: '1/4', maxHeight: '100px'}}/>
                        </Stack>
                    </Grid>
                    <Grid item xs={3} sx={{height: '800px'}}>
                        <Stack direction='column' spacing={2} sx={{mt: '10px'}}>
                            <img src={`${item.Preview}`} alt='bg1'
                                 style={{width: '100%', margin: "auto", borderRadius: '10px'}}/>

                            <Typography variant="h4" component="div">
                                {item.Name}
                            </Typography>

                            <Typography component="p">
                                {item.Desc}
                            </Typography>

                            <Stack>
                                <span> 作者: elle</span>
                                <span> 章节目录: >></span>
                                <span> 全部测评: 300+</span>
                                <span> 适用软件: blender</span>
                                <span> 时长: 3: 23: 00</span>
                                <span> 上传时间: 2023-10-12</span>
                            </Stack>

                            <Stack sx={{alignItems: 'center'}}>
                                {
                                    item.Price === 0 ?
                                        <BigLinkButton icon={<AirplayIcon/>} linkTo={`/app/play/${item.ID}`}/> :
                                        <CartButton icon={<ShoppingCartIcon sx={{margin: 'auto'}} fontSize="large"/>}
                                                    money={item.Price}/>
                                }
                                <StarDiv>
                                    {getStarIcons(item.Scores)}
                                </StarDiv>
                            </Stack>
                        </Stack>
                    </Grid>

                    <Grid item xs={12}>
                        <Stack direction={'row'} style={{justifyContent: 'center', borderBottom: '1px solid grey'}}>
                            {getTabContent(item.Type)}
                        </Stack>
                    </Grid>

                    <Grid item xs={12}>
                        {
                            tab === 'list' ? <List/> : <Review/>
                        }
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}

export default Item;