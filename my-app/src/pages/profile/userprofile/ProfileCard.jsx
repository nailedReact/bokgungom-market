import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/button/Button'
import { UserNameContext } from "./Profile"
import chat from '../../../assets/icon/icon-message-circle.png';
import share from '../../../assets/icon/icon-share.png'
import basicprofile from "../../../assets/basic-profile-img.png"
import {
  Cont,
  ProfileCont,
  Profileimg,
  Username,
  Accountname,
  Intro,
  Follower,
  Following,
  FollowTxt,
  ButtonCont,
  Chatimg,
  Shareimg
} from "./profileCard.style";
import { BASE_URL } from '../../../config';

export default function ProfileCard() {
  const baseUrl = BASE_URL;
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
          const URL = `${baseUrl}/profile/` + username;
          const res = await axios.get(URL, {
            headers: {
              Authorization : localStorage.getItem("Authorization")
            }
        });
        console.log(res.data);
        setProfileData(res.data.profile);
        }
        getprofile();
    }, [temp, checkFollowing, username, baseUrl])

    const chatorshare = (data) => {
      if(data === "chat") navigate(`/chat`)
      else if(data === "share") navigate('/share')
    }

    const followingchange = async(e) => {
      setTemp(temp => temp + 1)
      if(e.target.value === "true"){
          const unfollow = await axios.delete(
              `${baseUrl}/profile/${profileData.accountname}/unfollow`,{
              headers: {
                  Authorization: localStorage.getItem("Authorization")
              }
              });
          console.log(unfollow.data);
          setCheckFollowing(false)
          
      } else{
        const follow = await axios.post(
          `${baseUrl}/profile/${profileData.accountname}/follow`,{},{
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
              text: '득근득근 복근곰마켓',
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
        <Profileimg src={profileData.image} onError={imgerror} alt={`${profileData.username}의 프로필 이미지`}/>
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

