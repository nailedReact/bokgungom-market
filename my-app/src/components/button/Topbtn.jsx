import SVGIcon from '../icon/SVGIcon';
import {
  TopbtnCont,
  Topbutton
} from "./topbtn.style";

export default function Topbtn() {
    
  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
  }

  return (
    <TopbtnCont><Topbutton onClick={scrollToTop} > 
    <p>페이지 상단으로 이동하기 버튼</p>
    <SVGIcon id="chevron-up" alt="페이지 상단으로 이동하기 버튼" width="20" height="20"/>
    </Topbutton></TopbtnCont>
  )
}
