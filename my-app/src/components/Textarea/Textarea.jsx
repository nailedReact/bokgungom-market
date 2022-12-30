import styled from "styled-components";

const Textarea = styled.textarea`
    display: block;
    resize: none;
    width: calc(100% - 42px);
    overflow: hidden;
    font-family: "Pretendard";
    padding: 10px 10px 10px 13px;
    box-sizing: border-box;
    font-size: 14px;
    background-color: none;
    border: none;

    :focus {
        outline: none;
        // border-bottom: 1px solid #DBDBDB;
    }

    @media screen and (min-width: 768px){
        font-size: 16px;
    }
`

export default Textarea;