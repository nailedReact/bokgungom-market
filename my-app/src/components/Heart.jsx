import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';

export default function Heart() {
      useEffect(() => {
        const getPostid = async () => {
          const res = await axios.post("https://mandarin.api.weniv.co.kr/post/6396af4b17ae666581c3267e/unheart", {
            headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTY5MWQwMTdhZTY2NjU4MWMzMjM1YyIsImV4cCI6MTY3NTk5NjE5MywiaWF0IjoxNjcwODEyMTkzfQ.yX_F68SQOJkak0ud8BUTI3OUHriaIlPqEqDUiWBcf6I"
            }
        });
            console.log(res);
        }
        getPostid();
    }, [])

  return (
    <div></div>
  )
}
