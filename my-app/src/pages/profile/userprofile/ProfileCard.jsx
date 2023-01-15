import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import Button from '../../../components/button/Button'
import { useNavigate } from 'react-router-dom';
import chat from '../../../assets/icon/icon-message-circle.png';
import share from '../../../assets/icon/icon-share.png'
import { UserNameContext } from "./Profile"
import basicprofile from "../../../assets/basic-profile-img.png"


  const Cont = styled.div`
    text-align: center;
    border: 0.5px solid #DBDBDB;
    background: #FFFFFF;
  `;

  const ProfileCont = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    margin-top:30px;
    gap: 40px;
  `;

  const Profileimg = styled.img`
    height: 110px;
    width: 110px;
    border-radius: 50%;
    border: 1px solid #C4C4C4;
    object-fit: cover;
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
    cursor: pointer;
  `;

  const Following = styled.div`
    font-weight: 700;
    font-size: 18px;
    line-height: 23px;
    color: #767676;
    cursor: pointer;
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
    align-items:center;
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

export default function ProfileCard() {
    const [profileData, setProfileData] = useState({});
    const [checkFollowing, setCheckFollowing] = useState(profileData.isfollow)
    const navigate = useNavigate();
    const { username, isMyProfile } = useContext(UserNameContext);
    const [temp, setTemp] = useState(1);

    useEffect(() => {
      setCheckFollowing(profileData.isfollow)
    }, [profileData])

    useEffect(() => {
        const getprofile = async () => {
          const URL = "https://mandarin.api.weniv.co.kr/profile/" + username;
          const res = await axios.get(URL, {
            headers: {
              Authorization : localStorage.getItem("Authorization")
            }
        });
        setProfileData(res.data.profile);
        }
        getprofile();
    }, [temp, checkFollowing, username])

    const chatorshare = (data) => {
      if(data === "chat") navigate(`/chat`)
      else if(data === "share") navigate('/share')
    }

    const followingchange = async(e) => {
      setTemp(temp => temp + 1)
      if(e.target.value === "true"){
          const unfollow = await axios.delete(
              `https://mandarin.api.weniv.co.kr/profile/${profileData.accountname}/unfollow`,{
              headers: {
                  Authorization: localStorage.getItem("Authorization")
              }
              });
          console.log(unfollow.data);
          setCheckFollowing(false)
          
      } else{
        const follow = await axios.post(
          `https://mandarin.api.weniv.co.kr/profile/${profileData.accountname}/follow`,{},{
            headers: {
              Authorization: localStorage.getItem("Authorization")
            }
          });
          console.log(follow.data);
          setCheckFollowing(true);
      }
    }

    const handleShare = () => {
      let currentUrl = '';
      currentUrl = window.document.location.href;
      if (navigator.share) {
          navigator.share({
              title: '복근곰마켓',
              text: 'Hello World',
              url: currentUrl
          });
      }else{
          alert("공유하기가 지원되지 않는 환경 입니다.")
      }
    }

    const imgerror = (e) => {
      e.target.src = basicprofile;
    }

  return (
    <Cont>
      <ProfileCont>
        <div>
          <Follower className='follower' onClick={(e) => {
            navigate('./follower/', { state: profileData})}}>
            {profileData.followerCount}
          </Follower>
          <FollowTxt>followers</FollowTxt>
        </div>
        <Profileimg src={profileData.image} onError={imgerror} />
        <div>
          <Following onClick={(e) => {navigate('./following/', { state: profileData})}}>
            {profileData.followingCount}
          </Following>
          <FollowTxt>followings</FollowTxt>
        </div>
      </ProfileCont>
        <Username>{profileData.username}</Username>
        <Accountname>@{profileData.accountname}</Accountname>
        <Intro>{profileData.intro}</Intro>
        <ButtonCont>
          <Chatimg src={chat} alt="채팅하기" onClick={()=> {chatorshare("chat")}}/>
          {isMyProfile ? 
          <>
          <Button className='medium' onClick={()=> navigate("./edit/")}>프로필 수정</Button>
          <Button className='medium' onClick={()=> navigate("../../post/upload/product")}>상품등록</Button>
          </> :
          <Button className='medium' active={!checkFollowing} value={checkFollowing} onClick={followingchange}>{checkFollowing ? "팔로우 취소" : "팔로우"}</Button>}
          <Shareimg src={share} alt="공유하기" onClick={()=> {handleShare()}}/>
        </ButtonCont>
    </Cont>
  )
}

