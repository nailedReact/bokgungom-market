import { useEffect, useState, useRef } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router';
import Button from '../../components/Button';
import UserInput from '../../components/userinput/UserInput';
import Inp from '../../components/userinput/Inp';
import Warning from '../../components/Warning';

export default function Register() {
  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const idAlertMsg = useRef(null);
  const pwAlertMsg = useRef(null);
  const idInput = useRef(null);
  const pwInput = useRef(null);
  const [idVal, setIdVal]= useState();
  const [pwVal, setPwVal]= useState();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  //페이지 로딩됐을 때 이메일 인풋 포커스
  useEffect(() => {
    idInput.current.focus();
  }, []);

  function handleChange(e) {
    e.target.id === "email" && setIdVal(e.target.value);
    e.target.id === "pw" && setPwVal(e.target.value);
  }

  // 이메일 주소 유효성 검사
  const checkEmail =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,5}$/i;

  // 이메일 유효성 검사 후 메시지 출력
  async function checkIdValid() {
    if (checkEmail.test(idVal)){
      try {
        const res = await axios.post(
          "https://mandarin.api.weniv.co.kr/user/emailvalid",
          {
            user: {
              "email": idVal
            },
          },
          {
            header: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(res.data)
        if (res.data.message === "사용 가능한 이메일 입니다.") {
          idAlertMsg.current.textContent = res.data.message;
          idAlertMsg.current.style.display = "none";
          setIdValid(true);
        } else {
          idAlertMsg.current.textContent = ("*" + res.data.message);
          idAlertMsg.current.style.display = "block";
          setIdValid(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
    else {
      idAlertMsg.current.textContent = "*이메일 형식이 올바르지 않습니다.";
      idAlertMsg.current.style.display = "block";
      setIdValid(false);
    }
  }

  const checkPwValid = (e) => {
    if (e.target.value.length < 6){
      pwAlertMsg.current.style.display = "block";
      setPwValid(false);
    }
    else {
      pwAlertMsg.current.style.display = "none";
      setPwValid(true);
    }
  }

  useEffect(() => {
    idValid && pwValid ? setIsDisable(false) : setIsDisable(true);
    setUserData({
      "user": {
        "username": null,
        "email": idVal,
        "password": pwVal,
        "accountname": null, 
        "intro": null, 
        "image": "https://mandarin.api.weniv.co.kr/Ellipse.png"
      }
    })
  }, [idValid, pwValid])

  const handleSubmit = (e) => {
    e.preventDefault(); // 새로고침 막기
    console.log(userData);
    
    navigate('../profile', { state: userData });
    // console.log(userData)
  }

  return (
    <>
      <h1>이메일로 회원가입</h1>
      <form onSubmit={handleSubmit}>
        <UserInput inputId="email" label="이메일">
          <Inp
            type="email"
            id="email"
            ref={idInput}
            placeholder="이메일 주소를 입력해주세요."
            onChange={handleChange}
            onBlur={checkIdValid}
            required
          >
          </Inp>
        </UserInput>
        <Warning ref={idAlertMsg}>
          이메일 안내 메시지
        </Warning>
        <UserInput inputId="pw" label="비밀번호">
          <Inp
            type="password"
            id="pw"
            ref={pwInput}
            placeholder="비밀번호를 설정해주세요."
            onChange={handleChange}
            onBlur={checkPwValid}
            required
          >
          </Inp>
        </UserInput>
        <Warning ref={pwAlertMsg}>* 비밀번호는 6자 이상이어야 합니다.</Warning>
        <Button type="submit" className="large" disabled={isDisable}>다음</Button>
      </form>
    </>
  );
}