import React from 'react';
import Stack from "@mui/material/Stack";

function List(props) {
    return (
        <Stack direction={"column"} >
            <p>章节目录</p>

            <div style={{
                position: "relative",
                width: '50%',
                height: '400px',
                marginLeft: '200px',
                backgroundColor: 'rgba(0, 168, 150, 0.2)',
                marginTop: '80px',
                borderRadius: '20px',
                boxShadow: '0 0 6px #00a896',
            }}>
                <img style={{
                    position: "absolute",
                    width: '40%',
                    height: '55%',
                    top: '-60px',
                    right: '-40px',
                    borderRadius: '20px',
                }}
                     alt={'listImg'}
                     src={'http://www.leetroll.com/item/preview/2022_06_06_22_13_IMG_9221.JPG'}>
                </img>
            </div>

            <div style={{
                position: "relative",
                width: '50%',
                height: '400px',
                marginLeft: '500px',
                backgroundColor: '#00a896',
                marginTop: '80px',
                borderRadius: '20px',
                boxShadow: '0 0 6px #00a896'
            }}>
                <img style={{
                    position: "absolute",
                    width: '40%',
                    height: '55%',
                    top: '-60px',
                    left: '-40px',
                    borderRadius: '20px',
                }}
                     alt={'listImg'}
                     src={'http://www.leetroll.com/item/preview/2022_06_06_22_13_IMG_9221.JPG'}>
                </img>
            </div>
        </Stack>
    )
}

export default List;