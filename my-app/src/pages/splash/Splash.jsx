import useAuth from "../../hook/useAuth"
import { BgTemp, Bear } from "./splash.style.js"

export default function Splash() {
     //로그인 정보 받아오기
     const data = useAuth();
     console.log(data)
    return (
        //곰이 안보여서 임시로 배경 적용
        <BgTemp>
            <Bear></Bear>
        </BgTemp>
    )
}
