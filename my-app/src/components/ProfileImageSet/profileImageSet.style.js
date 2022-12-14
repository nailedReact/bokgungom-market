import styled from "styled-components";

export const ProfileImgSetCont = styled.label`
    display: inline-block;
    position: relative;

    & .profileImg {
        width: 110px;
        height: 110px;
        border-radius: 50%;
    }

    & :nth-child(3) {
        position: absolute;
        top: 74px;
        left: 74px; 
    }
`;
