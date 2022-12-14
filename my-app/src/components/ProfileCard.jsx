import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import Button from '../components/Button'
import {useNavigate } from 'react-router-dom';
import chat from '../assets/icon/icon-message-circle.png';
import share from '../assets/icon/icon-share.png'

export default function ProfileCard() {

  const Cont = styled.div`
    text-align: center;

  `;

  const ProfileCont = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items:center;
  `;

  const Profileimg = styled.img`
    height: 110px;
    width: 110px;
  `;

  const Username = styled.h2`
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    margin-top: 16px;
  `;

  const Accountname = styled.p`
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #767676;
    margin-top:6px;
  `;

  const Intro = styled.p`
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #767676;
    margin-top: 16px;
  `;

  const Follower = styled.div`
    font-weight: 700;
    font-size: 18px;
    line-height: 23px;
  `;

  const Following = styled.div`
    font-weight: 700;
    font-size: 18px;
    line-height: 23px;
    color: #767676;
  `;

  const FollowTxt = styled.p`
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    color: #767676;
  `;

  const ButtonCont = styled.div`
    display: flex;
    gap: 10px;
    margin: 25px;
    justify-content: center;
  `;

  const Chatimg = styled.img`
    height: 34px;
    width: 34px;
    border: 1px solid  #DBDBDB;
    border-radius: 30px;
    padding: 9px;
  `;

  const Shareimg = styled.img`
    height: 34px;
    width: 34px;
    border: 1px solid  #DBDBDB;
    border-radius: 30px;
    padding: 9px;
  `;

    const [profileData, setProfileData] = useState({});
    const navigete = useNavigate();

    useEffect(() => {
        const getprofile = async () => {
          const res = await axios.get('https://mandarin.api.weniv.co.kr/profile/hyejee', {
            headers: {
              Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTY5MWQwMTdhZTY2NjU4MWMzMjM1YyIsImV4cCI6MTY3NTk5NjE5MywiaWF0IjoxNjcwODEyMTkzfQ.yX_F68SQOJkak0ud8BUTI3OUHriaIlPqEqDUiWBcf6I"
            }
        });
        setProfileData(res.data.profile);
        }
        getprofile();
    }, [])


    const followlist = (data) => {
      if(data === "followers") navigete('/Follower')
      else if(data === "followings") navigete('/Following')
    }

    const chatorshare = (data) => {

      if(data === "chat") navigete(`/chat/${profileData.accountname}`)
      else if(data === "share") navigete('/share')
    }
  return (
    <Cont>
      <ProfileCont>
        <div>
          <Follower className='follower' onClick={(e) => {followlist("followers", e)}}>{profileData.followerCount}</Follower>
          <FollowTxt>followers</FollowTxt>
        </div>
        <Profileimg src={profileData.image} alt="프로필 사진 이미지" />
        <div>
          <Following onClick={() => {followlist("followings")}}>{profileData.followingCount}</Following>
          <FollowTxt>followings</FollowTxt>
        </div>
      </ProfileCont>
    
        <Username>{profileData.username}</Username>
        <Accountname>@ {profileData.accountname}</Accountname>
        <Intro>{profileData.intro}</Intro>

        <ButtonCont>
          <Chatimg src={chat} alt="채팅하기" onClick={()=> {chatorshare("chat")}}/>
          <Button className='medium'>{profileData.isfollow ? "취소" : "팔로우"}</Button>
          <Shareimg src={share} alt="공유하기" onClick={()=> {chatorshare("share")}}/>
        </ButtonCont>


    </Cont>
    
    
  )
}

