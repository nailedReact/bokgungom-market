
import { useEffect, useRef } from "react"
import TopBar from "../../components/TopBar";
import axios from "axios";
import FeedFollower from "../feed/FeedFollower";
import FeedNoFollower from "../feed/FeedNoFollower";
import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import {
  FeedCont, PageBtn, PrevNextBtn
} from "./homeFeed.style"
import styled from "styled-components";

/* eslint-disable */

const Pagenation = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  gap: 10px;
`
export default function HomeFeed() {
  const [allresMsg, setAllresMsg] = useState([]);
    const [resMsg, setResMsg] = useState([]);
    const [postArr, setPostArr] = useState([]);
    const [passamount, setPassamount] = useState(0);
    const [pageStart, SetPageStart] = useState(0);
    const [pageEnd, SetPageEnd] = useState(5);
    const prevPageRef = useRef(null);
    const nextPageRef = useRef(null);
    
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
    
    useEffect(() => {
        if (resMsg.length !== 0){
          resMsg.forEach((item) => {
              setPostArr((postArr) => {
                  return [...postArr, <FeedFollower key={item.id} data={item} postDetailSrc={`/post/${item.id}`} />];
                })
          })
        }
      }, [resMsg])

    
      const handlebutton = () => {
        let arr = [];
        for(let i = 0; i <= (allresMsg.length/10); i++){
            arr.push(<PageBtn key={i+1} id={i+1} onClick={clickbtn}> {i+1} </PageBtn>)
        }
        return arr;
      }

    const clickbtn = (e) => {
      console.log(e.target);
      let id_name = parseInt(e.target.id);
      if(id_name === 1){
        setPassamount(0);
      }else{
        setPassamount((id_name-1)*10);
      }
    }

    // const next = (e) => {
    //   if (pageEnd + 5 >= handlebutton().length){
    //     e.target.disabled = true;
    //     SetPageStart(pageStart + 5);
    //     SetPageEnd(pageEnd + 5);
    //   }
    //   else {
    //     SetPageStart(pageStart + 5);
    //     SetPageEnd(pageEnd + 5);
    //     e.target.disabled = false;
    //   }
    //   // console.log(page);
    // }
    // const prev = (e) => {
    //   console.log(e.target.parentNode.childNode)
    //   if (pageStart - 5 == 0){
    //     console.log(e.target.disabled);
    //     e.target.disabled = true;
    //     SetPageStart(pageStart - 5);
    //     SetPageEnd(pageEnd - 5);
    //   }
    //   else {
    //     SetPageStart(pageStart - 5);
    //     SetPageEnd(pageEnd - 5);
    //     e.target.disabled = false;
    //   }
    // }
    const handlePage = (e) => {
      console.log(pageStart, pageEnd)
      
      if (e.target.id === "prev"){
        if (pageStart - 5 <= 0){
          console.log(e.target.disabled);
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
    console.log(pageStart, pageEnd)
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