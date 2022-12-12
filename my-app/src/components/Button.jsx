import styled from "styled-components";

const Button = styled.button`
    background-color: #F26E22; // 변경 예정
    color: #FFFFFF;

    &.small {
        font-size: 12px;
        padding: 7px 11px;
        border-radius: 26px;
    }

    &.ms {
        font-size: 14px;
        padding: 7px 32px;
        border-radius: 32px;
    }

    &.medium {
        font-size: 14px;
        padding: 8px 40px;
        border-radius: 30px;
    }
    
    &.large {
        font-size: 14px;
        padding: 13px 0px;
        border-radius: 44px;
        width: 100%;
    }

    // <Button className="large" active={false}>follow</Button>
    &.small, &.medium {
        background-color: ${(props) => (props.active ? '#F26E22' : '#fff')};
        color: ${(props) => (props.active ? '#fff' : '#767676')};
        box-shadow: ${(props) => (props.active ? 'none' : '0 0 0 1px inset #DBDBDB;')};
    }

    :disabled {
        opacity: 0.4;
    }
`

export default Button;