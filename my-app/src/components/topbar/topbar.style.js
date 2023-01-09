import styled, { css } from "styled-components"
import Logo from "../../assets/logo.png"

export const TopBarCont = styled.div`
    position: sticky;
    top: 0;
    width: 100%;
    height: 55px;
    z-index: 10;
    background-color: white;
    border-bottom: 0.5px solid #DBDBDB;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 12px 12px 16px;
    border-bottom: 0.5px solid #DBDBDB;
    transition: .3s;
    @media screen and (min-width: 768px){
        background-color: #C6D9E3;
        height: 60px;
    }
`
export const LeftCont = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;

`
export const RightCont = styled.div`
    display: flex;
    width: 50%;
    justify-content: right;
`

export const BtnIcon = styled.button`
    ${({action}) => action === "back" && css`
        & svg {
            left: 16px;
        }
    `};
    ${({action}) => (action === "more" ||  action === "search") && css`
        & svg {
            right: 14px;
        }
    `};
    background: none;
    display: block;
    width: 24px;
    height: 24px;
    & svg {
        fill: none;
        position: absolute;
        bottom: 14px;
        @media screen and (min-width: 768px){
            bottom: 18px;
        }
    }
`;

export const Searchinput = styled.input`
    font-size: 14px;
    background: #F2F2F2;
    border-radius: 30px;
    border: none;
    padding: 8px;
    transition: .5s;
    width: inherit;
    width: 80%;
    &:focus {
        width: 100%;
    }
    @media screen and (max-width: 768px){
        width: 90%;
    }
`;

export const LogoCont = styled.div`
    background: url(${Logo});
    background-size: cover;
    width: 162px;
    height: 40px;
    position: absolute;
    cursor: pointer;
    @media screen and (max-width: 768px){
        display: none;
    }
`