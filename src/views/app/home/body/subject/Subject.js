import React from 'react';
import {useTheme} from "@mui/system";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CategoryCard from "./CategoryCard";

function Subject(props) {
    const theme = useTheme();
    const {subject} = props;

    if (subject === undefined || subject.Items.length < 1) return <></>

    return (
        <React.Fragment>
            <Typography variant="h6" component="div" color={theme.palette.secondary.light} sx={{mt: '5px'}}>
                {subject.CatTitle}
            </Typography>
            <Stack direction='row'
                   spacing={2}
                   sx={{mt: '10px'}}
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