import styled, { css } from "styled-components"
import Button from "./Button"
import iconArrowLeft from "../assets/icon/icon-arrow-left.png"
import iconSearch from "../assets/icon/icon-search.png"
import iconMoreVertical from "../assets/icon/icon-more-vertical.png"
import { useNavigate } from 'react-router-dom';

const TopBarCont = styled.div`
    position: sticky;
    top: 0;
    width: 100vw;
    z-index: 10;
    background-color: white;
    border-bottom: 0.5px solid #DBDBDB;
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
const SearchBtn = styled.button`
    background: url(${iconSearch});
    background-position: center;
    background-size: cover;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 10px;
    top: 17px;
`;
    const Searchinput = styled.input`
        font-size: 14px;
        line-height: 18px;
        background: #F2F2F2;
        border-radius: 32px;
        border: 0;
        height: 32px;
        width: 300px;
        left: 58px;
        padding-left: 10px;
        margin-right: 30px;


    `;

export default function TopBar({type, title, right4Ctrl, onChangeByUpper, onClickGetMsg, onClickModal}) {
    // type의 앞글자, type의 뒤의 글자를 변수에 저장한다.

    const [TypeLeft, TypeRight] = type.split('');
    const navigate = useNavigate();

    return (
        <TopBarCont>
            <LeftCont>
                {TypeLeft === "A" && !title ? <BtnIcon action="back" onClick={() => navigate(-1)}/> : <></>}
                {TypeLeft === "B" && title ? <div>{title}</div> : <></>}
                {TypeLeft === "A" && title ?
                <>
                    <BtnIcon action="back" onClick={() => navigate(-1)}/>
                    <div>{title}</div>
                </> :
                <></>}
            </LeftCont>
            <RightCont>
                {TypeRight === "0"  && <></>}
                {TypeRight === "1"  && <BtnIcon action="more" onClick={onClickModal}/>}
                {TypeRight === "2"  && <>
                <Searchinput
                    type="text"
                    placeholder="계정 검색"
                    onChange ={onChangeByUpper[0]}
                    onKeyUp = {onChangeByUpper[1]}></Searchinput>
                {/* <SearchBtn onClick={onClickGetMsg}></SearchBtn> */}
                </>}
                {TypeRight === "3"  && <BtnIcon action="search" onClick={()=> {navigate("/search")}}/>}
                {TypeRight === "4"  && <Button className="ms" form={right4Ctrl.form} onClick={onClickGetMsg}>저장</Button>}
                {/* disabled={right4Ctrl.isDisabled.isBtnVisible} */}
            </RightCont>
        </TopBarCont>
    )
} 