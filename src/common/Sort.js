import React from 'react';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const sorts = {
    Newest : "最新",
    HighestRated : "最受好评",
    mostReviewed : "最多评论",
    PriceAsc : "价格(从高到低)",
    PriceDesc : "价格(从低到高)",
}


function Sort(props) {

    const [sortBy, setSortBy] = React.useState(sorts['Newest']);

    const handleChange = (event) => {
        console.log()
        setSortBy(sorts[event.target.value]);
    };

    return (
        <React.Fragment>
            <h4 style={{color: '#CCC5B9' }}> 排序 </h4>
            <FormControl variant="outlined" sx={{m: 2, width: 200, height: 20}}>
                <Select
                    value={sortBy}
                    onChange={handleChange}
                    autoWidth
                    sx={{
                        height: 35,
                        '& > .MuiOutlinedInput-notchedOutline': {
                            border: "1px solid #403D39",
                        }
                    }}
                    renderValue={(selected) => {
                        return  selected;
                    }}
                >
                    <MenuItem value="Newest"> 最新</MenuItem>
                    <MenuItem value="HighestRated">最受好评</MenuItem>
                    <MenuItem value="mostReviewed">最多评论</MenuItem>
                    <MenuItem value="PriceAsc">价格(从高到低)</MenuItem>
                    <MenuItem value="PriceDesc">价格(从低到高)</MenuItem>
                </Select>
            </FormControl>
        </React.Fragment>
    );
}

export default Sort;