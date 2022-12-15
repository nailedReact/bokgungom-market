import styled from "styled-components";

export const ChatItemCont = styled.li`
    
    width: 358px;

    & * {
        flex-shrink: 0;
    }

    & .link {
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
    }

    & .profileImgWrapper.online::before {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        width: 12px;
        height: 12px;
        background-color: #F26E22;
        border-radius: 50%;
    }

    & .profileImgWrapper .profileImg {
        width: 100%;
        height: 100%;
    }

    & .userNameAndLastChat {
        width: 238px;
    }

    & .userNameAndLastChat .userName {
        margin-top: 2px;
        margin-bottom: 4px;
        font-size: 14px;
        font-weight: 400;
        line-height: 17.53px;
    }

    & .userNameAndLastChat .lastChat {
        font-size: 12px;
        font-weight: 400;
        line-height: 15.02px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    & .date {
        align-self: flex-end;
        margin-left: auto;
        font-size: 10px;
        line-height: 12.52px;
        color: #dbdbdb;
    }
`;