import styled, { keyframes } from "styled-components";
import spriteImg from "../../assets/splash_sprites.png"

const CharacterAni = keyframes`
    to {
        background-position: -915px 0;
    }
`

export const BgTemp = styled.div`
    background-color: #4583A3;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const Bear = styled.div`
    width: 305px;
    height: 480px;
    background: url(${spriteImg}) no-repeat 0 0 / auto 480px;
    animation: ${CharacterAni} .6s infinite steps(3) alternate;
`