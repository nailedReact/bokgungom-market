
import { useEffect } from "react"
import TopBar from "../../components/TopBar";
import axios from "axios";
import FeedFollower from "../feed/FeedFollower";
import FeedNoFollower from "../feed/FeedNoFollower";
import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import {
  FeedCont
} from "./homeFeed.style"

/* eslint-disable */


export default function HomeFeed() {
    const [resMsg, setResMsg] = useState([]);
    const [postArr, setPostArr] = useState([]);
    
    useEffect(() => {
        const getMsg = async () => {
          const res = await axios.get("https://mandarin.api.weniv.co.kr/post/feed", {
            headers: {
              Authorization : localStorage.getItem("Authorization")
            // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTY5MWQwMTdhZTY2NjU4MWMzMjM1YyIsImV4cCI6MTY3NTk5NjE5MywiaWF0IjoxNjcwODEyMTkzfQ.yX_F68SQOJkak0ud8BUTI3OUHriaIlPqEqDUiWBcf6I"
            }
        });
          setResMsg(res.data.posts);
        }
        getMsg();
    }, [])
    
    useEffect(() => {
        if (resMsg.length !== 0){
          resMsg.forEach((item) => {
              setPostArr((postArr) => {
                  return [...postArr, <FeedFollower key={item.id} data={item} postDetailSrc={`/post/${item.id}`} />];
                })
          })
        }
      }, [resMsg])
    
    return (
      <>
        <TopBar type="B3" title="감귤마켓 피드"/>
        <FeedCont>
        { resMsg.length === 0 ? 
        <FeedNoFollower /> : postArr
        }
        </FeedCont>
        <NavBar/>
      </>
        
    )
}
