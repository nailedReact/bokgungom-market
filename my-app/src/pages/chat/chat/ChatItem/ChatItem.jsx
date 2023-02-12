import { Link } from "react-router-dom";
import { formattedDateFunc } from "../../dateFormat";
import { ChatItemCont, ProfilePic } from "./chatItem.style";

export default function ChatItem({
    linkSrc,
    image,
    isOnline,
    username,
    lastChat,
    date,
}) {
    // const formattedDate = `${date.slice(0, 4)}.${date.slice(5, 7)}.${date.slice(8, 10)}`;

    const formattedDate =  formattedDateFunc(date);
    const chatLink = "/chat/" + linkSrc;

    // 링크 클릭시 해당 데이터를 그 페이지에 전달하도록 했습니다.
    return (
        <ChatItemCont>
            <Link className={"link"} to={chatLink}>
                <div className={isOnline ? "profileImgWrapper online" : "profileImgWrapper"}>
                    {/* 스크린 리더 사용자를 위해 온라인 오프라인 표시를 했습니다. */}
                    <span className={"ir"}>{isOnline ? "온라인" : "오프라인"}</span>
                    <ProfilePic className={"profileImg"} src={image} alt="프로필 사진" />
                </div>
                <div className={"userNameAndLastChat"}>
                    <h2 className={"userName"}>{username}</h2>
                    <p className={"lastChat"}>{lastChat}</p>
                </div>
                <time className={"date"} dateTime={formattedDate.dateTime}>{formattedDate.formatted}</time>
            </Link>
        </ChatItemCont>
    );
}
