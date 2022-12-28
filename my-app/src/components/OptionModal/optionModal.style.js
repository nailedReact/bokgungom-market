import styled from "styled-components";
import modalIcon from "../../assets/icon/icon-modal.png";

export const OptionLayout = styled.article`
    /* max-width: 390px; */
    width: 100%;
    /* position: absolute; */
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 16px 0 10px;
    border-radius: 10px 10px 0 0;
    z-index: 100;
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
        padding: 14px 26px;
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
    }

    & .modal-items button {
        display: block;
        width: 100%;
        text-align: left;
        background-color: transparent;
        font-size: 100%;
        line-height: 18px;
        padding: 0;
    }

    @media screen and (min-width: 768px){

        & .modal-items > * {
            font-size: 18px;
            padding: 18px 30px;
        }

        & .modal-items > :nth-child(1) {
            margin-top: 60px;
        }
    }
    & li {
        & a {
            display: block;
            width: 100%;
            height: 100%;
        }
        &:hover{
            background-color: #4583a34c;
        }
        &:active{
            background-color: var(--color-primary);
            color: white;
        }
    }
`;