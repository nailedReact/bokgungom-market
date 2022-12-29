import React from 'react';
import Topbtnicon from "../assets/icon/chevron-up.png";
import styled from 'styled-components';


const TopbtnCont = styled.div`
  position: fixed;
  right: 3%;
  bottom: 4%;
  z-index: 1;
  @media screen and (max-width: 768px){
    margin-bottom: 60px;
  }
`

const Topbutton = styled.button`
  padding :8px 10px;
  background-color: #4584a3;
  border-radius: 50%;
  box-shadow: rgb(0 0 0 / 25%) 0px 3px 10px;
  :hover{
    background-color: #78cafe;;
  }
  & img {
    width: 20px;
    height: 20px;
  }
`

export default function Topbtn() {
    
  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
  }

  return (
    <TopbtnCont><Topbutton onClick={scrollToTop} > <img src={Topbtnicon} alt="탑버튼"/> </Topbutton></TopbtnCont>
  )
}
