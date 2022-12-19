import styled, { css } from "styled-components";

const sharedTxtMsg = css`
    width: 240px;
    padding: 12px;
    font-size: 14px;
    line-height: 18px;
    font-weight: 400;
`;

const sharedLayout = css`
    display: flex;
`

const TimeCont = styled.time`
    align-self: flex-end;
`;

export { sharedTxtMsg, sharedLayout, TimeCont };
