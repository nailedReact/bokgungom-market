/* eslint-disable array-callback-return */
import React from 'react'
import axios from 'axios'
import { useState,  useEffect } from 'react'
import FollowListCard from './FollowListCard'
import { useParams } from 'react-router';
import NoFollowerFollowing from './NoFollowerFollowing';
import NavBar from '../../../components/NavBar/NavBar';
import TopBar from '../../../components/TopBar';
import { FollowList } from "./followFollowing.style"

export default function Following() {   
    const [resMsg, setResMsg] = useState([]);
    const [followerArr, setFollowerArr] = useState([]);
    const accoutName = useParams().username;
  
    useEffect(() => {
        const getFollowinglist = async () => {
          const URL = "https://mandarin.api.weniv.co.kr/profile/" + accoutName + "/follower/?limit=infinity"
          const res = await axios.get(URL, {
            headers: {
            Authorization: localStorage.getItem("Authorization")
            }
        });
        setResMsg(res.data);
    }
    getFollowinglist();
    // eslint-disable-next-line
}, [])
    
useEffect(() => {
    if (resMsg.length !== 0){
      resMsg.forEach((item) => {
        setFollowerArr((followerArr)=>{
            return [...followerArr, <FollowListCard key={item._id} data={item}/>]
        })    
      })
    }
  }, [resMsg])
  
  return (followerArr.length === 0) ?
    <NoFollowerFollowing page="follower"/>:
    <>
     <TopBar type="A0" title="Followers"/>
    <FollowList>
      {followerArr}
    </FollowList>
    <NavBar />
    </>
   
}
