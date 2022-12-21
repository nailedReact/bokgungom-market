import styled from "styled-components";

export const NavBarCont = styled.div`
    width: 100%;
    padding: 0 6px;
    border-top: 0.5px solid #DBDBDB;
    position: fixed;
    bottom : 0;
    background-color: white;
    
    @media screen and (min-width: 768px){
        left : 0;
        width: 30%;
        border-top: none;
        border: 0.5px solid #DBDBDB;
        height: 100%;
        padding-top: 50px;
    }
`;
export const NavBarUl = styled.ul`
    display: flex;
    justify-content: space-around;
    @media screen and (min-width: 768px){
        flex-direction: column;
        gap: 20px;
        padding: 20px 0px;
    }
`