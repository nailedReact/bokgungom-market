import { useLocation } from "react-router";

export default function ChattingRoom() {
    const location = useLocation();
    console.log(location.state.chatData);

    return (
        <div>ChattingRoom</div>
    )
}
