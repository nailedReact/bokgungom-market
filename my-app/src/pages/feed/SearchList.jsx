import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FollowListCard from '../profile/FollowListCard';

export default function Search() {
    const [search, setSearch] = useState("");
    const [resMsg, setResMsg] = useState([]);
    const [resultArr, setResultArr] = useState([]);

    const onChangeSearch = (e) => {
        e.preventDefault();
        console.log("바뀜");
        setSearch(e.target.value);
    }

    const handletimeout = (e) => {
      console.log(
"들어옴"
      );
      console.log(e.target.value);
    }
    
   
        const getMsg = async () => {
          const res = await axios.get(`https://mandarin.api.weniv.co.kr/user/searchuser/?keyword=${search}`, {
            headers: {
              Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTY5MWQwMTdhZTY2NjU4MWMzMjM1YyIsImV4cCI6MTY3NTk5NjE5MywiaWF0IjoxNjcwODEyMTkzfQ.yX_F68SQOJkak0ud8BUTI3OUHriaIlPqEqDUiWBcf6I"
            }
        });
        console.log(res.data);
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

          console.log();

  return (
    <div>
        <input placeholder="검색어를 입력하세요." type="text" onChange={onChangeSearch} onKeyUp={handletimeout}></input>
        <button onClick={getMsg}></button>
        {resultArr}
    </div>
  )
}
