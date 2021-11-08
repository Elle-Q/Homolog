import React from 'react';
import {useTheme} from "@mui/system";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CategoryCard from "./CategoryCard";

function Category(props) {
    const theme = useTheme();
    const {category} = props;

    return (
        <React.Fragment>
        <Typography variant="h6" component="div" color={theme.palette.secondary.light} sx={{mt: '5px'}}>
            {category.name}
        </Typography>
        <Stack direction='row'
               spacing={2}
               sx={{mt:'10px'}}
               justifyContent="center">
            {
                category.items.map((item, index) => {
                    return <CategoryCard {...item}/>
                })
            }
        </Stack>
        </React.Fragment>

    );
}

export default Category;