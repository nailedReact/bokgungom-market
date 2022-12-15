import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FollowListCard from '../profile/FollowListCard';
import TopBar from '../../components/TopBar';

export default function Search() {
    const [search, setSearch] = useState("");
    const [resMsg, setResMsg] = useState([]);
    const [resultArr, setResultArr] = useState([]);

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
        // if (e.code === "Enter"){
        //     getMsg()
        // }
    }
    
    const getMsg = async () => {
      setResultArr([]);
      const res = await axios.get(`https://mandarin.api.weniv.co.kr/user/searchuser/?keyword=${search}`, {
        headers: {
          Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTY5MWQwMTdhZTY2NjU4MWMzMjM1YyIsImV4cCI6MTY3NTk5NjE5MywiaWF0IjoxNjcwODEyMTkzfQ.yX_F68SQOJkak0ud8BUTI3OUHriaIlPqEqDUiWBcf6I"
        }
    });
    setResMsg(res.data);
    }
    
    
    useEffect(() => {
        if (resMsg.length !== 0){
          resMsg.forEach((item) => {
            setResultArr((resultArr) => {
                return [...resultArr, <FollowListCard data={item} call="search"/>];
              })
          })
        }
      }, [resMsg])

  return (
    <>
        <TopBar onChangeByUpper={onChangeSearch} onClickGetMsg={getMsg} type="A2"/>
        <div>
            {resultArr}
        </div>
    </>
    
  )
}
