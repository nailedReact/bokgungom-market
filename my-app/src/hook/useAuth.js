import axios from "axios"
import { useState } from "react"

export default function useAuth() {
    const [data, setData] = useState();
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
            })()
        }
    } catch (error) {
        console.log(error)
    }
    return data;
}