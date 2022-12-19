import styled from "styled-components";

export const ProductImgSetCont = styled.label`
    display: inline-block;
    position: relative;

    & .productSampleImage {
        width: 322px;
        height: 204px;
        border-radius: 10px;
        border: 0.5px solid #DBDBDB;
        background-color: #F2F2F2;
    }

    & :nth-child(3) {
        position: absolute;
        bottom: 12px;
        right: 12px;
    }
`;
