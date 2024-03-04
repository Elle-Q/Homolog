import React, {useEffect, useState} from 'react';
import Button from "@mui/material/Button";
import '../cart/cart.scss'
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import wepay from '../../../assets/icons/wepay.svg'
import alipay from '../../../assets/icons/alipay.svg'
import Divider from "@mui/material/Divider";
import Agreement from "../../login/agreement/agreement";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {useDispatch, useSelector} from "react-redux";
import {setRefresh} from "../../../store/order-slice";
import {closeSider, selectSider, setShow} from "../../../store/sider-slice";
import {createOrder} from "../../../api/pay.service";
import {checkOrderStatus} from "../../../api/order.service";
import Qrcode from "./qrcode/qrcode";

function Pay(props) {

    const {order} = useSelector(selectSider);
    const [orderDetail, setOrderDetail] = useState({})
    const [agree, setAgree] = useState(false)
    const [openPayCode, setOpenPayCode] = useState(false)
    const [payCodeUri, setPayCodeUri] = useState("")
    const [payChannel, setPayChannel] = useState("")
    const [timer, setTimer] = useState("")
    const dispatch = useDispatch();

    useEffect(() => {
        setOrderDetail(order.order)
        setPayChannel(order.order.payChannel ? order.order.payChannel:'wepay')
    }, [order])

    //支付有效时间 5分钟
    const validTime = +new Date() + 5 * 60 * 1000

    const handlePayTypeChange = (event) => {
        setOrderDetail({...orderDetail, payChannel: event.target.value})
    }

    const handleCloseQr = () => {
        setOpenPayCode(false)
        clearInterval(timer)
    }

    //支付
    const handlePay = () => {
        const nowTime = +new Date();
        const times = validTime - nowTime;

        if (times <= 0) {
            alert("支付超时, 请回购物车重新结算")
            return;
        }

        if (!agree) {
            alert("请先同意用户购买协议!")
            return;
        }

        //新增或更新订单
        createOrder(orderDetail, order.details).then(resp => {
            dispatch(setRefresh())
            setOpenPayCode(true)
            setPayCodeUri(resp.payQrCode)

            let check_timer = setInterval(() => {
                console.log("checking....", resp.batchCode)
                checkOrderStatus(resp.batchCode).then(completed => {
                    if (completed) {
                        dispatch(setRefresh())
                        dispatch(closeSider())
                        setOpenPayCode(false)
                        clearInterval(timer)
                    }
                })
            }, 1000)
            setTimer(check_timer)
        })
    }

    return (
        <div style={{color: '#D1D1D1', fontSize: '14px'}}>
            <div>
                <span>支付方式:</span>
                <RadioGroup
                    value={payChannel}
                    onChange={handlePayTypeChange}
                    row={true}
                    sx={{
                        display: 'inline',
                        ml: '35px',
                        '& .MuiRadio-root.Mui-checked': {
                            color: '#595DFD',
                        },
                        '& .MuiSvgIcon-root': {
                            width: '15px',
                            height: '15px',
                        }
                    }}
                >
                    <FormControlLabel value="wepay" control={<Radio/>}
                                      label={
                                          <IconButton>
                                              <img alt="icon" src={wepay}/>
                                          </IconButton>}/>
                    <FormControlLabel value="alipay" control={<Radio/>}
                                      disabled={true}
                                      label={
                                          <IconButton>
                                              <img alt="icon" src={alipay}/>
                                          </IconButton>}/>
                </RadioGroup>
            </div>

            <Divider/>
            <p>金额: ￥{orderDetail.totalPrice}</p>
            <p>优惠: -￥0</p>
            <p>应付金额: <span style={{fontSize: '18px', color: 'white'}}>￥{orderDetail.totalPrice}</span></p>

            <Agreement handleAgree={() => setAgree(!agree)}
                       agree={agree}
                       label={'我已阅读并同意购买协议'}
                       type={'pay_agreement'}
            />

            <div className={'cart-button-wrapper'}>
                <Button className={'cart-button'}
                        onClick={handlePay}> 确认支付
                    {/*(<Timer expire={validTime}/>)*/}
                </Button>
            </div>

            {
                !order.id && <div className={'cart-button-wrapper'}>
                    <Button className={'cart-button'}
                            onClick={() => dispatch(setShow("cart"))}> 回到购物车
                    </Button>
                </div>
            }

            <Divider sx={{mt: '50px', mb: '50px'}}/>
            <IconButton><ErrorOutlineIcon sx={{color: '#d85038'}}/></IconButton>
            <span>注意事项</span>
            <ul style={{fontSize: '12px'}}>
                <li>请尽快下载检查模型，如文件有问题，请及时申请售后</li>
                <li>请仔细阅读描述格式、版本、渲染器和插件。obj、fbx等通用格式不会兼容所有软件，购买前先咨询。</li>
                <li>格式转换出错、软件不兼容问题不在售后范围内。</li>
                <li>使用非描述中的格式、版本以及软件环境打开文件可能会有不兼容的问题。此情况不在售后范围内，请按需购买。</li>
                <li>此模型为三维数字模型，虚拟物品。非实体模型。</li>
                <li>版权说明： 未经书面授权或签订书面合同，不得以任何形式发行、发布、传播、复制、出租、转售、汇编该素材。
                </li>
            </ul>

            <Qrcode uri={payCodeUri} open={openPayCode} handleClose={handleCloseQr}/>
        </div>
    );
}

export default Pay;