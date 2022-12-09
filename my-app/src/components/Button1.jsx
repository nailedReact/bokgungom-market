import styled, { css } from "styled-components";

const Button1 = styled.button`
    background-color: #F26E22; // 변경 예정
    color: #FFFFFF;
    ${(props) =>
        (props.className === "ms") && css`
        padding: 7px 32px; // 좌우 패딩값 가변 속성이라 추후 변경 필요 */
        border-radius: 32px;
    `};
    ${(props) =>
        (props.className === "large") && css`
        padding: 13px 0px;
        border-radius: 44px;
        width: 100%; // 가변 속성이라 추후 변경 필요
    `};
    :disabled {
        opacity: 0.4;
    }
`

export default Button1;