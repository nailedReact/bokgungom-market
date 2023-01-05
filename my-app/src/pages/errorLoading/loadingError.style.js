import styled, { keyframes } from "styled-components";
import Sprite404 from "../../assets/404_sprites.png"
import SpriteLoading from "../../assets/loading.png"

export const Cont = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`
export const CharacterAni = keyframes`
    to {
        background-position: -1000px 0;
    }
`
export const LoadingAni = keyframes`
    0% {
        transform: rotate(90deg);
    }
    25%{
        transform: rotate(180deg);
    }
    50% {
        transform: rotate(270deg);
    }
    100% {
        background-position: -352px 0;
        transform: rotate(360deg);
    }
`
export const ImgCont = styled.div`
    width: 200px;
    height: 233px;
    background: url(${Sprite404}) no-repeat 0 0 / auto 233px;
    animation: ${CharacterAni} .4s infinite steps(5) alternate;
`
export const ImgContLoading = styled.div`
    width: 88px;
    height: 88px;
    background: url(${SpriteLoading}) no-repeat 0 0 / auto 88px;
    animation: ${LoadingAni} 1s infinite steps(4) alternate;
`