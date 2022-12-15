import { Link } from "react-router-dom";
import useAuth from "../../hook/useAuth"
import { BgTemp, Bear, SplashModal, BtnSocialLogin, LoginRegister } from "./splash.style.js"
export default function Splash() {
    // 로그인 정보 받아오기
    const data = useAuth();
    console.log(data)
    return (
        // 곰이 안보여서 임시로 배경 적용
        <BgTemp>
            <Bear></Bear>
            <SplashModal>
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
        </BgTemp>
    )
}