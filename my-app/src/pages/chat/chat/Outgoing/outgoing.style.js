import styled from "styled-components";
import { sharedLayout, sharedTxtMsg } from "../sharedStyle";

export const OutgoingCont = styled.li`
    ${sharedLayout}
    flex-direction: row-reverse;

    & .txtMsg {
        ${sharedTxtMsg}
        background-color: #F26E22;
        color: white;
    }
`