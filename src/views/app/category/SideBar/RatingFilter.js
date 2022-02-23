import React from 'react';
import {getStarIcons} from "../../../../utils/ToolUtil";
import Stack from "@mui/material/Stack";
import {RatioInput} from "../../../../components/ui/RatioInput";



function RatingFilter(props) {

    let starRows = [];
    for (let i = 4; i > 0; i--) {
        starRows.push(
            <label key={i} style={{color: '#EB5E28', position: 'relative'}}>
                {getStarIcons(i)}
                <span style={{color: '#999', fontSize: '12px', textAlign: "center"}}> 以上</span>
                <RatioInput id="4" type="radio" value="4"/>
            </label>
        );
    }

    return (
        <React.Fragment>
            <h4 style={{color: '#CCC5B9'}}> 星级 </h4>
            <Stack>
                {starRows}
            </Stack>
        </React.Fragment>
    );
}

export default RatingFilter;