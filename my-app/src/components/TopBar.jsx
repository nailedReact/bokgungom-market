import styled from "styled-components"
import Button1 from "./Button1"

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
`
export default function TopBar({type, title}) {
    const [TypeLeft, TypeRight] = type.split('')
    // console.log(TypeLeft);
    // console.log(TypeRight);
    return (
        <TopBarCont>
            <LeftCont>
                {TypeLeft === "A" && !title ? <div>뒤로가기</div> : <></>}
                {TypeLeft === "B" && title ? <div>{title}</div> : <></>}
                {TypeLeft === "A" && title ?
                <>
                    <div>뒤로가기</div>
                    <div>{title}</div>
                </> :
                <></>}
            </LeftCont>
            <div className='right'>
                {TypeRight === "0"  && <></>}
                {TypeRight === "1"  && <div>미트볼버튼</div>}
                {TypeRight === "2"  && <input placeholder="검색어 입력"/>}
                {TypeRight === "3"  && <div>돋보기 아이콘</div>}
                {TypeRight === "4"  && <Button1 className="ms">저장</Button1>}
            </div>
        </TopBarCont>
    )
}
// 왼쪽
// - 뒤로가기 A
// - 텍스트 B
// - 뒤로가기 + 텍스트 A + text

// 오른쪽
// - 옵션버튼 1
// - 검색창(인풋) 2
// - 검색 아이콘 3
// - 저장 버튼 4
//   무 0
