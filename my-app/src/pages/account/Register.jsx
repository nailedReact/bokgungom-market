import { useEffect, useState, useRef } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router';
import Button from '../../components/Button';
import UserInput from '../../components/userinput/UserInput';
import Inp from '../../components/userinput/Inp';
import Warning from '../../components/shared/Warning/Warning';

export default function Register() {
  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const idInput = useRef(null);
  const pwInput = useRef(null);
  const [userEmail, setUserEmail] = useState(null);
  const [resMsg, setResMsg] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [idWarn, setIdWarn] = useState('이메일 경고 메시지');
  const [pwWarn, setPwWarn] = useState('비밀번호는 6자 이상이어야 합니다.');
  const [isActiveIdWarn, setIsActiveIdWarn] = useState(false);
  const [isActivePwWarn, setIsActivePwWarn] = useState(false);


  const checkValid = (e) => {
    if (e.target.id === "email"){
      if (e.target.validity.valueMissing){
        setIdWarn("값을 입력해주세요.")
        setIdValid(false);
      }
      else if (e.target.validity.typeMismatch){
        setIdWarn("알맞은 형식을 입력해주세요.")
        setIdValid(false);
      }
      else if (resMsg.message === "이미 가입된 이메일 주소 입니다."){
        setIdWarn("이미 가입된 이메일 주소입니다.")
        setIdValid(false);
      }
      else {
        e.target.setCustomValidity('')
        setIsActiveIdWarn(false);
        setIdValid(true);
        return;
      }
      setIsActiveIdWarn(true);
    }
    else if (e.target.id === "pw"){
      if (e.target.value.length < 6){
        setIsActivePwWarn(true);
        setPwValid(false);
      }
      else {
        setIsActivePwWarn(false);
        setPwValid(true);
      }
    }
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
        setResMsg(res.data);
      }
      getMsg();
  }, [userEmail, resMsg, isActiveIdWarn])

  useEffect(() => {
    idValid && pwValid ? setIsDisable(false) : setIsDisable(true);
  }, [idValid, pwValid])

  const handleSubmit = (e) => {
    e.preventDefault(); // 새로고침 막기
    // console.log(email, password,displayName);
    
    // navigate('../profile', { state: userData });
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
        <Warning message={idWarn} visible={isActiveIdWarn}></Warning>
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
        <Warning message={pwWarn} visible={isActivePwWarn}></Warning>
        <Button type="submit" className="large" disabled={isDisable}>다음</Button>
      </form>
    </>
  );
}