import React from "react";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import {alpha} from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const InputWithHeader = (props) => {
    const {header, value, onChange, multiline, placeholder,  disabled} = props;

    return (
        <React.Fragment>
            <span style={{marginRight: '15px', verticalAlign: "bottom"}}> {header}</span>
            <Input multiline={multiline}
                   disableUnderline={true}
                   value={value}
                   onChange={onChange}
                   placeholder={placeholder}
                   disabled={disabled}
                   sx={{
                       paddingLeft:'10px',
                       border: "1px solid #403D39",
                       borderRadius: '5px',
                       fontSize: '14px',
                       fontFamily:'-apple-system',
                       marginRight: 20,
                       rows: `${multiline & 4}`,
                       width: `${multiline ? 500 : 200}px`,
                       '&:hover': {
                           border: `${!disabled ? '1px solid #3399ff' : ''}`
                       }
                   }}/>
        </React.Fragment>
    )
}

export const ImagInputWithHeader = (props) => {
    const {header, img,disabled} = props;
    return (
        <React.Fragment>
            <span style={{marginRight: '15px', verticalAlign: "bottom"}}>{header}</span>
            <img alt="preview" style={{maxWidth: '200px', maxHeight: '200px', borderRadius: '5px'}}
                 src={img}/>
            <IconButton disabled={disabled} sx={{
                width: '200px',
                maxHeight: '200px',
                borderRadius: '5px',
                backgroundColor: alpha('#252422', 0.3),
                '&:hover': {
                    backgroundColor: alpha('#252422', 0.1)

                }
            }}>
                <AddIcon fontSize='large' sx={{color: '#3399ff'}}/>
            </IconButton>
        </React.Fragment>
    )
}

export const SelectInputWithHeader = (props) => {
    const {header, items, value, handleChange, disabled} = props;
    console.log(value, items,Object.keys(items))
    return (
        <React.Fragment>
            <span style={{marginRight: '15px', verticalAlign: "bottom"}}>{header}</span>
            <Select value={value}
                    disabled={disabled}
                    onChange={handleChange}
                    sx={{
                        border: "1px solid #403D39",
                        fontSize: '14px',
                        variant: 'standard',
                        '&:hover': {
                            border: `${!disabled ? '1px solid #3399ff' : ''}`
                        }
                    }}>
                {
                    Object.keys(items).map((value,index) => (
                        <MenuItem key={index} value={value}>
                            {items[value]}
                        </MenuItem>
                    ))}
            </Select>
        </React.Fragment>
    )
}
