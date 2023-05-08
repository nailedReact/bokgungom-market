import axios from "axios"
import { useState } from "react";
import { BASE_URL } from '../../config';

export default function useAuth() {
    const baseUrl = BASE_URL;
    const [data, setData] = useState();
    try {
        if (!data){
            (async() => { 
                const res = await axios.get(`${baseUrl}/user/myinfo`, 
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