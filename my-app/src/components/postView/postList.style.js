import styled from "styled-components";

export const PostViewCont = styled.div`
    display: flex;
    justify-content: right;
    gap: 6px;
    border: 0.5px solid #DBDBDB;
    padding: 9px 16px;
`;
export const BtnOption = styled.button`
    width: 26px;
    height: 26px;
    background: none;
    & p {
        text-indent: -9999px;
    };
    & svg {
        margin-left: -6px;
    };
    &.list {
        & svg {
            filter: ${(props) => (props.view === 'list'? "brightness(50%)" : "brightness(100%)")};
        };
    };
    &.album {
        & svg {
            filter: ${(props) => (props.view === 'list'? "brightness(100%)" : "brightness(50%)")};
        };
    };
`;

export const AlbumCont = styled.div`
    display: grid; 
    grid-template-columns: repeat(3, 1fr);
    position: relative;
    width: 100%;
    grid-gap: 1px;
`;

export const PostCont =styled.div`
    background: white;
    border: 0.5px solid #DBDBDB;
`;

export const NoPost_Txt = styled.p`
    margin-top: 20px;
`;
export const NoPost_img = styled.img`
    width: 120px;
    height: 120px;
`;

export const NoPost_Cont = styled.div`
    background: #fff;
    text-align: center;
    padding-top: 50px;
`;
