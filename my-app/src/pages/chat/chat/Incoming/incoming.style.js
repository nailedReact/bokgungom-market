import styled from "styled-components";
import { sharedLayout, sharedTxtMsg } from "../sharedStyle";

export const IncomingCont = styled.li`
    ${sharedLayout}

    & .profileImg {
        width: 42px;
        height: 42px;
        border-radius: 50%;
    }

    & .txtMsg {
        ${sharedTxtMsg}
        background-color: white;
        border: 1px solid #C4C4C4;
    }
`