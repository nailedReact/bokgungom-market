import React from 'react'
import styled from "styled-components";

const Title = styled.h1`
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 12px;

    @media screen and (max-width: 768px) {
      font-size: 24px;
    };
`;

const Info = styled.p`
  font-size: 16px;
  text-align: center;
  margin-bottom: 30px;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  };
`;

export default function InitialHeading({text, info}) {
  return (
    <>
      <Title>{text}</Title>
      <Info>{info}</Info>
    </>
  );
};