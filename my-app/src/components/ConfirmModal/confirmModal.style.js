import styled from "styled-components";

export const ConfirmlLayout = styled.article`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 252px;
    border-radius: 10px;
    background-color: white;
    z-index: 200;

    & h2 {
        padding: 22px 0;
        border-bottom: 0.5px solid #dbdbdb;
        font-size: 16px;
        line-height: 20px;
        font-weight: 500;
        text-align: center;
    }

    & .button-group > * {
        display: inline-block;
        width: 50%;
        padding-top: 14px;
        padding-bottom: 14px;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
        background-color: transparent;
    }

    & .button-group :nth-child(2) {
        border-left: 0.5px solid #dbdbdb;
        color: #F26E22;
    }
`;