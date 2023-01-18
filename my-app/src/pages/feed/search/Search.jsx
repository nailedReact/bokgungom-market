/* eslint-disable no-const-assign */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FollowListCard from '../../profile/follow/FollowListCard';
import TopBar from '../../../components/topbar/TopBar';
import NavBar from '../../../components/navBar/NavBar';
import useDebounce from '../../../hook/useDebounce';

export default function Search() {
    const [resMsg, setResMsg] = useState([]);
    const [checkchange, setCheckchange] = useState("");
    const [checkkey, setCheckkey] = useState("");
    const debouncedSearchText = useDebounce(checkchange, 500); 
    
    const onChangeSearch = (e) => {
      if(checkkey !== "back" && e.target.value.length > 1){
      setCheckchange(e.target.value);
    }}

    const onkeyup = (e) => {
      if(e.code === "Backspace"){
        setCheckkey("back");
      }else{
        setCheckkey(e.code)
      }
    }

        useEffect(() => {
          if(debouncedSearchText.length > 0){
            const getMsg = async () => {
              const res = await axios.get(`https://mandarin.api.weniv.co.kr/user/searchuser/?keyword=${debouncedSearchText}`, {
                headers: {
                  "Authorization": localStorage.getItem('Authorization')
                }
            });
            setResMsg(res.data);
            }
            getMsg();
          

          }}, [debouncedSearchText]);
          

  
  return (
    <>
        <TopBar onChangeByUpper={[onChangeSearch, onkeyup]}   type="A2"/>
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
