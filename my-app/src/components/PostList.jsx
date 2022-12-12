/* eslint-disable array-callback-return */

import React from 'react'
import { useState, useEffect } from 'react';
// import  heart_active  from '../assets/icon/icon-heart-active.png';
// import  heart  from '../assets/icon/icon-heart.png';
// import comment_active from '../assets/icon/icon-message-circle-fill.png';
// import comment from '../assets/icon/icon-message-circle.png';
import axios from 'axios';

// import userimg from '../../assets/basic-profile-img.png'

export default function PostList() {
  // const [myheart, setMyheart] = useState(false);
  // const [myposthearts, setMyposthearts] = useState(data.posthearts);

  // const [mycomment, setMycomment] = useState(false);
  // const [mypostcomments, setMypostcomments] = useState(data.postcomments);

  const [resMsg, setResMsg] = useState([]);
  const [postArr, setPostArr] = useState([]);

  useEffect(() => {
    const getMsg = async () => {
      const res = await axios.get('https://mandarin.api.weniv.co.kr/post/sasha1107/userpost', {
        headers: {
          Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTY4ZjYwMTdhZTY2NjU4MWMzMjMyNiIsImV4cCI6MTY3NTk5NTc3MSwiaWF0IjoxNjcwODExNzcxfQ.bD2PQEEpzGKw9_-1fCXss79KsMIxzm_lmZQwIe7clZE"
        }
    });
      setResMsg(res.data.post);
      console.log(res.data)
    }
    getMsg();
}, [])

  useEffect(() => {
    if (resMsg.length !== 0){
      resMsg.forEach((item) => {
          setPostArr((postArr) => {
            console.log(postArr)
            return [...postArr, <h2 key={item.id}>{item.content}</h2>]
          })
      })
    }
  }, [resMsg])
  
  
  // resMsg && 
  // console.log(resMsg.post)
  // resMsg.forEach(i => console.log(i))
  // const arr1 = [1,2,3]
  // const ComponentsArray = resMsg.map((i) => (
  //   <h1 key={i.toString()}>
  //     안녕, {i.content}호
  //   </h1>
  // ));
  
  // const heartchange = () => {
  //   if(myheart === false){
  //     setMyheart(true);
  //     // setMyposthearts(data.posthearts+1);
  //   }else{
  //     setMyheart(false);
  //   }
  // }

  // const commentchange = () => {
  //   if(mycomment === false){
  //     setMycomment(true);
  //     // setMypostcomments(data.postcomments+1);
  //   }else{
  //     setMycomment(false);
  //   }
  // }
  // useEffect(() => {
  //   if (resMsg){
  //     setPostArr(resMsg.map(i => i))
  //     console.log(postArr)

  //   }
  //   }, [postArr, resMsg])
  // console.log(resMsg);
  
  // console.log(postArr);
  // resMsg ? setPostArr(resMsg) : console.log('로딩중');
  // postArr ? console.log(postArr) : console.log('post arr 로딩중');
  // resMsg.map(i => console.log(i))
  // const a = resMsg.map((item, index) => {
  //   <h2 key={index}>{item}</h2>
  // });


  return (
    <>
      {postArr}


 {/*
       <img src= {data.userimage} alt="글쓴이프로필사진" />
      <h2>{data.username}</h2>
      <p>{data.userid}</p>
      <p>{data.content}</p>
      {(data.contentimg) ?
      <img src={data.contentimg} alt="컨텐츠 사진" />
      : null
      }
      <span onClick={heartchange}>
        {
        myheart ? 
        <>
          <img src={heart_active} alt="채워진 하트" /> 
          <p>{myposthearts}</p>
        </>
        
        : 
        <>
          <img src={heart} alt="비워진 하트"/> 
          <p>{data.posthearts}</p>
        </>
        
        }
      </span>
      <span onClick={commentchange}>
        {
        mycomment ? 
        <>
          <img src={comment_active} alt="채워진 댓글" /> 
          <p>{mypostcomments}</p>
        </>
        
        : 
        <>
          <img src={comment} alt="비워진 댓글"/>
          <p>{data.postcomments}</p>
        </>
        
        }
      </span>  */}
    </>
  )
}
