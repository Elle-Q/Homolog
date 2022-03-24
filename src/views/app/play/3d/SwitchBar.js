import React, {useEffect} from 'react';
import Box from "@mui/material/Box";
import {Stack} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import helmetPrev  from '../../../../assets/3d/helmet.png'
import shoePrev  from '../../../../assets/3d/shoe.png'
import skullPrev  from '../../../../assets/3d/skull.png'
import chairPrev  from '../../../../assets/3d/chair.png'
import tokyoPrev  from '../../../../assets/3d/tokyo.png'

function SwitchBar(props) {

    const {handleChangeResc, models} = props;

    useEffect(() => {

    })

    if (!models) return <></>

    const rescList = [
        {
            name:'DamagedHelmet',
            prev: helmetPrev,
            url:'/3d/gltf/helmet/DamagedHelmet.gltf',
            type:'gltf'
        },
        {
            name:'shoe',
            prev: shoePrev,
            url:'/3d/gltf/shoe/MaterialsVariantsShoe.gltf',
            type:'gltf'
        },
        {
            name:'SheenChair',
            prev: chairPrev,
            url:'/3d/glb/SheenChair.glb',
            type:'glb'
        },
        {
            name:'skull',
            prev: skullPrev,
            url:'/3d/glb/skull.glb',
            type:'glb'
        },
        {
            name:'tokyo',
            prev: tokyoPrev,
            url:'/3d/glb/LittlestTokyo.glb',
            type:'glb'
        },
    ]

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