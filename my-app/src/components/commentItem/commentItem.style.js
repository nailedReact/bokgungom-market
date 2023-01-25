import styled from "styled-components";

export const CommentItemCont = styled.li`
    position: relative;
    margin-top: 22px;

    &:nth-child(1) {
        margin-top: 0;
    };

    & .comment-profile-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        object-fit: cover;
    };

    & .comment-main {
        position: relative;
        left: 48px;
        display: inline-block;
        width: calc(100% - 60px);
        font-size: 14px;
        line-height: 18px;
    };

    & .comment-main h2 {
        display: inline-block;
        font-weight: 500;
    };

    & .comment-main span {
        display: inline-block;
        margin-left: 6px;
        font-size: 10px;
        line-height: 13px;
        color: #767676;
    };

    & .comment-main p {
        margin-top: 16px;
        width: 100%;
        word-break: break-all;
    };

    & .comment-more-btn {
        position: absolute;
        top: 0;
        right: 0;
    };

    @media screen and (min-width: 768px){
        & .comment-main {
            font-size: 16px;
        };
    };
`;