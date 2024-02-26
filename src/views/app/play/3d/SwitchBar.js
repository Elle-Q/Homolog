import React, {useEffect} from 'react';
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

function SwitchBar(props) {

    const {handleChangeResc, models} = props;

    useEffect(() => {

    })

    if (!models) return <></>

    return (
        <Box sx={{
            height: '120px',
            width: '100%',
            position: "absolute",
            bottom: 0,
            backgroundColor: "transparent",
            borderRadius: '15px',
            padding:'10px',
            margin:'10px',
        }}>

        <Stack direction="row"
               spacing={0}
               justifyContent="center"
               alignItems="center"
        >
            {
                models.map((item, index) => (
                    <CardMedia
                        key={index}
                        raised="true"
                        component="img"
                        image={item.prev}
                        alt={item.name}
                        onClick={() => handleChangeResc(item.QnLink, item.Format)}
                        sx={{
                            width: '90px',
                            height: '90px',
                            borderRadius:'50%',
                            boxShadow: '0 0 5px white',
                            transition: 'clip-path .2s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.4)',
                                transition: 'all .2s ease-in-out '
                            }
                        }}
                    />
                ))
            }
        </Stack>

        </Box>
    );
}

export default SwitchBar;