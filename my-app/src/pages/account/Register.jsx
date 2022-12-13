import { useEffect, useState, useRef } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router';
import Button from '../../components/Button';
import UserInput from '../../components/userinput/UserInput';
import Inp from '../../components/userinput/Inp';

export default function Register() {
  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const idAlertMsg = useRef(null);
  const pwAlertMsg = useRef(null);
  const idInput = useRef(null);
  const pwInput = useRef(null);
  const [userEmail, setUserEmail] = useState(null);
  const [resMsg, setResMsg] = useState(null);
  const [userData, setUserData] = useState(null)
  const navigate = useNavigate();

  const checkValid = (e) => {
    if (e.target.id === "email"){
      if (e.target.validity.valueMissing){
        idAlertMsg.current.textContent = "*값을 입력해주세요.";
        setIdValid(false);
      }
      else if (e.target.validity.typeMismatch){
        idAlertMsg.current.textContent = "*알맞은 형식을 입력해주세요.";
        setIdValid(false);
      }
      else if (resMsg && resMsg.message === "이미 가입된 이메일 주소 입니다."){
        idAlertMsg.current.textContent = "*이미 가입된 이메일 주소입니다.";
        setIdValid(false);
      }
      else {
        e.target.setCustomValidity('')
        idAlertMsg.current.style.display = "none";
        setIdValid(true);
        return;
      }
      idAlertMsg.current.style.display = "block";
    }
    else if (e.target.id === "pw"){
      if (e.target.value.length < 6){
        pwAlertMsg.current.style.display = "block";
        setPwValid(false);
      }
      else {
        pwAlertMsg.current.style.display = "none";
        setPwValid(true);
      }
    }
    setUserEmail(idInput.current.value);
    setUserData({
      "user": {
          "username": null,
          "email": userEmail,
          "password": pwInput.current.value,
          "accountname": null, 
          "intro": null, 
          "image": "https://mandarin.api.weniv.co.kr/Ellipse.png"
      }
    })
  }

  useEffect(() => {
      const getMsg = async () => {
        setUserEmail(idInput.current.value);
        const res = await axios.post('https://mandarin.api.weniv.co.kr/user/emailvalid', {
          "user":{
              "email": userEmail
          }
        })
        .then(res => setResMsg(res.data))
        .catch(err => console.log(err))
        console.log('aßß')
      }
      getMsg();
  }, [userEmail])

  useEffect(() => {
    idValid && pwValid ? setIsDisable(false) : setIsDisable(true);
  }, [idValid, pwValid])

  const handleSubmit = (e) => {
    e.preventDefault(); // 새로고침 막기
    // console.log(email, password,displayName);
    
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
            onBlur={checkValid}
            required
          >
          </Inp>
        </UserInput>
        <span
          ref={idAlertMsg}
          style={{color: "red", display:"none"}}>
          이메일 안내 메시지
        </span>
        <UserInput inputId="pw" label="비밀번호">
          <Inp
            type="password"
            id="pw"
            ref={pwInput}
            placeholder="비밀번호를 설정해주세요."
            onBlur={checkValid}
            required
          >
          </Inp>
        </UserInput>
        <span
          ref={pwAlertMsg}
          style={{color: "red", display:"none"}}>
        * 비밀번호는 6자 이상이어야 합니다.</span>
        <Button type="submit" className="large" disabled={isDisable}>다음</Button>
      </form>
    </>
  );
}