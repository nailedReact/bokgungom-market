/* eslint-disable array-callback-return */
import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import FollowListCard from './FollowListCard'
import { useParams } from 'react-router';
import NoFollowerFollowing from './NoFollowerFollowing';
import NavBar from '../../../components/navBar/NavBar';
import TopBar from '../../../components/topbar/TopBar';
import { FollowList } from "./followFollowing.style"
import useAuth from '../../../hook/useAuth';

export default function Following() {   
    const [resMsg, setResMsg] = useState([]);
    const [followingArr, setFollowingArr] = useState([]);;
    const accountName = useParams().username;
    const data = useAuth();
    const [myaccoutName, setMyaccountName] = useState();

  
    useEffect(() => {
      data && setMyaccountName(data.accountname);
      },[data])


    useEffect(() => {
        const getFollowinglist = async () => {
          const URL = "https://mandarin.api.weniv.co.kr/profile/" + accountName + "/following/?limit=infinity"
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
        setFollowingArr((followingArr)=>{
          if(item.accountname === myaccoutName){
            return [...followingArr]
          }else{
            return [...followingArr, <FollowListCard key={item._id} data={item}/>]
          }   
        })    
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resMsg])
  

  return (followingArr.length === 0) ?
    <NoFollowerFollowing page="following"/> :
    <>
      <TopBar type="A0" title="Followings"/>
      <FollowList>
        {followingArr}
      </FollowList>
      <NavBar />
    </>
}
