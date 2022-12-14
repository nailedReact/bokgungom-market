import styled, { css } from "styled-components"
import Button from "./Button"
import iconArrowLeft from "../assets/icon/icon-arrow-left.png"
import iconSearch from "../assets/icon/icon-search.png"
import iconMoreVertical from "../assets/icon/icon-more-vertical.png"

const TopBarCont = styled.div`
    background-color: gainsboro;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 12px 12px 16px;
`
const LeftCont = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`
const RightCont = styled.div``

const BtnIcon = styled.button`
    ${({action}) => action === "back" && css`
        background: url(${iconArrowLeft});
    `};
    ${({action}) => action === "more" && css`
        background: url(${iconMoreVertical});
    `};
    ${({action}) => action === "search" && css`
        background: url(${iconSearch});
    `};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 24px;
    height: 24px;
`;

export default function TopBar({type, title, right4Ctrl}) {
    // type의 앞글자, type의 뒤의 글자를 변수에 저장한다.
    const [TypeLeft, TypeRight] = type.split('')
    return (
        <TopBarCont>
            <LeftCont>
                {TypeLeft === "A" && !title ? <BtnIcon action="back"/> : <></>}
                {TypeLeft === "B" && title ? <div>{title}</div> : <></>}
                {TypeLeft === "A" && title ?
                <>
                    <BtnIcon action="back"/>
                    <div>{title}</div>
                </> :
                <></>}
            </LeftCont>
            <RightCont>
                {TypeRight === "0"  && <></>}
                {TypeRight === "1"  && <BtnIcon action="more"/>}
                {TypeRight === "2"  && <input placeholder="검색어 입력"/>}
                {TypeRight === "3"  && <BtnIcon action="search"/>}
                {TypeRight === "4"  && <Button className="ms" form={right4Ctrl.form} disabled={right4Ctrl.isDisabled.isBtnVisible}>저장</Button>}
            </RightCont>
        </TopBarCont>
    )
}