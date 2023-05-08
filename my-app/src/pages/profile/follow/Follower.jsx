/* eslint-disable array-callback-return */
import React from 'react'
import axios from 'axios'
import { useState,  useEffect } from 'react'
import { useParams } from 'react-router';
import FollowListCard from './FollowListCard'
import NoFollowerFollowing from './NoFollowerFollowing';
import NavBar from '../../../components/navBar/NavBar';
import TopBar from '../../../components/topbar/TopBar';
import { FollowList } from "./followFollowing.style"
import useAuth from '../../../hook/useAuth';
import { BASE_URL } from '../../config';

export default function Following() {  
  const baseUrl = BASE_URL; 
    const [resMsg, setResMsg] = useState([]);
    const [followerArr, setFollowerArr] = useState([]);
    const accountName = useParams().username;
    const data = useAuth();
    const [myaccoutName, setMyaccountName] = useState();

  
    useEffect(() => {

      data && setMyaccountName(data.accountname);
      
      },[data])

    useEffect(() => {
        const getFollowinglist = async () => {
          const URL = `${baseUrl}/profile/` + accountName + "/follower/?limit=infinity"
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
          if(item.accountname === myaccoutName){
            return [...followerArr]
          }else{
            return [...followerArr, <FollowListCard key={item._id} data={item}/>]
          }           
        })    
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
