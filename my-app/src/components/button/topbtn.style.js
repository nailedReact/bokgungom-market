import styled from 'styled-components';

export const TopbtnCont = styled.div`
    position: fixed;
    right: 3%;
    bottom: 4%;
    z-index: 1;
    @media screen and (max-width: 768px){
        margin-bottom: 60px;
    }
    & p {
        width: 0;
        height: 0;
        font-size: 0;
    }
`

export const Topbutton = styled.button`
    padding :8px 10px;
    background-color: #4584a3;
    border-radius: 50%;
    box-shadow: rgb(0 0 0 / 25%) 0px 3px 10px;
    &:hover{
        background-color: #78cafe;;
    }
`