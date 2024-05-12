import React from 'react';
import "../subscribe.scss"
import {openSider, setData, setShow} from "../../../../store/sider-slice";
import {useDispatch} from "react-redux";
import {subscribe} from "../../../../api/pay.service";

function Card(props) {
    const {heading, price, study, down, index} = props;
    const dispatch = useDispatch();

    const handleSubscribe = () => {
        subscribe(index)
        alert("VIP 功能即将上线")
        // let orderVO = {
        //     order: {
        //         payType: 'wepay', //默认微信支付
        //         totalPrice: price
        //     },
        //     details: [
        //         {
        //             itemId: -111,
        //             price: 0.1,
        //             actualPrice: price,
        //             name: "月度会员",
        //             author: "leetroll",
        //             type: "vip",
        //         }
        //     ],
        // }
        // dispatch(setData(orderVO))
        // dispatch(setShow("pay"))
        // dispatch(openSider())
    }

    return (
        <div className="subc-card">
            <div className="subc-card__side subc-card__side--front">
                <div className={`subc-card__picture subc-card__picture--${index}`}>
                    &nbsp;
                </div>
                <h4 className="subc-card__heading">
                    <span className={`subc-card__heading-span subc-card__heading-span--${index}`}>
                        {heading}
                    </span>
                </h4>
                <div className="subc-card__details">
                    <ul>
                        <li>免费资源无限下载</li>
                        <li>每日可下载资源&nbsp;<span
                            className={`subc-card__details-span--${index}`}>{down}</span>&nbsp;个
                        </li>
                        <li>每月教程任意免费学习&nbsp;<span
                            className={`subc-card__details-span--${index}`}>{study}</span>&nbsp;部
                        </li>
                    </ul>
                </div>
            </div>
            <div className={`subc-card__side subc-card__side--back subc-card__side--back-${index}`}>
                <div className="subc-card__cta">
                    <div className="subc-card__price-box">
                        <p className="subc-card__price-only">每月</p>
                        <p className="subc-card__price-value">
                            <span>￥</span>
                            {price}
                        </p>
                    </div>
                    <a className="subc-card__btn" onClick={handleSubscribe}>
                        立即订阅
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Card;