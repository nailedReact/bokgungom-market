import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Inp from '../../../components/userinput/Inp';
import UserInput from '../../../components/userinput/UserInput';
import Button from '../../../components/button/Button';
import Warning from '../../../components/userinput/Warning';
import {
    Container,
    Form,
    Title,
    JoinLink
} from "../loginRegister.style";
import { BASE_URL } from "../../../config";

export default function Login() {
    const [emailVal, setEmailVal] = useState("");
    const [pwVal, setPwVal] = useState("");
    const [isBtnDisable, setIsBtnDisable] = useState(true);
    const [emailValid, setEmailValid] = useState(false);
    const AlertMsg = useRef(null);
    const navigate = useNavigate();
    const baseUrl = BASE_URL;

    // 이메일 타입 유효성 검사 
    const handleValidation = (e) => {
        if (e.target.id === "email"){
            setEmailVal(e.target.value)
            !e.currentTarget.validity.typeMismatch ? setEmailValid(true) : setEmailValid(false);
        }
        else if (e.target.id === "pw"){
            setPwVal(e.target.value);
        }   
    }

    // 이메일 형식이 유효하고 &&  비밀번호가 6자리 이상이면 버튼 활성화
    useEffect(() => {
        emailValid && pwVal.length >= 6 ? setIsBtnDisable(false) : setIsBtnDisable(true);
    }, [emailValid, pwVal])

    // 로그인 버튼 클릭하면 api전송
    const handleLogin = () => {
        const fetchData = async() => {
            const url = `${baseUrl}/user/login`;
            const loginData = {
                "user": {
                "email": emailVal,
                "password": pwVal
                }
            };

            try {
                const response = await axios.post(
                    url,
                    loginData,
                    {
                        headers: {
                            "Content-type" : "application/json"
                        }
                    }
                );
                const userToken = response.data.user.token;
                localStorage.setItem("Authorization", "Bearer "+ userToken);
                navigate("../../post");
            } catch (error) {
                AlertMsg.current.style.display = "block";
                AlertMsg.current.textContent = "* 이메일 또는 비밀번호가 일치하지 않습니다.";
            }
        };
        fetchData();
    };
    
    return (
        <Container>
            <Title>로그인</Title>
            <Form>
                <UserInput inputId="email" label="이메일">
                    <Inp
                        type="email"
                        id="email"
                        onChange={handleValidation}
                        required
                    >
                    </Inp>
                </UserInput>
                <UserInput inputId="pw" label="비밀번호">
                    <Inp
                        type="password"
                        id="pw"
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
