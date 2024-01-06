import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {ListItems} from "../../../../api/cat.service";

const Container = styled.div`
    width: 100%;
    text-align: center;
`

const itemStyle = {
    width: "300px",
    height: "300px",
}

function Waterfall(props) {
    const {catId} = props
    const [list, setList] = useState()

    useEffect(() => {
        ListItems(catId).then((data) => {
            setList(data)
        })
    }, [catId]);

    return (
        <Container>
            {
                list && list.map(item => (<img src={item.main.small} key={item.id} alt={item.name} style={itemStyle}/>))
            }
        </Container>
    );
}

export default Waterfall;