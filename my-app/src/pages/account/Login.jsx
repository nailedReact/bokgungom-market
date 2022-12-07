export default function Login() {
    return (
    // 이메일 형식, 비밀번호 형식, 가입된 이용자인가 확인 필요
    <main className="container">
        <h1 className="tit_login">로그인</h1>
        <form>
            <label for="inpEmail">이메일</label>
            <input type="text" id="inpEmail" required pattern="[a-zA-Z0-9]+[@][a-zA-Z0-9]*\.[a-zA-Z]+" />

            <label for="inpPw">비밀번호</label>
            <input type="password" id="inpPw" required />
            {/* <strong>이메일 또는 비밀번호가 일치하지 않습니다.</strong> */}

            <button className="btn_login">로그인</button>
            <button className="btn_join">이메일로 회원가입</button>
        </form>
    </main>
    )
}
