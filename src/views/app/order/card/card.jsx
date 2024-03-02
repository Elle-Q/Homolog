import React, {useEffect, useState} from 'react';
import './card.scss'
import ColoredLabel from "../../../../components/ui/ColoredLabel";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {getOrderStatus} from "../../../../utils/ToolUtil";
import {delOrder} from "../../../../api/order.service";
import {setOpen} from "../../../../components/alert/confirm/confirmSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {addItem2Cart} from "../../../../api/cart.service";
import {openSider, setData, setShow} from "../../../../store/sider-slice";

function Card(props) {
    const {data, cancelOrder} = props;
    const [order, setOrder] = useState({})
    const [details, setDetails] = useState([])
    const [thumbnails, setThumbnails] = useState([])
    const [showDetail, setShowDetail] = useState(false)
    const [orderStatus, setOrderStatus] = useState({color: '#595DFD'})
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setOrder(data.order)
        setDetails(data.details)
        setThumbnails(data.details.slice(0, 2))
        setOrderStatus(getOrderStatus(data.order.status))
    }, [data]);

    const handleShowDetail = () => {
        setShowDetail(!showDetail)
    }
    const handleGoPay = () => {
        dispatch(openSider())
        dispatch(setShow('pay'))
        dispatch(setData(data))
    }

    const handleCancelOrder = () => {
        let ops = () => {
            delOrder(order.id).then(resp => {
                cancelOrder()
            })
        }
        dispatch(setOpen({
            open: true,
            okHandle: ops
        }));
    }

    const handleHelp = () => {

    }

    const handleReadd2Cart = (itemId) => {
        addItem2Cart(itemId).then(resp => {
            dispatch(openSider())
        })
    }

    return (
        <div className="order-card-container">
            <ColoredLabel color={orderStatus.color} content={orderStatus.text} style={{
                fontWeight: 'bold',
                fontSize: '12px',
                right: -10,
                top: -10,
                position: "absolute",
                padding: '5px 8px',
                zIndex: 10,
            }}/>
            <div>
                <span>订单编号: {order.id}</span>
                <Divider orientation="vertical" sx={{display: 'inline', backgroundColor: 'rgb(65,63,63)',}}/>
                <span>创建时间: {order.createTime}</span>
                <span></span>
            </div>
            <Divider sx={{backgroundColor: 'rgb(65,63,63)', width: '100%'}}/>
            <Stack direction="row" className="order-card-body" spacing={3}>
                <div className="cell">
                    {
                        thumbnails.map(thumbnail => {
                            return <img style={{width: 'auto', height: '50px', borderRadius: '5px'}}
                                        src={thumbnail.main}/>
                        })
                    }
                    <MoreHorizIcon
                        onClick={handleShowDetail}
                        fontSize="large"
                        sx={{color: 'rgb(65,63,63)', cursor: 'pointer'}}/>
                </div>
                <Divider orientation="vertical" flexItem/>
                <span>￥{order.totalPrice}</span>

                <Divider orientation="vertical" flexItem/>
                <div className="text-cell">
                    {
                        order.status !== 'closed' ?
                        <React.Fragment>
                            <p style={{margin: '0', color: '#f02d2d'}}>等待付款</p>
                            <span className="count-down">23:59:04</span>
                        </React.Fragment>
                            :
                            <p style={{color: '#7b7b7b'}}>付款成功</p>
                    }
                </div>

                <Divider orientation="vertical" flexItem/>
                <div className="text-cell">
                    <p style={{margin: '0', color: '#7b7b7b'}}>付款时间</p>
                    <span>{order.payTime ? order.payTime : '-'}</span>
                </div>

                <Divider orientation="vertical" flexItem/>
                <div className="cell">
                    {order.status === 'open' && <Button onClick={handleGoPay}>立即支付</Button>}
                    {order.status !== 'closed' && <Button onClick={handleCancelOrder}>取消订单</Button>}
                    {order.status === 'closed' && <Button onClick={handleHelp}>申请售后</Button>}
                </div>
            </Stack>

            <div hidden={!showDetail}>
                {
                    details.map(detail => (<Stack direction="row" className="order-detail-body" spacing={2}>
                            <div className="cell">
                                <img alt="thumbnail" src={detail.main}/>
                            </div>
                            <Divider orientation="vertical" flexItem/>

                            <span>{detail.name}</span>
                            <Divider orientation="vertical" flexItem/>

                            <span>{detail.author}</span>
                            <Divider orientation="vertical" flexItem/>

                            <span>{detail.type}</span>
                            <Divider orientation="vertical" flexItem/>

                            <span>￥{detail.price}</span>
                            <Divider orientation="vertical" flexItem/>

                            <span>￥{detail.actualPrice}</span>
                            <Divider orientation="vertical" flexItem/>

                            <div className="cell">
                                <Tooltip title="查看资源">
                                    <IconButton onClick={() => navigate(`/item/${detail.itemId}`)}>
                                        <RemoveRedEyeIcon sx={{fontSize: '14px'}}/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="重新加入购物车">
                                    <IconButton onClick={() => handleReadd2Cart(detail.itemId)}>
                                        <AddShoppingCartIcon sx={{fontSize: '14px'}}/>
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </Stack>
                    ))
                }
            </div>
        </div>
    );
}

export default Card;