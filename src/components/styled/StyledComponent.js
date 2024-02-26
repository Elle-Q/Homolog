import {styled} from "@mui/system";
import {Link} from "react-router-dom";

export const StyledLink = styled(Link)`
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

