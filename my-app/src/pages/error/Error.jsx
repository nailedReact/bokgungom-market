import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button"
import Icon404 from "../../assets/404.png"

const Cont = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`

const Icon = styled.img`
    width: 200px;
`

export default function Error() {
    const navigate = useNavigate();
    return (
        <Cont>
            <Icon src={Icon404} alt="" srcset="" />
            <span>페이지를 찾을 수 없습니다!</span>
            <Button className="large" onClick={() => navigate(-1)}>이전 페이지</Button>
        </Cont>
    )
}
