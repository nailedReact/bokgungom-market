import React from "react";
import { useLocation } from "react-router";
import NavBarItem from "./NavBarItem";
import { NavBarCont } from "./navBar.style";
import iconHome from "../../assets/icon/icon-home.png";
import iconHomeFill from "../../assets/icon/icon-home-fill.png";
import iconMessageCircle from "../../assets/icon/icon-message-circle.png";
import iconMessageCircleFill from "../../assets/icon/icon-message-circle-fill.png";
import iconEdit from "../../assets/icon/icon-edit.png";
import iconUser from "../../assets/icon/icon-user.png";
import iconUserFill from "../../assets/icon/icon-user-fill.png";

// 홈과 프로필의 링크 주소를 잘 모르겠어서 일단 만들어 놓은 페이지에 연결시켰습니다. 링크 연결 정확하지 않습니다!
export default function NavBar() {
    // basic은 기본 아이콘, filled는 색깔이 칠해진 아이콘 입니다.
    const homeIcons = { basic: iconHome, filled: iconHomeFill };
    const chatIcons = {
        basic: iconMessageCircle,
        filled: iconMessageCircleFill,
    };
    const uploadIcon = { basic: iconEdit };
    const userIcons = { basic: iconUser, filled: iconUserFill };

    // currentPath는 현재 브라우저 페이지를 나타냅니다.
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <NavBarCont>
            <li>
                <NavBarItem
                    linkSrc={"/"}
                    currentPath={currentPath}
                    iconSrc={homeIcons}
                    navTxt={"홈"}
                />
            </li>
            <li>
                <NavBarItem
                    linkSrc={"/chat"}
                    currentPath={currentPath}
                    iconSrc={chatIcons}
                    navTxt={"채팅"}
                />
            </li>
            <li>
                <NavBarItem
                    linkSrc={"/post/upload"}
                    currentPath={currentPath}
                    iconSrc={uploadIcon}
                    navTxt={"게시물 작성"}
                />
            </li>
            <li>
                <NavBarItem
                    linkSrc={"/account/profile"}
                    currentPath={currentPath}
                    iconSrc={userIcons}
                    navTxt={"프로필"}
                />
            </li>
        </NavBarCont>
    );
}
