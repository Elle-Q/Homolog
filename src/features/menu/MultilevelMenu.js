import React, {useState} from 'react';
import {Link} from "react-router-dom";
import menu from '../../json/menu.json'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {alpha} from "@mui/system";

function MultilevelMenu(props) {
    const {setShowMenu} = props;
    const [secondlevel, setSecondlevel] = useState(null);
    // const [offset, setOffset] = useState(0);

    let offset = 0;
    const handleSecond = (index, data) => {

        offset=index*30 + 30;
        setSecondlevel(data);
        console.log(index,offset, data)
    }

    const renderMenuItems = (data) => {
        return data.map((item, index) => {
                return <div key={index} style={{width: '100px', marginBottom: '15px'}}>
                    <Link to={item.url} style={{textDecoration: "none"}}>
                        <Typography variant="body" component="span" color='#3399ff'>
                            {item.name}
                        </Typography>
                    </Link>
                    {
                        item.children &&
                        <ArrowForwardIosRoundedIcon
                            sx={{height: '10px'}}
                            onMouseEnter={() => handleSecond(index,item.children)}
                        />
                    }

                </div>
            }
        )
    }

    return (
        <div>
            <Box sx={{
                position: 'absolute',
                left: -10,
                top: 25,
                zIndex: 111,
                backgroundColor: alpha('#0a0908', 0.2),
            }}>
                {renderMenuItems(menu)}
            </Box>
            {
                console.log(offset)
                // secondlevel &&
                // <Box sx={{
                //     position: 'absolute',
                //     left: 90,
                //     top: {offset},
                //     zIndex: 111,
                //     backgroundColor: alpha('#0a0908', 0.2),
                // }}>
                //     {renderMenuItems(secondlevel)}
                // </Box>
            }


        </div>
    );
}

export default MultilevelMenu;