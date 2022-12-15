import { useRef } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hook/useAuth"
import { BgCont, Bear, SplashModal, BtnSocialLogin, LoginRegister } from "./splash.style.js"

export default function Splash() {
    // 로그인 정보 받아오기
    const data = useAuth();
    console.log(data);

    const modalRef = useRef();

    // 처음 실행 시 5초 뒤에 로그인 모달창이 뜨도록 함
    setTimeout(function(){
        modalRef.current.style.transform = "translate3d(0, 0, 0)";
    }, 5000)

    // 모달창 바깥 영역을 클릭했을 때 모달창을 토글할 수 있도록 처리
    function handleModal(e){
        if (e.target.id === "back" || e.target.id === "bear"){
            if (modalRef.current.style.transform === "translate3d(0px, 0px, 0px)"){
                modalRef.current.style.transform = "translate3d(0, 100%, 0)";
            }
            else {
                modalRef.current.style.transform = "translate3d(0px, 0px, 0px)";
            }
        }
        else {
            return;
        }
    }
    return (


        <BgCont onClick={handleModal} id="back">
            <Bear id="bear"></Bear>
            <SplashModal ref={modalRef}>
                <BtnSocialLogin className="kakao">
                    카카오톡 계정으로 로그인
                </BtnSocialLogin>
                <BtnSocialLogin className="google">
                    구글 아이디로 로그인
                </BtnSocialLogin>
                <BtnSocialLogin className="facebook">
                    페이스북 계정으로 로그인
                </BtnSocialLogin>
                <LoginRegister>
                    <Link to="/account/login">이메일로 로그인</Link>
                    |
                    <Link to="/account/register">회원가입</Link>
                </LoginRegister>
            </SplashModal>
        </BgCont>

    )
}
