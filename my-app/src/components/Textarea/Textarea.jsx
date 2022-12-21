import styled from "styled-components";

const Textarea = styled.textarea`
    display: block;
    resize: none;
    width: calc(100% - 55px);
    // height: auto;
    // /* overflow-y: scroll; */
    // overflow: scroll;
    padding: 10px;
    box-sizing: border-box;
    font-size: 14px;
    background-color: none;
    border: none;

    :focus {
        outline: none;
        // border-bottom: 1px solid #DBDBDB;
    }
`

export default Textarea;