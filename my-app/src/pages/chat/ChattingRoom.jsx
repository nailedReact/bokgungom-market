import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import data from "./chat/chatdata.json";
import OptionModal from "../../components/optionModal/OptionModal";
import TopBar from "../../components/topbar/TopBar";
import Outgoing from "./chat/Outgoing/Outgoing";
import Incoming from "./chat/Incoming/Incoming";
import ChatInput from "./chat/ChatInput/ChatInput";
import { formattedTimeFunc } from "./dateFormat";

const ChatContBack = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: ${(props) => `calc(${props.windowHeight}px - 110.5px)`};
    background-color: #f2f2f2;
`;

const ResizedChatContBack = (props) => {
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    const handleResize = () => {
        setWindowHeight(window.innerHeight);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }   
    }, []);

    return <ChatContBack windowHeight={windowHeight}>{props.children}</ChatContBack>
};

const ChatCont = styled.ul`
    overflow-y: scroll;
    padding: 20px 16px 16px 16px;
`;

export default function ChattingRoom() {
    const location = useLocation();
    const [eachChat, setEachChat] = useState();
    const [title, setTitle] = useState();
    const id = location.pathname.split("/")[2];
    const [modalVisible, setModalVisible] = useState(false);

    const filtered = useRef();
    const scrollRef = useRef();

    useEffect(() => {
        filtered.current = data.chat.filter((e) => e.id === id)[0];
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

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [eachChat])

    const onConfirm = () => {
        setModalVisible(false);
    };

    const onClickModal = () => {
        setModalVisible(true);
    };

    return (
        <>
            {modalVisible && (
                <OptionModal onConfirm={onConfirm}>
                    <li>
                        <Link to={"/chat"}>채팅방 나가기</Link>
                    </li>
                </OptionModal>
            )}
            <TopBar type={"A1"} title={title} onClickModal={onClickModal} />
            <h1 className={"ir"}>{title}님과의 채팅방 입니다.</h1>
            <ResizedChatContBack>
                <ChatCont ref={scrollRef}>
                    {eachChat}
                </ChatCont>
            </ResizedChatContBack>
            <ChatInput />
        </>
    );
}
