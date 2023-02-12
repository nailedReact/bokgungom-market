import styled from "styled-components";

export const Contentimg = styled.img`
    position: absolute;
    transform: translate(50, 50);
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: auto;
`;

export const Multiimg = styled.img`
    position: absolute;
    top: 4%;
    right: 4%;
    width: 18%;
    height: 18%;
    @media screen and (min-width: 768px){
        width: 14%;
        height: 14%;
    };
`;

export const AlbumCont = styled.div`
    position: relative;
`;

export const ImgCont = styled.div`
    width: 100%;
    position: relative;
    overflow: hidden;
    outline: 1px solid #C4C4C4;
    &::after {
        content: "";
        display: block;
        padding-bottom: 100%;
    };
`;