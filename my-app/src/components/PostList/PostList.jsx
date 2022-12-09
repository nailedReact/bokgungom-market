import React from 'react'
import { useState } from 'react';
import  heart_active  from '../../assets/icon/icon-heart-active.png';
import  heart  from '../../assets/icon/icon-heart.png';
import comment_active from '../../assets/icon/icon-message-circle-fill.png';
import comment from '../../assets/icon/icon-message-circle.png';

// import userimg from '../../assets/basic-profile-img.png'

export default function PostList({data}) {
  const [myheart, setMyheart] = useState(false);
  const [myposthearts, setMyposthearts] = useState(data.posthearts);

  const [mycomment, setMycomment] = useState(false);
  const [mypostcomments, setMypostcomments] = useState(data.postcomments);
  
  const heartchange = () => {
    if(myheart === false){
      setMyheart(true);
      setMyposthearts(data.posthearts+1);
    }else{
      setMyheart(false);
    }
  }

  const commentchange = () => {
    if(mycomment === false){
      setMycomment(true);
      setMypostcomments(data.postcomments+1);
    }else{
      setMycomment(false);
    }
  }

  return (
    <>
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
      </span>
    </>
  )
}
