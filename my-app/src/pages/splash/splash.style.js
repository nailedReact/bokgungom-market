import styled, { keyframes } from "styled-components";
import spriteImg from "../../assets/splash_sprites.png"
import IconKakao from "../../assets/icon/icon-kakao.png"
import IconKakaoHover from "../../assets/icon/icon-kakao-hover.png"
import IconGoogle from "../../assets/icon/icon-google.png"
import IconFaceBook from "../../assets/icon/icon-facebook.png"
import IconFaceBookHover from "../../assets/icon/icon-facebook-hover.png"

const CharacterAni = keyframes`
    to {
        background-position: -915px 0;
    }
`

export const BgCont = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-primary);
    width: 100vw;
    height: 100vh;
`
export const Bear = styled.div`
    width: 305px;
    height: 480px;
    background: url(${spriteImg}) no-repeat 0 0 / auto 480px;
    animation: ${CharacterAni} .6s infinite steps(3) alternate;
`

export const SplashModal = styled.article`
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 50px 34px;
    background-color: white;
    color: #767676;
    font-size: 14px;
    border-radius: 10px 10px 0 0;
    transform: translate3d(0, 100%, 0);
    transition: 1s;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
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