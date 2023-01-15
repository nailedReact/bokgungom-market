import styled from "styled-components";
import uploadFile from "../../assets/upload-file.png";
import imgButton from "../../assets/img-button.png";

export const ImgUploadIcon = styled.label`
    display: inline-block;

    &.big {
        width: 50px;
        height: 50px;
    }

    &.small {
        width: 36px;
        height: 36px;
    }

    &.orange {
        background-size: cover;
        background-image: url(${uploadFile});
    }

    &.gray {
        background-size: cover;
        background-image: url(${imgButton});
    }

    &.product {
        position: absolute;
        bottom: 12px;
        right: 12px;
    }

    &.location {
        position: fixed;
        bottom: 5.51%;
        right: 8.51%;
    }

    &.location.keyboardUp {
        bottom: 50%;
    }

    @media screen and (min-width: 769px) {
        &.location {
            right: 1em;
            bottom: 1em;
        }
    }
`;
