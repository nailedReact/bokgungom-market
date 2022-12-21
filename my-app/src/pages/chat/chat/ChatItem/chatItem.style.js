import styled from "styled-components";

export const ChatItemCont = styled.li`
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }

    & .link {
        position: relative;
        text-decoration: none;
        display: flex;
        color: initial;
    }

    & .profileImgWrapper {
        position: relative;
        width: 42px;
        height: 42px;
        margin-right: 12px;
        border-radius: 50%;
        object-fit: cover;
        flex-shrink: 0;
    }

    & .profileImgWrapper.online::before {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        width: 12px;
        height: 12px;
        background-color: var(--color-primary);
        border-radius: 50%;
    }

    & .profileImgWrapper .profileImg {
        width: 100%;
        height: 100%;
    }

    & .userNameAndLastChat {
        width: calc(100% - 100px);
    }

    & .userNameAndLastChat .userName {
        margin-bottom: 4px;
        font-size: 14px;
        line-height: 18px;
        color: #000000;
    }

    & .userNameAndLastChat .lastChat {
        font-size: 12px;
        line-height: 15px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    & .date {
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 10px;
        line-height: 13px;
        color: #dbdbdb;
    }
`;