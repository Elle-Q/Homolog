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
import {getOrderStatus} from "../../../../utils/ToolUtil";
import {delOrder} from "../../../../api/order.service";
import {setOpen} from "../../../../components/alert/confirm/confirmSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {addItem2Cart} from "../../../../api/cart.service";
import {openSider, setData, setShow} from "../../../../store/sider-slice";
import Countdown from "../../../../components/countdown/countdown";

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
        <div className="order-card">
            <ColoredLabel color={orderStatus.color}
                          content={orderStatus.text}
                          className="order-card__fixed-label"/>
            <div className="order-card__heading">
                <span>订单编号: {order.id}</span>
                <Divider orientation="vertical"/>
                <span>创建时间: {order.createTime}</span>
                {
                    order.payCode && <span>支付单号: {order.payCode}</span>
                }
            </div>
            <Divider sx={{width: '100%'}}/>
            <Stack direction="row" className="order-card__body" spacing={3}>
                <div className="order-card__cell order-card__cell--item" onClick={handleShowDetail}>
                    {
                        thumbnails.map(thumbnail => (<img key={thumbnail.itemId} src={thumbnail.main} alt="thumbnail"/>))
                    }
                    <MoreHorizIcon fontSize="large" sx={{color: 'rgb(65,63,63)', cursor: 'pointer'}}/>
                </div>

                <Divider orientation="vertical" flexItem/>
                <span className="order-card__cell--price">￥{order.totalPrice}</span>
                <Divider orientation="vertical" flexItem/>

                <div className="order-card__cell order-card__cell--text">
                    {
                        order.status !== 'closed' ?
                            <React.Fragment>
                                <p className="order-card__cell--text--waitpay">等待付款</p>
                                <Countdown date={order.createTime} expire={86400}/>
                                {/*<span className="order-card__cell--text--countdown">23:59:04</span>*/}
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <span>付款成功</span>
                                <span className="order-card__cell--text--sub-span"> {order.payChannel === 'wepay' ? '微信支付' : '支付宝'}</span>
                            </React.Fragment>
                    }
                </div>

                <Divider orientation="vertical" flexItem/>

                <div className="order-card__cell order-card__cell--text">
                    <p>付款时间</p>
                    <span className="order-card__cell--text--sub-span">{order.payTime ? order.payTime : '-'}</span>
                </div>

                <Divider orientation="vertical" flexItem/>

                <div className="order-card__cell order-card__cell--btn">
                    {order.status === 'open' && <Button onClick={handleGoPay}>立即支付</Button>}
                    {order.status !== 'closed' && <Button onClick={handleCancelOrder}>取消订单</Button>}
                    {order.status === 'closed' && <Button onClick={handleHelp}>申请售后</Button>}
                </div>
            </Stack>

            <div hidden={!showDetail} className="fadein">
                {
                    details.map(detail => (
                        <Stack key={detail.itemId} direction="row"
                               className="order-detail-body"
                               spacing={2}>
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
                            </div>
                        </Stack>
                    ))
                }
            </div>
        </div>
    );
}

export default Card;