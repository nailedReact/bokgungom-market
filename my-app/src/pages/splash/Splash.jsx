import ButtonFollow from "../../components/ButtonFollow"

export default function Splash() {
    return (
        <div>
            <ButtonFollow className="ms" type="follow">팔로우</ButtonFollow>
            <ButtonFollow className="large" type="follow">팔로우</ButtonFollow>
            <ButtonFollow className="ms">취소</ButtonFollow>
            <ButtonFollow className="large">언팔로우</ButtonFollow>
        </div>
    )
}