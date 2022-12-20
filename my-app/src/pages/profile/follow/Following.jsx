/* eslint-disable array-callback-return */
import React from 'react'
import axios from 'axios'
import { useState, useContext, useEffect } from 'react'
import FollowListCard from './FollowListCard'
import { useParams } from 'react-router';
import NoFollowerFollowing from './NoFollowerFollowing';

export default function Following() {   
    const [resMsg, setResMsg] = useState([]);
    const [followingArr, setFollowingArr] = useState([]);;
    const accoutName = useParams().username;
    //accountname을 props로 받아와서 url에 넣어야합니다, 개인 토큰도 넣어야합니다.

    useEffect(() => {
        const getFollowinglist = async () => {
          const URL = "https://mandarin.api.weniv.co.kr/profile/" + accoutName + "/following"
          const res = await axios.get(URL, {
            headers: {
            // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTY5MWQwMTdhZTY2NjU4MWMzMjM1YyIsImV4cCI6MTY3NTk5NjE5MywiaWF0IjoxNjcwODEyMTkzfQ.yX_F68SQOJkak0ud8BUTI3OUHriaIlPqEqDUiWBcf6I"
            Authorization: localStorage.getItem("Authorization")
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
  

  return (followingArr.length === 0) ?
    <NoFollowerFollowing page="following"/> :
    <ul>
      {followingArr}
    </ul>
}
