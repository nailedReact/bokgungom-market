import styled from "styled-components";

export const Title = styled.h1`
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 12px;

    @media screen and (max-width: 768px) {
        font-size: 24px;
    };
`;

export const Info = styled.p`
    font-size: 16px;
    text-align: center;
    margin-bottom: 30px;

    @media screen and (max-width: 768px) {
        font-size: 14px;
    };
`;