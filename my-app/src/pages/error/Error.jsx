import { useNavigate } from "react-router-dom";
import Button from "../../components/Button"

import {
    Cont,
    CharacterAni,
    ImgCont
} from "./loadingError.style"


export default function Error() {
    const navigate = useNavigate();
    return (
        <Cont>
            <ImgCont></ImgCont>
            <span>페이지를 찾을 수 없습니다!</span>
            <Button className="large" onClick={() => navigate(-1)}>이전 페이지</Button>
        </Cont>
    )
}
