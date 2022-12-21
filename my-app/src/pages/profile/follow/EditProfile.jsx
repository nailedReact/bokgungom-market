import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import TopBar from "../../../components/TopBar";
import ProfileSetInpsTempLogIn from "../../../components/ProfileSetInpsTemp/ProfileSetInpsTempLogIn";
import styled from "styled-components";



export default function EditProfile() {
    const [isBtnVisible, setIsBtnVisible] = useState(false);
    const [prevData, setPrevData] = useState({});

    const token = localStorage.getItem("Authorization");

    const onInvalidFunc = () => {
        setIsBtnVisible(true);
    };

    const onValidFunc = () => {
        setIsBtnVisible(false);
    };

    const onSubmitFunc = async (submitted) => {
        // 원본 데이터를 훼손하지 않기 위해 스프레드 기법 + 새로운 변수를 만듦, 기존 데이터 건들지 않는 방향으로
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
            const loginRes = await axios.put(
                "https://mandarin.api.weniv.co.kr/user",
                {
                    user: edited,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-type": "application/json",
                    },
                }
            );

            console.log(loginRes.data);
        } catch (err) {
            console.log(err);
        }
    };

    // 페이지 로드시 기존 정보를 가져오기 위함
    const getPrevData = useCallback(async () => {
        try {
            const res = await axios.get(
                "https://mandarin.api.weniv.co.kr/user/myinfo",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // 기존 정보를 가져온 뒤 prevData에 값을 넣음
            setPrevData({
                username: res.data.user.username,
                accountname: res.data.user.accountname,
                intro: res.data.user.intro,
                image: res.data.user.image
            });
        } catch (err) {
            console.log(err);
        }
    }, [token]);

    useEffect(() => {
        getPrevData();
    }, [getPrevData]);

    return (
        <>
            <TopBar
                type={"A4"}
                right4Ctrl={{ form: "logined", isDisabled: { isBtnVisible } }}
            />
            <ProfileSetInpsTempLogIn
                formId={"logined"}
                prev={prevData}
                onInValidByUpper={onInvalidFunc}
                onValidByUpper={onValidFunc}
                onSubmitByUpper={onSubmitFunc}
            />
        </>
    );
}