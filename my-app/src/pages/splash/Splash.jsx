import useAuth from "../../hook/useAuth"

export default function Splash() {
    // 로그인 정보 받아오기
    const data = useAuth();
    console.log(data)
    return (
        <div>splash</div>
    )
}