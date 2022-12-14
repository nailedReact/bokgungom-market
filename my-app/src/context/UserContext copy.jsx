import { createContext, useState } from "react";
import axios from "axios"

let data;

try {
        (async() => { 
            const res = await axios.get('https://mandarin.api.weniv.co.kr/user/myinfo', 
            {
                headers: {
                    "Authorization": localStorage.getItem("Authorization")
                }
            })
            // console.log(res.data.user)
            data = res.data;
        })()
} catch (error) {
    console.log(error)
}
console.log(data)
const UserContext = createContext({username: "sasha", "id": "sas1107"});

export default UserContext;