import styled, {css} from "styled-components";
import { Link } from "react-router-dom";

const IconLayout = css`
    content: "";
    position: absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 24px;
    background-repeat: no-repeat;
    background-size: cover;
`;

export const StyledLink = styled(Link)`
    display: block;
    position: relative;
    width: 84px;
    height: 60px;
    padding-top: 40px;
    font-size: 10px;
    line-height: 14px;
    text-decoration: none;
    text-align: center;
    color: #767676;
    &::before {
        ${IconLayout}
        background-image: ${(props) => `url(${props.icon.basic})`};
    }

    &.activated::before {
        ${IconLayout}
        background-image: ${(props) => `url(${props.icon.filled})`};
    }
`;
