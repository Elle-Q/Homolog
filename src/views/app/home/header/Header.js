import React, {useState} from 'react';
import {ListCat} from "../../../../api/cat.service";
import CatCard from "./CatCard";
import styled from "styled-components";

const CatDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
`;
function Header(props) {

    const [cats, setCats] = useState([]);

    React.useEffect(() => {
        ListCat().then((data) => {
            setCats(data)
        })
    }, [])

    return (
        <CatDiv>
            {
                cats.map((item, i) => (
                    <CatCard key={i} item={item}/>
                ))
            }
        </CatDiv>
    );
}

export default Header;