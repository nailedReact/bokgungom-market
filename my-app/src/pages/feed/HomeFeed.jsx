import { useEffect, useRef } from "react"
import TopBar from "../../components/TopBar";
import axios from "axios";
import FeedFollower from "../feed/FeedFollower";
import FeedNoFollower from "../feed/FeedNoFollower";
import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import {
  FeedCont, PageBtn, PrevNextBtn, Pagenation
} from "./homeFeed.style"

export default function HomeFeed() {
  const [allresMsg, setAllresMsg] = useState([]);
    const [resMsg, setResMsg] = useState([]);
    const [postArr, setPostArr] = useState([]);
    const [passamount, setPassamount] = useState(0);
    const [pageStart, SetPageStart] = useState(0);
    const [pageEnd, SetPageEnd] = useState(5);
    const prevPageRef = useRef(null);
    const nextPageRef = useRef(null);
    
    //전체 게시물을 가져와서 전체 게시물의 갯수를 확인합니다.
    useEffect(() => {
      const getMsg = async () => {
        const res = await axios.get(`https://mandarin.api.weniv.co.kr/post/feed/?limit=infinity`, {
          headers: {
            Authorization : localStorage.getItem("Authorization")
          }
      });
      setAllresMsg(res.data.posts);
      }
      getMsg();
  }, [])

    // 10개씩 게시물을 가져오는 부분입니다.
    useEffect(() => {
        const getMsg = async () => {
          setPostArr([]);
          const res = await axios.get(`https://mandarin.api.weniv.co.kr/post/feed/?limit=10&skip=${passamount}`, {
            headers: {
              Authorization : localStorage.getItem("Authorization")
            }
        });
          setResMsg(res.data.posts);
        }
        getMsg();
    }, [passamount])
    
    //10개씩 가져온 게새물을 화면에 렌더링해주는 부분입니다.
    useEffect(() => {
        if (resMsg.length !== 0){
          resMsg.forEach((item) => {
              setPostArr((postArr) => {
                  return [...postArr, <FeedFollower key={item.id} data={item} postDetailSrc={`/post/${item.id}`} />];
                })
          })
        }
      }, [resMsg])

      //전체 게시물의 갯수에 따라 페이지 버튼을 만드는 부분입니다.
      const handlebutton = () => {
        let arr = [];
        for(let i = 0; i <= (allresMsg.length/10); i++){
            arr.push(<PageBtn key={i+1} id={i+1} onClick={clickbtn} onFocus={changeblue} onBlur={changewhite}> {i+1} </PageBtn>)
        }
        if(arr.length <= 5 && nextPageRef.current && prevPageRef.current){
          nextPageRef.current.disabled = true;
          prevPageRef.current.disabled = true;
        }
        return arr;
       
      }
    
    //페이지 버튼을 누르면 그 페이지로 이동하는 부분입니다.
    const clickbtn = (e) => {
      let id_name = parseInt(e.target.id);
      if(id_name === 1){
        setPassamount(0);
      }else{
        setPassamount((id_name-1)*10);
      }
    }
    
    //페이지 버튼을 눌렀을 때 스타일을 주는 부분입니다.
    const changeblue = (e) => {
      e.target.style.backgroundColor = "#4583a3";
      e.target.style.color = "#fff";
    }

    const changewhite = (e) => {
      e.target.style.backgroundColor = "#ffffff";
    }

    //prev, next 버튼을 누르는 부분입니다.
    const handlePage = (e) => {
      if (e.target.id === "prev"){
        if (pageStart - 5 <= 0){
          SetPageStart(pageStart - 5);
          SetPageEnd(pageEnd - 5);
          e.target.disabled = true;
        }
        else {
          SetPageStart(pageStart - 5);
          SetPageEnd(pageEnd - 5);
          e.target.disabled = false;
        }
        nextPageRef.current.disabled = false;
      }
      else if (e.target.id === "next"){
        if (pageEnd + 5 >= handlebutton().length){
          e.target.disabled = true;
          SetPageStart(pageStart + 5);
          SetPageEnd(pageEnd + 5);
        }
        else {
          SetPageStart(pageStart + 5);
          SetPageEnd(pageEnd + 5);
          e.target.disabled = false;
        }
        prevPageRef.current.disabled = false;
    }
  }
    return (
      <>
        <TopBar type="B3" title="피드"/>
        <FeedCont>
        { resMsg.length === 0 ? 
        <FeedNoFollower /> : postArr}
          {resMsg.length === 0 ? 
          <FeedNoFollower /> :
            <Pagenation>
              <PrevNextBtn id="prev" onClick={handlePage} ref={prevPageRef}>prev</PrevNextBtn> 
              {handlebutton().slice(pageStart, pageEnd)}
              <PrevNextBtn id="next" onClick={handlePage} ref={nextPageRef}>next</PrevNextBtn>
            </Pagenation>}
        </FeedCont>
        <NavBar/>   
      </>   
    )
}