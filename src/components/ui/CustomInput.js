import React, {useRef} from "react";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import {alpha} from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {styled} from "@mui/system";

export const InputWithHeader = (props) => {
    const {header, value, name, onChange,
        multiline, placeholder, disabled,
        marginRight
    } = props;

    return (
        <React.Fragment>
            <span style={{marginRight: '15px', verticalAlign: "bottom"}}> {header}</span>
            <Input multiline={multiline}
                   name={name}
                   disableUnderline={true}
                   defaultValue={value}
                   onChange={onChange}
                   placeholder={placeholder}
                   disabled={disabled}
                   sx={{
                       paddingLeft: '10px',
                       border: "1px solid #403D39",
                       borderRadius: '5px',
                       fontSize: '14px',
                       fontFamily: '-apple-system',
                       marginRight:`${typeof(marginRight) !== "undefined"?marginRight:100}px`,
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
    const {header, name, img, disabled, onChange} = props;
    const fileRef = useRef();

    return (
        <React.Fragment>
            <span style={{marginRight: '15px', verticalAlign: "bottom"}}>{header}</span>
            {
                img &&  <img src={img} alt="preview" style={{maxWidth: '200px', maxHeight: '200px', borderRadius: '5px'}} />
            }

            <input type="file"
                   name={name}
                   ref={fileRef}
                   onChange={onChange}
                   style={{display: 'none',}}/>
            <IconButton disabled={disabled}
                        onClick={() => fileRef.current.click()}
                        sx={{
                            width: '200px',
                            maxHeight: '200px',
                            borderRadius: '5px',
                            backgroundColor: alpha('#252422', 0.3),
                            '&:hover': {
                                backgroundColor: alpha('#252422', 0.1)
                            }
                        }}
            >
                <span style={{fontSize: '16px', color: '#3399ff'}}>+ 上传图片</span>
            </IconButton>
        </React.Fragment>
    )
}

export const SelectInputWithHeader = (props) => {
    const {header, name, items, defaultValue, handleChange, disabled, type} = props;
    return (
        <React.Fragment>
            <span style={{marginRight: '15px', verticalAlign: "bottom"}}>{header}</span>
            <Select
                name={name}
                defaultValue={defaultValue}
                disabled={disabled}
                onChange={handleChange}
                sx={{
                    mr:'50px',
                    border: "1px solid #403D39",
                    fontSize: '14px',
                    variant: 'standard',
                    '&:hover': {
                        border: `${!disabled ? '1px solid #3399ff' : ''}`
                    }
                }}>
                {
                    type === 'enum' ?
                        Object.keys(items).map((value, index) => (
                            <MenuItem key={index} value={value}>
                                {items[value]}
                            </MenuItem>
                        ))
                        :
                        props.children
                }
            </Select>
        </React.Fragment>
    )
}

export const StyledInputElement = styled('textarea')(({theme}) => ({
    resize: 'none',
    width: '95%',
    fontSize: '1rem',
    fontFamily: '-apple-system',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '10px',
    padding: '6px 10px',
    color: '#3399FF',
    transition: 'width 300ms ease',
    '&:hover': {
        backgroundColor: 'transparent',
    },
    '&:focus': {
        outline: 'none',
        transition: 'width 200ms ease-out'
    }
}));

