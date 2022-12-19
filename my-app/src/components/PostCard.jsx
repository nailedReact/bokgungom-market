/* eslint-disable array-callback-return */
import React from 'react'
import { useState, useEffect } from 'react';
import  heart_active  from '../assets/icon/icon-heart-active.png';
import  heart  from '../assets/icon/icon-heart.png';
import comment from '../assets/icon/icon-message-circle.png';
import styled from 'styled-components';
import axios from 'axios';
// import Heart from './Heart';
const Cont = styled.div`
        display: flex;
        margin-top: 20px;
    `;
    const Username = styled.h2`
        font-weight: 600;
        font-size: 14px;
        line-height: 18px;
    `;

    const Accountname = styled.p`
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        color: #767676;
        margin-top: 2px;
    `;

    const Content = styled.p`
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        margin-top: 16px;
    `;

    const Contentimg = styled.img`
        width: 304px;
        height: 228px;
        border: 0.5px solid #DBDBDB;
        border-radius: 10px;
        margin-top: 16px;
    `;

    const ContentCont = styled.div`
        width: 304px;
    `;

    const Count = styled.span`
        font-weight: 400;
        font-size: 12px;
        line-height: 12px;
        color: #767676;
        margin-left: 7px;
        margin-bottom: 2px;
        
    `;

    const HeartCommentCont = styled.div`
        margin-top: 14px;
    `;
    const Heartimg = styled.img`
        width: 15px;
        height: 15px;
    `;

    const Commentimg = styled.img`
        width: 15px;
        height: 15px;
        margin-left: 18px;
    `;

    const Createdate = styled.span`
        font-weight: 400;
        font-size: 10px;
        line-height: 12px;
        color: #767676;
        margin-top: 18px;
    `;
    const ProfilePicSmall = styled.img`
        width: 42px;
        height: 42px;
    `
export default function PostCard({data, myProfile}) {
    
    

    const [myheart, setMyheart] = useState(data.hearted);
    const [myposthearts, setMyposthearts] = useState(data.posthearts);
    
    const heartchange = async () => {
        if(myheart === false){
            
                const res = await axios.post(`https://mandarin.api.weniv.co.kr/post/${data.id}/heart`, {
                  headers: {
                  Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTY5MWQwMTdhZTY2NjU4MWMzMjM1YyIsImV4cCI6MTY3NTk5NjE5MywiaWF0IjoxNjcwODEyMTkzfQ.yX_F68SQOJkak0ud8BUTI3OUHriaIlPqEqDUiWBcf6I"
                  }
              });
                console.log(res);
          setMyheart(true);
          setMyposthearts(data.heartCount-1);
        }else{
          setMyheart(false);
        }
    }
    console.log(data)
    return (
        <Cont>
            <ProfilePicSmall src= {data.author.image} alt="글쓴이프로필사진" />
            <ContentCont>
                <Username>{data.author.username}</Username>
                <Accountname>@ {data.author.accountname}</Accountname>
                {myProfile ? <button>수정</button> : <></>}
                <Content>{data.content}</Content>
                {(data.image) ? <Contentimg src={data.image} alt="컨텐츠 사진" />
                 : null}
                <HeartCommentCont>
                    <span onClick={heartchange}>
                        {
                        myheart ? 
                        <>
                          <Heartimg src={heart_active} alt="채워진 하트" /> 
                          <Count>{data.heartCount}</Count>
                        </>
                        : 
                        <>
                          <Heartimg src={heart} alt="비워진 하트"/>
                          <Count>{myposthearts}</Count> 
                          
                        </>
                        }
                    </span>
                    <span>
                        <Commentimg src={comment} alt="댓글 아이콘"/>
                        <Count>{data.commentCount}</Count>
                    </span>
                </HeartCommentCont>
                <Createdate>{data.createdAt.slice(0,10)}</Createdate>
            </ContentCont>
        </Cont>        
    )
}
