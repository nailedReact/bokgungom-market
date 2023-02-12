import styled from "styled-components";
import plusimg from "../../assets/icon/icon-more-vertical.png";

export const Cont = styled.div`
    display: flex;
    padding: 20px;
    justify-content: center;
    background-color: white;
    border-bottom: 0.5px solid #dbdbdb;
`;

export const Username = styled.h2`
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    @media screen and (min-width: 768px) {
        font-size: 16px;
    };
`;

export const Accountname = styled.p`
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #767676;
    margin-top: 2px;
    cursor: pointer;
    @media screen and (min-width: 768px) {
        font-size: 14px;
    };
`;

export const Content = styled.p`
    width: 100%;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    margin-top: 16px;
    white-space: pre-wrap;
    word-break: break-all;
`;

export const Contentimg = styled.img`
    width: 100%;
    height: auto;
    display: block;
    /* height: 228px; */
    border: 0.5px solid #dbdbdb;
    border-radius: 10px;
    margin-top: 16px;
`;

export const ContentCont = styled.div`
    width: 304px;
    @media screen and (min-width: 768px) {
        width: 400px;
    };
`;

export const Count = styled.span`
    font-weight: 400;
    font-size: 12px;
    color: #767676;
    margin-left: 7px;
    @media screen and (min-width: 768px) {
        font-size: 14px;
    };
`;
export const HeartComment = styled.div`
    display: flex;
    align-items: center;
    margin: 6px 0;
`;
export const HeartCommentCont = styled.div`
    display: flex;
    align-items: center;
    margin-right: 16px;
    cursor: pointer;
`;
export const HeartCommentimg = styled.img`
    width: 15px;
    height: 15px;
    @media screen and (min-width: 768px) {
        width: 18px;
        height: 18px;
    };
`;

export const Createdate = styled.span`
    font-weight: 400;
    font-size: 10px;
    color: #767676;
    @media screen and (min-width: 768px) {
        font-size: 12px;
    };
`;
export const ProfilePicSmall = styled.img`
    width: 42px;
    height: 42px;
    margin-right: 12px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #c4c4c4;
    cursor: pointer;
    @media screen and (min-width: 768px) {
        margin-right: 16px;
    };
`;

export const Plusbutton = styled.button`
    background-image: url(${plusimg});
    width: 25px;
    height: 25px;
    background-color: inherit;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`;

export const HeadCont = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const ImgCont = styled.div`
    display: flex;
    overflow-x: scroll;

    ::-webkit-scrollbar {
        height: 10px;
    };

    ::-webkit-scrollbar-thumb {
        background-color: rgb(125, 125, 125);
        border-radius: 10px;
        background-clip: padding-box;
        border: 1px solid transparent;
        height: 5px;
    };

    ::-webkit-scrollbar-track {
        background-color: transparent;
        border-radius: 10px;
        box-shadow: inset 1px 1px 2px white;
    };
`;