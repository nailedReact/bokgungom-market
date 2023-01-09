import styled, { keyframes } from "styled-components";
import spriteImg from "../../assets/splash_sprites.png"
import LogoImg from "../../assets/logotypo.png"

const CharacterAni = keyframes`
    to {
        background-position: -915px 0;
    }
`
const MobileAni = keyframes`
    to {
        background-position: -457.75px 0;
    }
`
export const BgCont = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-primary);
    width: 100%;
    height: calc(100vh);
    overflow: hidden;
    position: relative;
`
export const Bear = styled.div`
    width: 305px;
    height: 480px;
    background: url(${spriteImg}) no-repeat 0 0 / auto 480px;
    animation: ${CharacterAni} .6s infinite steps(3) alternate;
    @media screen and (max-width: 768px){
        width: 152.5px;
        height: 240px;
        background: url(${spriteImg}) no-repeat 0 0 / auto 240px;
        animation: ${MobileAni} .6s infinite steps(3) alternate;
    }
`

export const SplashModal = styled.article`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    position: absolute;
    padding: 50px 34px;
    background-color: white;
    color: #767676;
    font-size: 16px;
    transition: 1s;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    bottom: 0;
    width: 100%;
    transform: translate3d(0, 100%, 0);
    border-radius: 10px 10px 0 0;
    @media screen and (max-width: 768px){
        font-size: 14px;
    }
`

export const BtnSocialLogin = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 13px 0px;
    border: 1px solid black;
    position: relative;
    border-radius: 44px;
    background-color: initial;
    color: inherit;
    font-size: 16px;
    @media screen and (max-width: 768px){
        font-size: 14px;
    }
    & svg {
        float: left;
        position: absolute;
        left: 14px;
    }

    &:hover {
        & svg {
            filter: brightness(500%);
        }
    }

    &.kakao {
        border-color: #F2C94C;
        &:hover {
            background-color: #F2C94C;
        }
    }
    &.google {
        border-color: #C4C4C4;
        &:hover {
            background-color: #C4C4C4;
            color: #fff;
        }
    }
    &.facebook {
        border-color: #2D9CDB;
        &:hover {
            background-color: #2D9CDB;
            color: #fff;
        }
    }
`

export const LoginRegister = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    padding: 20px;
`

export const LogoCont = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const Logo = styled.div`
    width: 100%;
    height: 3em;
    background: url(${LogoImg}) no-repeat center/ contain;
`