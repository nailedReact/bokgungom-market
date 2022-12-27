import axios from "axios"
import { useState, useRef } from "react"

export default function useAuth() {
    const [data, setData] = useState();
    const userIdRef = useRef();
    try {
        if (!data){
            (async() => { 
                const res = await axios.get('https://mandarin.api.weniv.co.kr/user/myinfo', 
                {
                    headers: {
                        "Authorization": localStorage.getItem("Authorization")
                    }
                })
                setData(res.data.user)
                userIdRef.current = res.data.user._id;
            })()
        }
    } catch (error) {
        console.log(error)
    }
    return {data, userIdRef};
}