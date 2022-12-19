/* eslint-disable array-callback-return */
import React from 'react'
import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import { UserNameContext } from "../pages/profile/userprofile/Profile";

import IconListOn from "../assets/icon/icon-post-list-on.png"
import IconListOff from "../assets/icon/icon-post-list-off.png"
import IconAlbumOn from "../assets/icon/icon-post-album-on.png"
import IconAlbumOff from "../assets/icon/icon-post-album-off.png"

const PostViewCont = styled.div`
    display: flex;
    justify-content: right;
    gap: 6px;
    border: 0.5px solid #DBDBDB;
    padding: 9px 16px;
`
const BtnOption = styled.button`
    width: 26px;
    height: 26px;
    background-color: inherit;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    &.list {
      background-image: ${(props) => (props.view === 'list'? `url(${IconListOn})` : `url(${IconListOff})`)};
    }
    &.album {
      background-image: ${(props) => (props.view === 'list'? `url(${IconAlbumOff})` : `url(${IconAlbumOn})`)};
    }
    
`
export default function PostList({isProfilePage}) {
  const [resMsg, setResMsg] = useState([]);
  const [postArr, setPostArr] = useState([]);
  const [view, setView] = useState("list");
  const { username, isMyProfile } = useContext(UserNameContext);

  useEffect(() => {
    const getMsg = async () => {
      const URL = "https://mandarin.api.weniv.co.kr/post/" + username + "/userpost"
      const res = await axios.get(URL, {
        headers: {
          Authorization : localStorage.getItem("Authorization")
        }
    });
      setResMsg(res.data.post);
    }
    getMsg();
}, [])

  useEffect(() => {
    if (resMsg.length !== 0){
      resMsg.forEach((item) => {
          setPostArr((postArr) => {
            // console.log(postArr);
            if (isMyProfile){
              return [...postArr, <PostCard key={item.id} data={item} myProfile={true}/>];
            }
            else {
              return [...postArr, <PostCard key={item.id} data={item} myProfile={false}/>];
            }
          })
      })
    }
  }, [resMsg])
  const handleChangeView = (e) => {
    const type = e.target.className.split(' ').pop();
    setView(type)
  }
  return (
    <>
      {isProfilePage ?
        <PostViewCont>
          <BtnOption className='list' onClick={handleChangeView} view={view}></BtnOption>
          <BtnOption className='album' onClick={handleChangeView} view={view}></BtnOption>
        </PostViewCont>
      : <></>}
      {postArr}
    </>
  )
}
