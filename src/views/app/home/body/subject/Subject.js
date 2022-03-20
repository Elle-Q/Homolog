import React from 'react';
import {useTheme} from "@mui/system";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CategoryCard from "./CategoryCard";
import AnimationText from "../../../../../components/AnimationText";
import GradientButton from "../../../../../components/ui/GradientButton";
import {Link} from "react-router-dom";

function Subject(props) {
    const theme = useTheme();
    const {subject} = props;

    if (subject === undefined || subject.Items.length < 1) return <></>

    return (
        <React.Fragment>
            <div style={{display: 'grid',gridTemplateColumns:'70% 30%'}}>
                <div style={{gridColumn: 2/3}}>
                    <AnimationText title={subject.CatTitle}/>
                    &nbsp;&nbsp;
                    <AnimationText title={subject.CatSubTitle}
                                   fontSize={15}
                                   spacing={1}
                                   color='white'
                                   display="inline"
                    />
                </div>
                <div style={{display:'flex', alignItems: 'center',justifyContent:"flex-end"}}>
                    <Link to={`/app/category/${subject.CatID}`}>
                    <GradientButton name="更多" color="linear-gradient(to right, #00c6ff 0%, #0072ff  51%, #00c6ff  100%)"/>
                    </Link>
                </div>
            </div>
            <Stack direction='row'
                   spacing={2}
                   sx={{mt: '20px'}}
                   justifyContent="center">
                {
                    subject.Items.map((item, index) => {
                        return <CategoryCard key={index} item={item}/>
                    })
                }
            </Stack>
        </React.Fragment>

    );
}

export default Subject;