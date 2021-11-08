// import React, {useEffect, useState} from 'react';
// import Button from "@mui/material/Button";
// import _ from 'lodash';
// import styled from "styled-components";
//
//
// const Wrapper = styled.li`
//     padding: 48px;
//     text-align: center;
//     border-radius: 4px;
//     border: 1px solid #000;
//     list-style: none;
// `;
//
// const Container = styled.ul`
//     display: grid;
//     gap: 1rem;
//     grid-template-columns: repeat(4, 1fr);
//     margin-top: 3rem;
//     padding: 10px;
// `;
//
// const Header = styled.h1`
//      display: flex;
//     justify-content: space-around;
// `;
//
//
// export default props => {
//     const [data, setData] = useState(themesFromStore.data);
//     const [themes, setThemes] = useState(_.keys(themesFromStore.data));
//
//     const themeSwitcher = selectedTheme => {
//         props.setter(selectedTheme);
//     }
//
//     const ThemeCard = props => {
//         return (
//             <Wrapper style={{
//                 backgroundColor: `${data[_.camelCase(props.theme.name)].colors.body}`,
//                 color: `${data[_.camelCase(props.theme.name)].colors.text}`,
//                 fontFamily: `${data[_.camelCase(props.theme.name)].font}`
//             }}>
//                 <span>Click on the button to set this theme</span>
//                 <Button onClick={(theme) => themeSwitcher(props.theme)}
//                         style={{
//                             backgroundColor: `${data[_.camelCase(props.theme.name)].colors.button.background}`,
//                             color: `${data[_.camelCase(props.theme.name)].colors.button.text}`,
//                             fontFamily: `${data[_.camelCase(props.theme.name)].font}`
//                         }}>
//                     {props.theme.name}
//                 </Button>
//
//             </Wrapper>
//         )
//     }
//
//     return (
//         <div>
//             <Header> Select a Theme from bellow</Header>
//             <Container>
//                 {
//                     themes.length > 0 &&
//                         themes.map(theme => (
//                             <ThemeCard theme={data[theme]} key={data[theme].id} />
//                         ))
//                 }
//             </Container>
//         </div>
//     );
// }
//
