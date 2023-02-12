import styled from "styled-components";

const ChatContBack = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: ${(props) => `calc(${props.windowHeight}px - 110.5px)`};
    background-color: #f2f2f2;
`;

const ChatCont = styled.ul`
    overflow-y: scroll;
    padding: 20px 16px 16px 16px;
    @media screen and (min-width: 768px) {
        margin-left: 240px;
        padding: 40px;
    }
`;

export {ChatContBack, ChatCont};