import React  from 'react';
import Box from "@mui/material/Box";
import {getPopularTags} from "../../../utils/ToolUtil";
import AnimationText from "../../../components/AnimationText";


//todo : tag从数据库读取
const tags = [
    {
        "name": "动画",
        "cnt": 370
    },
    {
        "name": "Blender",
        "cnt": 209
    },
    {
        "name": "特效",
        "cnt": 124
    },
    {
        "name": "3d模型",
        "cnt": 137
    }
]

function TitleHeader(props) {
    const {title} = props;

    return (
        <Box sx={{
            mt: '50px',
            mb: '10px'
        }}>
            <AnimationText title={title} />
            {getPopularTags(tags)}
        </Box>
    );
}

export default TitleHeader;