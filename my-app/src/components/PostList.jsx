/* eslint-disable array-callback-return */
import React from 'react'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import { UserNameContext } from "../pages/profile/userprofile/Profile";

export default function PostList() {
  const [resMsg, setResMsg] = useState([]);
  const [postArr, setPostArr] = useState([]);
  const { username } = useContext(UserNameContext)
  useEffect(() => {
    const getMsg = async () => {
      const URL = "https://mandarin.api.weniv.co.kr/post/" + username + "/userpost"
      const res = await axios.get(URL, {
        headers: {
          Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTY5MWQwMTdhZTY2NjU4MWMzMjM1YyIsImV4cCI6MTY3NTk5NjE5MywiaWF0IjoxNjcwODEyMTkzfQ.yX_F68SQOJkak0ud8BUTI3OUHriaIlPqEqDUiWBcf6I"
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
