import styled from "styled-components";

export const Contentimg = styled.img`
    width: 100%;
    object-fit: cover;
    border: 0.5px solid #dbdbdb;
    border-radius: 10px;
`;

export const CommentListBox = styled.ul`
    padding: 20px 16px 80.5px 16px;
    @media screen and (min-width: 768px) {
        padding: 20px;
        margin-bottom: 60px;
    }
`;

export const PostContentBox = styled.div`
    padding: 20px 16px;
`;

export const More = styled.div`
    text-align: center;
`;

export const UserProfilePic = styled.img`
    border: 1px solid #C4C4C4;
`

export const PostEditWrapper = styled.div`
    overflow: auto;
    padding: 20px 16px;
    @media screen and (min-width: 768px) {
        margin-left: 240px;
        padding: 40px;
    }
`;

export const UserProfileImg = styled.img`
    float: left;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #C4C4C4;
`;