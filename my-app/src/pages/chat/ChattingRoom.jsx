import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import data from "./chat/chatdata.json";

export default function ChattingRoom() {
    const location = useLocation();
    const [eachChat, setEachChat] = useState();
    const id = location.pathname.split("/")[2];

    useEffect(() => {
        setEachChat(data.chat.filter(e => e.id === id)[0]);
    }, []);
    
    console.log(eachChat);
    return (
        <div>ChattingRoom</div>
    )
}
