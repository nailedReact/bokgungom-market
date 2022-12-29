import styled from "styled-components";

export const ProductImgSetCont = styled.label`
    display: block;
    position: relative;
    height: 100%;
    /* overflow-y: scroll; */

    & .productSampleImage {
        width: 322px;
        height: 204px;
        border-radius: 10px;
        border: 0.5px solid #DBDBDB;
        background-color: #F2F2F2;
    }

    & .each-image-cont {
        display: block;
        position: relative;
        margin-top: 16px;
    }

    & .each-image-cont .delete-btn {
        position: absolute;
        top: 11.5px;
        right: 11.5px;
        width: 11px;
        height: 11px;
        background-color: transparent;
        padding: 0;
    }

    & .each-image-cont .delete-btn img {
        width: 100%;
        object-fit: cover;
    }
`;
