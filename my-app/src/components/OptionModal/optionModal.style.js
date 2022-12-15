import styled from "styled-components";
import modalIcon from "../../assets/icon/icon-modal.png";

export const OptionLayout = styled.article`
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 16px 0 10px;
    border-radius: 10px 10px 0 0;
    background-color: white;

    &::before {
        content: "";
        display: block;
        width: 50px;
        height: 4px;
        margin: 0 auto 16px;
        background-image: url(${modalIcon});
    }

    & .modal-items > * {
        padding-top: 14px;
        padding-bottom: 14px;
        padding-left: 26px;
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
    }
`;