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