import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import TopBar from "../../../components/topbar/TopBar";
import ProfileSetInpsTempLogIn from "../../../components/profileSetInps/ProfileSetInpsLogIn";
import styled from "styled-components";
import NavBar from "../../../components/navBar/NavBar";
import Toast from "../../../components/toast/Toast";
import { BASE_URL } from "../../../config";

const ProfileEditCont = styled.div`
    padding: 40px;
    @media screen and (min-width: 768px){
        margin-left: 240px;
    }
`
export default function EditProfile() {
    const baseUrl = BASE_URL;
    const [isBtnVisible, setIsBtnVisible] = useState(false);
    const [prevData, setPrevData] = useState({});
    const navigate = useNavigate();
    const token = localStorage.getItem("Authorization");

    const onInvalidFunc = () => {
        setIsBtnVisible(true);
    };

    const onValidFunc = () => {
        setIsBtnVisible(false);
    };
    const toastRef = useRef(null);

    const onSubmitFunc = async (submitted) => {
        let edited;

        if (submitted.current.image) {
            edited = {
                accountname: submitted.current.accountname,
                image: submitted.current.image,
                intro: submitted.current.intro,
                username: submitted.current.username,
            };
        } else {
            edited = {
                accountname: submitted.current.accountname,
                intro: submitted.current.intro,
                username: submitted.current.username,
            };
        }

        try {
            const res = await axios.put(
                `${baseUrl}/user`,
                {
                    user: edited,
                },
                {
                    headers: {
                        Authorization: token,
                        "Content-type": "application/json",
                    },
                }
            );

            handleShowToast();
            setTimeout(function(){
                navigate("/account/profile/" + res.data.user.accountname);
            }, 1500)

        } catch (err) {
            console.log(err);
        }
    };

    const getPrevData = useCallback(async () => {
        try {
            const res = await axios.get(
                `${baseUrl}/user/myinfo`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            setPrevData({
                username: res.data.user.username,
                accountname: res.data.user.accountname,
                intro: res.data.user.intro,
                image: res.data.user.image
            });
        } catch (err) {
            console.log(err);
        }
    }, [baseUrl, token]);

    useEffect(() => {
        getPrevData();
    }, [getPrevData]);

    const handleShowToast = () => {
        toastRef.current.style.transform = "scale(1)";
        setTimeout(function(){
            toastRef.current.style.transform = "scale(0)";
        }, 1500)
        return;
    }

    return (
        <>
            <TopBar
                type={"A4"}
                right4Ctrl={{ form: "logined", isDisabled: isBtnVisible }}
            />
            <Toast ref={toastRef} msg="프로필 정보가 수정되었습니다!" />
            <ProfileEditCont>
            <ProfileSetInpsTempLogIn
                formId={"logined"}
                prev={prevData}
                onInValidByUpper={onInvalidFunc}
                onValidByUpper={onValidFunc}
                onSubmitByUpper={onSubmitFunc}
            />
            </ProfileEditCont>
            <NavBar/>
        </>
    );
}