import Button from "../button/Button"
import { useNavigate } from 'react-router-dom';
import SVGIcon from "../icon/SVGIcon"
import { 
    TopBarCont,
    LeftCont,
    RightCont,
    BtnIcon,
    Searchinput,
    LogoCont

} from "./topbar.style"


export default function TopBar({type, title, right4Ctrl, onChangeByUpper, onClickGetMsg, onClickModal}) {
    // type의 앞글자, type의 뒤의 글자를 변수에 저장한다.
    const [TypeLeft, TypeRight] = type.split('');
    const navigate = useNavigate();
    const handleClickLogo = () => {
        if (localStorage.getItem("Authorization")){
            navigate("../../../../post");
        }
        else {
            navigate("../../../../account/login");
        }
    }
    return (
        <TopBarCont>
            <LeftCont>
                {TypeLeft === "A" && !title ? <>
                    <BtnIcon action="back" onClick={() => navigate(-1)}><SVGIcon id="icon-arrow-left" alt="뒤로가기 버튼"/></BtnIcon>
                    <LogoCont onClick={handleClickLogo}/>
                    </>
                : <></>}
                {TypeLeft === "B" && title ? <>
                    <LogoCont onClick={handleClickLogo}/>
                    <div>{title}</div>
                    </>
                : <></>}
                {TypeLeft === "A" && title ?
                <>
                    <BtnIcon action="back" onClick={() => navigate(-1)}><SVGIcon id="icon-arrow-left" alt="뒤로가기 버튼"/></BtnIcon>
                    <div>{title}</div>
                </>
                : <></>}
            </LeftCont>
            
            <RightCont>
                {TypeRight === "0"  && <></>}
                {TypeRight === "1"  && <BtnIcon action="more" onClick={onClickModal}><SVGIcon id="icon-more" alt="검색하기 버튼"/> </BtnIcon>}
                {TypeRight === "2"  && <>
                <Searchinput
                    type="text"
                    placeholder="계정 검색"
                    onChange ={onChangeByUpper[0]}
                    onKeyUp = {onChangeByUpper[1]}></Searchinput>
                {/* <SearchBtn onClick={onClickGetMsg}></SearchBtn> */}
                </>}
                {TypeRight === "3"  && <BtnIcon action="search" onClick={()=> {navigate("/search")}}><SVGIcon id="icon-search" alt="검색하기 버튼"/></BtnIcon>}
                {TypeRight === "4"  && <Button className="ms" form={right4Ctrl.form} onClick={onClickGetMsg} disabled={right4Ctrl.isDisabled}>저장</Button>}
                {/* disabled={right4Ctrl.isDisabled.isBtnVisible} */}
            </RightCont>
        </TopBarCont>
    )
} 