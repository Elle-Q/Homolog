import React from "react";
import Input from "@mui/material/Input";

export const SimpleInput = React.forwardRef((props, ref) => {
    const {value, name, placeholder, marginRight} = props;

    return (
        <React.Fragment>
            <Input
                inputRef={ref}
                name={name}
                disableUnderline={true}
                defaultValue={value}
                placeholder={placeholder}
                sx={{
                    paddingLeft: '10px',
                    border: "1px solid #403D39",
                    borderRadius: '5px',
                    fontSize: '14px',
                    fontFamily: '-apple-system',
                    marginRight: {marginRight},
                    width: '200px',

                }}/>
        </React.Fragment>
    )
})
