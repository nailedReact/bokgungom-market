export default function UserInput(props) {
    return (
        <>
            <label htmlFor={props.inputId}>
                {props.label}
            </label>
            {props.children}
        </>
    )
}
// 사용법
{/* 
import Inp from "../../components/userinput/Inp";
import UserInput from "../../components/userinput/UserInput";

<UserInput inputId="email" label="이메일">
    <Inp
        type="email"
        id="email"
        ref={null}
        placeholder="이메일 주소를 입력해주세요."
        onBlur={console.log('click!')}
        required>
    </Inp>
</UserInput>
*/}