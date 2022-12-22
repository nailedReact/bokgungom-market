import styled from "styled-components";
import { sharedLayout, sharedTxtMsg } from "../sharedStyle";

export const OutgoingCont = styled.li`
    ${sharedLayout}
    flex-direction: row-reverse;

    & .txtMsg {
        ${sharedTxtMsg}
        background-color: var(--color-primary);
        color: white;
        border-radius: 10px 0 10px 10px;
    }

    & .imgMsg {
        width: 240px;
    }

    & .time {
        margin-right: 6px;
    }
`