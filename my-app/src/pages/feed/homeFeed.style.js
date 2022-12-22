import styled from "styled-components";

export const FeedCont = styled.div`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* align-items: center; */

    @media screen and (max-width: 768px){
        padding-bottom: 60px;
    }
    @media screen and (min-width: 768px){
        margin-left: 240px;
    }
`