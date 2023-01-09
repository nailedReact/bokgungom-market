import React, { useState } from "react";
import { useLocation } from "react-router";
import ConfirmModal from "../confirmModal/ConfirmModal";
import NavBarItem from "./NavBarItem";
import { NavBarCont, NavBarUl } from "./navBar.style";
import useAuth from "../../hook/useAuth";
import Loading from "../../pages/errorLoading/Loading";
import { useNavigate } from "react-router";

export default function NavBar() {
    const [modalVisible, setModalVisible] = useState(false);

    const data = useAuth();
    // basic은 기본 아이콘, filled는 색깔이 칠해진 아이콘 입니다.
    const homeIcons = { basic: "icon-home", filled: "icon-home-fill" };
    const chatIcons = {
        basic: "icon-message-circle",
        filled: "icon-message-circle-fill",
    };
    const uploadIcon = { basic: "icon-edit", filled: "icon-edit-fill" };
    const userIcons = { basic: "icon-user", filled: "icon-user-fill" };
    const userLogoutIcons = { basic: "icon-logout", filled: "icon-logout" };
    const uploadProductIcon = { basic: "icon-box", filled: "icon-box-fill" };
    // currentPath는 현재 브라우저 페이지를 나타냅니다.
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();

    const showConfirmModal = () => {
        setModalVisible(true);
    }

    const handleLogout = () => {
        if (localStorage.getItem("Authorization")) {
            localStorage.removeItem("Authorization");
            navigate("../../../");
            console.log("로그아웃");
        } else {
            alert("로그아웃된 상태입니다!");
        }
        setModalVisible(false);
    };
    if (data) {
        return (
            <>
                {modalVisible && (
                    <ConfirmModal 
                        confirmMsg={"로그아웃하시겠어요?"}
                        onCancle={() => setModalVisible(false)}
                        onConfirm={() => setModalVisible(false)}
                        buttonRight={
                            <button type="button" onClick={handleLogout}>
                                로그아웃
                            </button>
                        }
                    />
                )}
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
                        <li className="desktop" onClick={showConfirmModal}>
                            <NavBarItem
                                linkSrc={""}
                                currentPath={currentPath}
                                iconSrc={userLogoutIcons}
                                navTxt={"로그아웃"}
                            />
                        </li>
                    </NavBarUl>
                </NavBarCont>
            </>
        );
    } else {
        return <Loading />;
    }
}
