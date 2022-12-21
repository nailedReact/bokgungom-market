import styled from "styled-components";

const Inp = styled.input`
    font-size: 14px;
    background-color: none;
    border: none;
    padding-bottom: 2px;
    border-bottom: 1px solid #DBDBDB;
    outline: none;

    :focus {
    outline: none;
    border-bottom: 1px #4583A3 solid;
}
`

export default Inp;