import styled from "styled-components";

export const CommentInpCont = styled.form`
    display: flex;
    border-top: 0.5px solid #dbdbdb;
    /* max-width: 390px; */
    padding: 12px 16px;

    & img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        object-fit: cover;
        flex-shrink: 0;
        margin-right: 18px;
    }

    & input {
        flex-grow: 1;
        padding: 0;
        border: none;
        font-size: 14px;
        line-height: 18px;
    }

    & input::placeholder {
        color: #C4C4C4;
    }

    & button {
        background-color: transparent;
        font-size: 14px;
        line-height: 18px;
        flex-shrink: 0;
        margin-left: auto;
        color: ${(props) => (props.isBtnActivated ? "#4583A3" : "#C4C4C4")};
    }
`;