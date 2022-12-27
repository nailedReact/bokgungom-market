/* eslint-disable no-const-assign */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FollowListCard from '../profile/follow/FollowListCard';
import TopBar from '../../components/TopBar';
import NavBar from '../../components/NavBar/NavBar';

export default function Search() {
    const [resMsg, setResMsg] = useState([]);
    const [checkchange, setCheckchange] = useState("");
    
    const onChangeSearch = (e) => {
      if(e.code !== "Backspace" && e.target.value.length > 1){
      setCheckchange(e.target.value);
    }}

        useEffect(() => { if(checkchange !== ""){
          const getMsg = async () => {
            // setResultArr([]);
            const res = await axios.get(`https://mandarin.api.weniv.co.kr/user/searchuser/?keyword=${checkchange}`, {
              headers: {
                "Authorization": localStorage.getItem('Authorization')
              }
          });
          setResMsg(res.data);
          }
          getMsg();
        }
      }, [checkchange]);
  
  return (
    <>
        <TopBar onChangeByUpper={[onChangeSearch]}  type="A2"/>
        <div>
            {resMsg !== 0 ? resMsg.map(item => {
              return(
                <FollowListCard key={item.id}data={item} call="search"/>
              )
            }) : null }
        </div>
        <NavBar/>
    </>
    
  )
}
