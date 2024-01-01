import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {ListCatItems} from "../../../../api/cat.service";

const Container = styled.div`
    position: relative;
    width: 100%;
`

const itemStyle = {
    width: "300px",
    height: "300px",
}

function Waterfall(props) {
    const {catId} = props
    const [list, setList] = useState()

    useEffect(() => {
        ListCatItems(catId).then((data) => {
            setList(data)
        })
    }, [catId]);

    return (
        <Container>
            {
                list && list.map(item => (<img src={item.Main} key={item.ID} alt={item.name} style={itemStyle}/>))
            }
        </Container>
    );
}

export default Waterfall;