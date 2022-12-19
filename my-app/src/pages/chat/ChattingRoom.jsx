import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import data from "./chat/chatdata.json";
import ChatModal from "./chat/ChatModal/ChatModal";
import TopBar from "../../components/TopBar";
import Outgoing from "./chat/Outgoing/Outgoing";
import Incoming from "./chat/Incoming/Incoming";
import ChatInput from "./chat/ChatInput/ChatInput";
import { formattedTimeFunc } from "./dateFormat";

export default function ChattingRoom() {
    const location = useLocation();
    const [eachChat, setEachChat] = useState();
    const [title, setTitle] = useState();
    const id = location.pathname.split("/")[2];
    const [modalVisible, setModalVisible] = useState(false);

    const filtered = useRef();

    useEffect(() => {
        filtered.current = data.chat.filter((e) => e.id === id)[0];
        console.log(filtered.current);
        setTitle(filtered.current.caller.username);
        const chatItems = filtered.current.chatData.map((e) => {
            const formattedTime = formattedTimeFunc(e.date);

            if (e.isIncoming) {
                return (
                    <Incoming
                        key={e.id}
                        imgSrc={filtered.current.caller.image}
                        type={e.typeOfContent}
                        content={e.content}
                        time={formattedTime}
                    />
                );
            } else {
                return (
                    <Outgoing
                        key={e.id}
                        type={e.typeOfContent}
                        content={e.content}
                        time={formattedTime}
                    />
                );
            }
        });
        setEachChat(chatItems);
    }, [id]);

    const onConfirm = () => {
        setModalVisible(false);
    };

    const onClickModal = () => {
        setModalVisible(true);
    };

    return (
        <>
            {modalVisible && (
                <ChatModal onConfirm={onConfirm}>
                    <li>
                        <Link to={"/chat"}>채팅방 나가기</Link>
                    </li>
                </ChatModal>
            )}
            <TopBar type={"A1"} title={title} onClickModal={onClickModal} />
            <h1 className={"ir"}>{title}님과의 채팅방 입니다.</h1>
            <ul>{eachChat}</ul>
            <ChatInput />
        </>
    );
}
