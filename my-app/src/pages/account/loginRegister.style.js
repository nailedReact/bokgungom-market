import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.main`
    width: 87%;
    max-width: 500px;
    margin: 100px auto;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.h1`
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    @media screen and (max-width: 768px) {
        font-size: 24px;
    }
`

export const JoinLink = styled(Link)`
    margin-top: 20px;
    color: #767676;
    font-size: 18px;
    text-align: center;
    @media screen and (max-width: 768px) {
        font-size: 14px;
    }
`