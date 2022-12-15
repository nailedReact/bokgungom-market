import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Button from "../../components/Button"
import Sprite404 from "../../assets/404_sprites.png"

const Cont = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`
const CharacterAni = keyframes`
    to {
        background-position: -1000px 0;
    }
`

const ImgCont = styled.div`
    width: 200px;
    height: 233px;
    background: url(${Sprite404}) no-repeat 0 0 / auto 233px;
    animation: ${CharacterAni} .4s infinite steps(5) alternate;
`
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
