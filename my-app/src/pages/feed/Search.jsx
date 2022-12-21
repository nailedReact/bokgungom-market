/* eslint-disable no-const-assign */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FollowListCard from '../profile/follow/FollowListCard';
import TopBar from '../../components/TopBar';
import symbolimg from "../../assets/symbol-logo-gray.png";
import styled from 'styled-components';
import NavBar from '../../components/NavBar/NavBar';


const Symbolimg = styled.img`
  width: 120px;
  height: 120px;
  margin-top: 225px;
`;

const SearchText = styled.p`
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 14px;
color: #767676;
margin: 25px 0px;
`;

const Cont = styled.div`
  text-align: center;
`;

export default function Search() {
    const [search, setSearch] = useState("");
    const [resMsg, setResMsg] = useState([]);
    const [resultArr, setResultArr] = useState([]);
    const [checkkeyup, setCheckkeyup] = useState("");
    const [checkchange, setCheckchange] = useState("");
    const [count, setCount] = useState(0);
    
    const onChangeSearch = (e) => {
      if(e.code !== "Backspace" && e.target.value.length > 1){
      setCheckchange(e.target.value);
      
    }}

        useEffect(() => { if(checkchange !== ""){
          const getMsg = async () => {
            setResultArr([]);
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
        {/* onClickGetMsg={getMsg} */}
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
