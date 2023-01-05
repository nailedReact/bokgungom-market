import styled from "styled-components";

export const ProfileImgSetCont = styled.label`
    display: inline-block;
    position: relative;

    & .productSampleImage {
        width: 322px;
        height: 204px;
        border-radius: 10px;
        border: 0.5px solid #DBDBDB;
        background-color: #F2F2F2;
    }

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
