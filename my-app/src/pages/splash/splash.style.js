import styled, { keyframes } from "styled-components";
import spriteImg from "../../assets/splash_sprites.png"
import IconKakao from "../../assets/icon/icon-kakao.png"
import IconKakaoHover from "../../assets/icon/icon-kakao-hover.png"
import IconGoogle from "../../assets/icon/icon-google.png"
import IconFaceBook from "../../assets/icon/icon-facebook.png"
import IconFaceBookHover from "../../assets/icon/icon-facebook-hover.png"
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
    /* @media screen and (min-width: 768px){
        width: 30%;
        left: 0;
        border-radius: 0px 10px 10px 0;
        height: 50%;
        transform: translate3d(-100%, 0, 0);
    } */
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
    &::before {
        content: "";
        display: block;
        width: 24px;
        height: 24px;
        background-color: black;
        position: absolute;
        left: 14px;
    }
    &.kakao {
        border-color: #F2C94C;
        &::before {
            background: url(${IconKakao}) no-repeat 0 0 / cover;
        }
        &:hover {
            background-color: #F2C94C;
            &::before {
                background: url(${IconKakaoHover}) no-repeat 0 0 / cover;
            }
        }
    }
    &.google {
        border-color: #767676;
        &::before {
            background: url(${IconGoogle}) no-repeat 0 0 / cover;
        }
        &:hover {
            background-color: #C4C4C4;
            color: #fff;
            /* &::before {
                background: url(${IconKakaoHover}) no-repeat 0 0 / cover;
            } */
        }
    }
    &.facebook {
        border-color: #2D9CDB;
        &::before {
            background: url(${IconFaceBook}) no-repeat 0 0 / cover;
        }
        &:hover {
            background-color: #2D9CDB;
            color: #fff;
            &::before {
                background: url(${IconFaceBookHover}) no-repeat 0 0 / cover;
            }
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