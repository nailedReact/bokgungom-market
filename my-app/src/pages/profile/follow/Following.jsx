/* eslint-disable array-callback-return */
import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import FollowListCard from './FollowListCard'
import { useParams } from 'react-router';
import NoFollowerFollowing from './NoFollowerFollowing';
import NavBar from '../../../components/NavBar/NavBar';
import TopBar from '../../../components/TopBar';

export default function Following() {   
    const [resMsg, setResMsg] = useState([]);
    const [followingArr, setFollowingArr] = useState([]);;
    const accoutName = useParams().username;

    useEffect(() => {
        const getFollowinglist = async () => {
          const URL = "https://mandarin.api.weniv.co.kr/profile/" + accoutName + "/following/?limit=infinity"
          const res = await axios.get(URL, {
            headers: {
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
    <>
      <TopBar type="A0" title="Followings"/>
      <ul>
        {followingArr}
      </ul>
      <NavBar />
    </>
}
