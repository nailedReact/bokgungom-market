import styled from "styled-components";

const Textarea = styled.textarea`
    width: 304px;
    resize: none;
    padding: 10px;
    box-sizing: border-box;
    font-size: 14px;
    background-color: none;
    border: none;

    :focus {
        outline: none;
        border-bottom: 1px solid #DBDBDB;
    }
`

export default Textarea;