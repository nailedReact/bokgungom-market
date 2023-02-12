import styled from "styled-components";

export const FeedCont = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #F2F2F2;
    /* height: calc(100vh - 60px); */
    @media screen and (max-width: 768px){
        padding-bottom: 60px;
    }
    @media screen and (min-width: 768px){
        margin-left: 240px;
    }
`
export const PageBtn = styled.button`
    font-weight: 500;
    width: 30px;
    height: 30px;
    border-radius: 8px;
    background-color: white;
    border: 1px solid #BBBBBB;
    &:hover {
        border: 2px solid var(--color-primary);
    }
`
export const PrevNextBtn = styled.button`
    font-weight: 700;
    width: 30px;
    height: 30px;
    border-radius: 8px;
    background-color: white;
    border: 1px solid #BBBBBB;
    &:hover {
        border: 2px solid var(--color-primary);
    }

    &:disabled {
        opacity: 0.2;
        &:hover {
            border: 1px solid #BBBBBB;
        }
    }
`

export const Pagenation = styled.div`
    display: flex;
    justify-content: center;
    padding: 20px;
    gap: 10px;
`

export const ButtonCont = styled.div`
    display: flex;
    gap: 10px;
`

export const Symbolimg = styled.img`
    width: 120px;
    height: 120px;
`;

export const SearchText = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    color: #767676;
`;

export const Cont = styled.div`
    display: flex;
    height: calc(100vh - 60px);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    @media screen and (max-width: 768px){
        height: calc(100vh - 60px - 55px);
    }
`;