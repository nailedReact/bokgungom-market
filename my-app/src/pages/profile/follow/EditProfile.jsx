import React, { useState } from "react";
import axios from "axios";
import TopBar from "../../../components/TopBar";
import ProfileSetInpsTemp from "../../../components/ProfileSetInpsTemp/ProfileSetInpsTemp";

export default function EditProfile() {
    const token = localStorage.getItem("token");

    const [isBtnVisible, setIsBtnVisible] = useState(true);

    // 제출 버튼을 비활성화 하는 함수: 하위 컴포넌트에 내려줄 거임
    const onInvalidFunc = () => {
        setIsBtnVisible(true);
    };

    // 제출 버튼을 활성화 하는 함수: 하위 컴포넌트에 내려줄 거임
    const onValidFunc = () => {
        setIsBtnVisible(false);
    };

    // 폼이 제출될 때 실행되는 함수
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
                    "user":edited
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-type": "application/json",
                    },
                }
            );

            console.log(loginRes.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <TopBar
                type={"A4"}
                right4Ctrl={{ form: "login", isDisabled: { isBtnVisible } }}
            />
            <ProfileSetInpsTemp
                formId={"login"}
                onInValidByUpper={onInvalidFunc}
                onValidByUpper={onValidFunc}
                onSubmitByUpper={onSubmitFunc}
            />
        </>
    );
}
