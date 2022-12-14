import axios from "axios"
import { useState } from "react"

export default async function useAuth() {
    const [data, setData] = useState();
    const axiosData = async() => { 
                const res = await axios.get('https://mandarin.api.weniv.co.kr/user/myinfo', 
                {
                    headers: {
                        "Authorization": localStorage.getItem("Authorization")
                    }
                })
                // console.log(res.data)
                setData(res.data)
            }
        if (!data){
            await axiosData();
            return data;
        }
    
}