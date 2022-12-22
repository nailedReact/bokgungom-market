import React from 'react'
import styled from "styled-components";

const Title = styled.h1`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 12px;
`

const Info = styled.p`
  font-size: 14px;
  text-align: center;
  margin-bottom: 30px;
`

export default function InitialHeading({text, info}) {
  return (
    <>
      <Title>{text}</Title>
      <Info>{info}</Info>
    </>
  )
}
