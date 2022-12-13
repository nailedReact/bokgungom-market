import React from 'react'
import {useState, useEffect} from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [button, setButton] = useState(true);

  const handleInputId = (e) => {
    setEmail(e.target.value)
  }
  const handleInputPw = (e) => {
    setPw(e.target.value)
  }

  // 이메일에 @가 포함되고 비밀번호가 6자리 이상이면 버튼 활성화
  useEffect(() => {
    email.includes('@') && pw.length >= 6 ? setButton(false) : setButton(true);
  }, [email, pw])

  // 로그인 버튼 클릭하면 api전송
  const onClickLogin = (e) => {
    const fetchData = async() => {
      const url = "https://mandarin.api.weniv.co.kr/user/login";
      const loginData = {
        "user":{
          "email": email,
          "password": pw
        }
      };
      const response = await fetch(url,{
        method:"POST",
        headers:{
            "Content-type" : "application/json"
        },
        body:JSON.stringify(loginData)
      });
      const json = await response.json();
      console.log(json);

      // 로그인이 성공하면 로컬스토리지에 토큰 저장
      const token = json.user["token"]
      localStorage.setItem("Authorization","Bearer " + token);
    };
    fetchData()
  }
  
  return (
    <main className="container">
        <h1 className="tit_login">로그인</h1>
        <form>
            <label htmlFor="inpEmail">이메일</label>
            <input
              type="email"
              name="inpEmail"
              className="login"
              value={email}
              onChange={handleInputId}
            />

            <label htmlFor="inpPw">비밀번호</label>
            <input
            type="password"
            name="inpPw"
            className="login"
            value={pw}
            onChange={handleInputPw}
            />

            <button type='button' className="btn_login" disabled={button}
            onClick={onClickLogin} >
              로그인
            </button>

            <button className="btn_join">이메일로 회원가입</button>
        </form>
    </main>
  )
}
