import { createContext } from "react";
import axios from "axios";

let data;
let UserContext = createContext({
    "user": {
        "_id": "",
        "username": "",
        "accountname": "",
        "image": "",
        "isfollow": false,
        "following": [],
        "follower": [],
        "followerCount": 0,
        "followingCount": 0
    }
});

try {
    (async() => { 
        const res = await axios.get('https://mandarin.api.weniv.co.kr/user/myinfo', 
        {
            headers: {
                "Authorization": localStorage.getItem("Authorization")
            }
        })
        console.log(res.data)
        
    })()
} catch (error) {
    console.log(error)
}
export default UserContext;
