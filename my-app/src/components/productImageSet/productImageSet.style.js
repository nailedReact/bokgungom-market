import styled from "styled-components";

export const ProductImgSetCont = styled.label`
    display: block;
    position: relative;
    height: 100%;
    /* overflow-y: scroll; */

    & .productSampleImage {
        width: 322px;
        height: 204px;
        object-fit: cover;
        border-radius: 10px;
        border: 0.5px solid #DBDBDB;
        background-color: #F2F2F2;
    }

    & .each-image-cont {
        display: block;
        margin-top: 16px;
        width: calc(100% - 42px);
        max-width: 400px;
        margin-left: 42px;
    }

    & .each-image-cont div {
        display: inline-block;
        position: relative;
        width: 100%;
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
