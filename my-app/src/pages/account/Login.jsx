import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Inp from '../../components/userinput/Inp';
import UserInput from '../../components/userinput/UserInput';
import Button from '../../components/Button';
import Warning from '../../components/Warning';
import {
    Container,
    Form,
    Title,
    JoinLink
} from "./loginRegister.style"

export default function Login() {
    const emailInp = useRef(null);
    const pwInp = useRef(null);
    const [emailVal, setEmailVal] = useState("");
    const [pwVal, setPwVal] = useState("");
    const [isBtnDisable, setIsBtnDisable] = useState(true);
    const [emailValid, setEmailValid] = useState(false);
    const AlertMsg = useRef(null);
    const navigate = useNavigate();

    // 이메일 형식이 유효하고 &&  비밀번호가 6자리 이상이면 버튼 활성화
    useEffect(() => {
        emailValid && pwVal.length >= 6 ? setIsBtnDisable(false) : setIsBtnDisable(true);
    }, [emailValid, pwVal])

    // 이메일 타입 유효성 검사 
    const handleValidation = (e) => {
        if (e.target.id === "email"){
            setEmailVal(emailInp.current.value)
            !e.currentTarget.validity.typeMismatch ? setEmailValid(true) : setEmailValid(false);
        }
        else if (e.target.id === "pw"){
            setPwVal(pwInp.current.value);
        }   
    }

    // 로그인 버튼 클릭하면 api전송
    const handleLogin = (e) => {
        const fetchData = async() => {
            const url = "https://mandarin.api.weniv.co.kr/user/login";
            const loginData = {
                "user":{
                "email": emailVal,
                "password": pwVal
                }
            };
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    "Content-type" : "application/json"
                },
                body:JSON.stringify(loginData)
            });
            const res = await response.json();
            // console.log(res);
            if (res.message){
                console.log('로그인 실패');
                AlertMsg.current.textContent = "*" + res.message;
                AlertMsg.current.style.display = "block";
            }
            else if (res.user){
                console.log('로그인 성공');
                // 로그인이 성공하면 로컬스토리지에 토큰 저장
                const token = res.user["token"];
                localStorage.setItem("Authorization","Bearer " + token);
                AlertMsg.current.style.display = "none";
                navigate("../../post");
            }
        }
        fetchData();
    }
    
    return (
        <Container>
            <Title>로그인</Title>
            <Form>
                <UserInput inputId="email" label="이메일">
                    <Inp
                        type="email"
                        id="email"
                        ref={emailInp}
                        onChange={handleValidation}
                        required
                    >
                    </Inp>
                </UserInput>
                <UserInput inputId="pw" label="비밀번호">
                    <Inp
                        type="password"
                        id="pw"
                        ref={pwInp}
                        onChange={handleValidation}
                        required
                    >
                    </Inp>
                </UserInput>
                <Warning ref={AlertMsg}>
                    로그인 오류 메시지
                </Warning>
                <Button
                    type="button"
                    className="large max"
                    disabled={isBtnDisable}
                    onClick={handleLogin}
                >다음</Button>
                <JoinLink to="../register">이메일로 회원가입</JoinLink>
            </Form>
        </Container>
    )
}
