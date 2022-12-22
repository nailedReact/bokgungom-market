import styled from "styled-components";

export const CommentInpCont = styled.form`
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: white;
    display: flex;
    border-top: 0.5px solid #dbdbdb;
    /* max-width: 390px; */
    padding: 12px 16px;

    & img,
    label {
        flex-shrink: 0;
        margin-right: 18px;
    }

    & img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        object-fit: cover;
    }

    & input {
        flex-grow: 1;
        padding: 0;
        border: none;
        font-size: 14px;
        line-height: 18px;
    }

    & input::placeholder {
        color: #c4c4c4;
    }

    & button {
        background-color: transparent;
        font-size: 14px;
        line-height: 18px;
        flex-shrink: 0;
        margin-left: auto;
        color: ${(props) => (props.isBtnActivated ? "#4583A3" : "#C4C4C4")};
    }

    @media screen and (min-width: 768px) {
        & input, button {
            font-size: 16px;
        }
    }
`;
