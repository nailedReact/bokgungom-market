import styled from "styled-components";

const InpLabel = styled.label`
    font-size: 12px;
    color: #767676;
    font-weight: 500;

    margin-bottom: 15px;

    display: block;
    margin-top: 40px;

`

const Cont = styled.div`
  display: flex;
  flex-direction: column;  
  margin-top: 16px;

`;


export default function UserInput(props) {
    return (
        <Cont>
            <InpLabel htmlFor={props.inputId}>
                {props.label}
            </InpLabel>
            {props.children}
        </Cont>
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