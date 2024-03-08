import React from 'react';
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

const AvatarContainer = styled.div`
  display: flex;
  margin-top: 14px;
  margin-bottom: 20px;
  & > * {
    margin: 4px;
  }
`;


const AvatarLabel = styled.div`
  display: flex;
  align-items: center;
`;

function ByAuthor(props) {
    const {author, avatar} = props
    return (
        <AvatarContainer>
            <AvatarLabel>
                <em style={{color: "#999", marginRight: '15px',fontSize:20}}>By</em>
                <Avatar
                    sx={{width: '60px', height: '60px'}}
                    style={{marginRight: "14px"}}
                    alt="avatar"
                    src={avatar}
                />
                <Typography variant="body2" sx={{fontSize: '20px'}} color="text.fifth"> {author}</Typography>
            </AvatarLabel>
        </AvatarContainer>
    );
}

export default ByAuthor;