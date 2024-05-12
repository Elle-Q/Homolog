import React from 'react';
import Card from "./card/card";
import "./subscribe.scss"

function Subscribe(props) {
    return (
        <div className="subc">
            <Card heading="绿牌会员 享全站资源" price={29.9} study={2} down={10} index={1}/>
            <Card heading="蓝牌会员 享全站资源" price={39.9} study={5} down={30} index={2}/>
            <Card heading="红牌会员 享全站资源" price={59.9} study="不限" down="不限" index={3}/>
        </div>
    );
}

export default Subscribe;