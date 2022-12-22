import styled from "styled-components";

const Inp = styled.input`
    font-size: 20px;
    background-color: none;
    border: none;
    padding-bottom: 2px;
    border-bottom: 1px solid #DBDBDB;
    outline: none;

    @media screen and (max-width: 768px) {
        font-size: 16px;
    }

    /* width:322px; */
    ::placeholder{
        color: #DBDBDB;
    }

    :focus {
    outline: none;
    border-bottom: 1px #4583A3 solid;
}
`

export default Inp;