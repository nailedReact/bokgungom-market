/* eslint-disable array-callback-return */
import React from 'react'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import { UserNameContext } from "../pages/profile/userprofile/Profile";

export default function PostList() {
  const [resMsg, setResMsg] = useState([]);
  const [postArr, setPostArr] = useState([]);
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
            return [...postArr, <PostCard key={item.id} data={item}/>];
          })
      })
    }
  }, [resMsg])
  
  return (
    <>
      {postArr}
    </>
  )
}
