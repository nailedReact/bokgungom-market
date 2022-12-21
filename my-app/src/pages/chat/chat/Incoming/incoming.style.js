import styled from "styled-components";
import { sharedLayout, sharedTxtMsg } from "../sharedStyle";

export const IncomingCont = styled.li`
    ${sharedLayout}

    & .profileImg {
        width: 42px;
        height: 42px;
        margin-right: 12px;
        border-radius: 50%;
    }

    & .txtMsg {
        ${sharedTxtMsg}
        background-color: white;
        border: 1px solid #C4C4C4;
        border-radius: 0 10px 10px 10px;
    }

    & .time {
        margin-left: 6px;
    }
`