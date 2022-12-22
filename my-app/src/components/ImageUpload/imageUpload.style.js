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

    &.location {
        position: fixed;
        bottom: 16px;
        right: 16px;
    }
`;
