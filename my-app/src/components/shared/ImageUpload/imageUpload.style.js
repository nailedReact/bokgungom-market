import styled from "styled-components";
import uploadFile from "../../../assets/upload-file.png";
import imgButton from "../../../assets/img-button.png";

export const ImgUploadIcon = styled.label`
    display: inline-block;

    &.orange {
        width: 50px;
        height: 50px;
        background-size: cover;
        background-image: url(${uploadFile});
    }

    &.gray {
        width: 36px;
        height: 36px;
        background-size: cover;
        background-image: url(${imgButton});
    }
`;
