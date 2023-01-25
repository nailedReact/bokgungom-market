import styled from "styled-components";

const InpLabel = styled.label`
    font-size: 16px;
    color: #767676;
    font-weight: 500;
    margin-bottom: 15px;
    display: block;
    margin-top: 40px;
    @media screen and (max-width: 768px) {
        font-size: 14px;
    };
`;

const Cont = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 12px;
    @media screen and (max-width: 768px){
        margin-top: 0px;
    };
`;


export default function UserInput(props) {
    return (
        <Cont>
            <InpLabel htmlFor={props.inputId}>
                {props.label}
            </InpLabel>
            {props.children}
        </Cont>
    );
};