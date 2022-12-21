import React from "react";
import { useLocation } from "react-router";
import NavBarItem from "./NavBarItem";
import { NavBarCont, NavBarUl } from "./navBar.style";
import iconHome from "../../assets/icon/icon-home.png";
import iconHomeFill from "../../assets/icon/icon-home-fill.png";
import iconMessageCircle from "../../assets/icon/icon-message-circle.png";
import iconMessageCircleFill from "../../assets/icon/icon-message-circle-fill.png";
import iconEdit from "../../assets/icon/icon-edit.png";
import iconEditFill from "../../assets/icon/icon-edit-fill.png";
import iconUser from "../../assets/icon/icon-user.png";
import iconUserFill from "../../assets/icon/icon-user-fill.png";
import useAuth from "../../hook/useAuth"
import Loading from "../../pages/error/Loading"
import iconUserLogOut from "../../assets/icon/icon-user-logout.png"
import iconBox from "../../assets/icon/icon-box.png";
import iconBoxFill from "../../assets/icon/icon-box-fill.png";

// 홈과 프로필의 링크 주소를 잘 모르겠어서 일단 만들어 놓은 페이지에 연결시켰습니다. 링크 연결 정확하지 않습니다!
export default function NavBar() {
    const data = useAuth();
    // basic은 기본 아이콘, filled는 색깔이 칠해진 아이콘 입니다.
    const homeIcons = { basic: iconHome, filled: iconHomeFill };
    const chatIcons = {
        basic: iconMessageCircle,
        filled: iconMessageCircleFill,
    };
    const uploadIcon = { basic: iconEdit, filled: iconEditFill };
    const userIcons = { basic: iconUser, filled: iconUserFill };
    const userLogoutIcons = { basic: iconUserLogOut, filled: iconUserLogOut };
    const uploadProductIcon = { basic: iconBox, filled: iconBoxFill };
    // currentPath는 현재 브라우저 페이지를 나타냅니다.
    const location = useLocation();
    const currentPath = location.pathname;
if (data) {
    return (
        <NavBarCont>
            <NavBarUl>
            <li>
                <NavBarItem
                    linkSrc={"/post"}
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
            <li className="desktop">
                <NavBarItem
                    linkSrc={"/post/upload/product"}
                    currentPath={currentPath}
                    iconSrc={uploadProductIcon}
                    navTxt={"상품 업로드"}
                />
            </li>
            <li>
                <NavBarItem
                    linkSrc={"/account/profile/" + data.accountname}
                    currentPath={currentPath}
                    iconSrc={userIcons}
                    navTxt={"내 프로필"}
                />
            </li>
            <li className="desktop">
                <NavBarItem
                    linkSrc={""}
                    currentPath={currentPath}
                    iconSrc={userLogoutIcons}
                    navTxt={"로그아웃"}
                />
            </li>
            </NavBarUl>
        </NavBarCont>
    );
    }
    else {
        return (
            <Loading />
        )
    }
}
