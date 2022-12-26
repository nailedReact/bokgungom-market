import styled from "styled-components";

export const FeedCont = styled.div`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* align-items: center; */
    background-color: #F2F2F2;
    /* gap: 10px; */

    @media screen and (max-width: 768px){
        padding-bottom: 60px;
    }
    @media screen and (min-width: 768px){
        margin-left: 240px;
    }
`
export const PageBtn = styled.button`
    font-family: "Pretenard";
    padding: 8px 12px;
    border: 1px solid var(--color-primary);
    border-radius: 50%;
    background: white;
`
export const PrevNextBtn = styled.button`
    font-family: "Pretenard";
    padding: 8px;
    border-radius: 50%;
    background: var(--color-primary);
    color: white;

    &:disabled {
        opacity: 0.4;
    }
`