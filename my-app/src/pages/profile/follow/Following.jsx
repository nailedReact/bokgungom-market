/* eslint-disable array-callback-return */
import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import FollowListCard from './FollowListCard'

export default function Following() {   
    const [resMsg, setResMsg] = useState([]);
    const [followingArr, setFollowingArr] = useState([]);;

    //accountname을 props로 받아와서 url에 넣어야합니다, 개인 토큰도 넣어야합니다.

    useEffect(() => {
        const getFollowinglist = async () => {
          const res = await axios.get(`https://mandarin.api.weniv.co.kr/profile/hyejee/following`, {
            headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTY5MWQwMTdhZTY2NjU4MWMzMjM1YyIsImV4cCI6MTY3NTk5NjE5MywiaWF0IjoxNjcwODEyMTkzfQ.yX_F68SQOJkak0ud8BUTI3OUHriaIlPqEqDUiWBcf6I"
            }
        });
        setResMsg(res.data);
    }
    getFollowinglist();
}, [])
    
useEffect(() => {
    if (resMsg.length !== 0){
      resMsg.forEach((item) => {
        setFollowingArr((followingArr)=>{
            return [...followingArr, <FollowListCard key={item._id} data={item}/>]
        })    
      })
    }
  }, [resMsg])
  
    return (
        <ul>
         {followingArr}
        </ul>
  )
}
