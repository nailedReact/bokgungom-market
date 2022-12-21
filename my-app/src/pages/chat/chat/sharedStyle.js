import styled, { css } from "styled-components";

const sharedTxtMsg = css`
    max-width: 240px;
    padding: 12px;
    font-size: 14px;
    line-height: 18px;
    font-weight: 400;
`;

const sharedLayout = css`
    display: flex;
    margin-top: 9px;

    &:nth-child(1) {
        margin-top: 0;
    }
`;

const TimeCont = styled.time`
    align-self: flex-end;
    font-size: 10px;
    line-height: 13px;
    color: #767676;
`;

export { sharedTxtMsg, sharedLayout, TimeCont };
