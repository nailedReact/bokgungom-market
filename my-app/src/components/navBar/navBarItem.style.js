import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 20px;
    font-size: 10px;
    color: #767676;
    gap: 6px;
    
    @media screen and (min-width: 768px){
        flex-direction: row;
        gap: 20px;
        font-size: 16px;
        &:hover {
            background-color: #C6D9E3;
            border-radius: 10px;
        };
    };

    & svg {
        fill: none;
    };
`;
