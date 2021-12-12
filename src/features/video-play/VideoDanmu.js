import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";

function VideoDanmu(props) {
    // const {damuItems} = props;
    const[widthTrans, setWidthTrans] = useState(0);

    const damuItems = [[
        "well...",
        "我年薪900万",
        "他说的是真的, 因为是我给他发的工资",
        "现在是11月11号, 我饿了",
        "现在是11月11号 12点, 我吃撑了",
        "我睡不着,  在想代码的事",
        "还是睡不着,  流媒体给我整蒙了",
        "睡着了, 希望梦见golang",
        "醒了,  梦见了前男友",
        "今天一天孤芳自赏, 抹泪自怜",
    ],
        [
            "我是工资条",
            "我是工资条上的墨水",
            "我可以证明， 这个给他发工资的是我请的财务",
            "Devon steam不在线",
            "打一把游戏把, 最近绣湖出新作了",
            "这个游戏玩的我抑郁症都要犯了",
            "作者是个反社会份子把",
            "只能玩一把, 多玩一把我都不是人",
        ],
        [
            "我是代发工资的银行",
            "我给他印的钱",
            "他们说的都是真的, 因为我是老板",
            "毛泽东说:....",
            "说了什么",
            "香菇生的不能吃",
            "你还是闭嘴把, 你嘴巴长着就是用来进化的",
        ]
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setWidthTrans(widthTrans - 3);
        }, 100);
        return () => clearInterval(interval);
    }, [damuItems])

    return (
        <Box
            sx={{
                width: '100%',
                height: '480px',
                position: "absolute",
                borderRadius: '10px',
                backgroundColor: 'rgba(255,255,255,0)',
                zIndex: 2,
                color: 'rgba(255,255,255,0.8)',
                overflow:"hidden"
            }}
        >
            {
                damuItems.map((rowDanmu, i) => {
                    return (<Box sx={{ display: "flex"}}>
                        {
                            rowDanmu.map((key, index) => (
                                <Box sx={{
                                    height: '2px',
                                    mb: '35px',
                                    mr:"35px",
                                    display: "flex",
                                    transform:  `translateX(${widthTrans}px)`,
                                    // transition: 'transform 0.1s ease-in-out'
                                }}>
                                    {key}
                                </Box>))
                        }
                    </Box>)
                    }
                )
            }
        </Box>
    );
}

export default VideoDanmu;