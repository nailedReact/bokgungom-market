import React, { useState, useRef } from "react";
import axios from "axios";
import ProfileImageSet from "../shared/ProfileImageSet/ProfileImageSet";
import UserInput from "../userinput/UserInput";
// Inp에 ref를 처리하려면 forwardRef를 사용해야 해서 일단 사용하지 않고 코드를 짰습니다.
// import Inp from "../../components/userinput/Inp";
import ProfileSetCont from "./profileSetINpsTemp.style";
import Warning from "../shared/Warning/Warning";

export default function ProfileSetInpsTemp({
    formId,
    onInValidByUpper,
    onValidByUpper,
    onSubmitByUpper
}) {
    // id 경고창을 관리하는 state, 경고창 메시지(txt)와 경고창이 보이는지 여부(isVisible)
    const [idWarn, setIdWarn] = useState({
        txt: "",
        isVisible: false,
    });

    // name 경고창을 관리하는 state, 경고창 메시지(txt)와 경고창이 보이는지 여부(isVisible)
    const [nameWarn, setNameWarn] = useState({
        txt: "",
        isVisible: false,
    });

    // useRef
    const accountName = useRef(null);
    const accountId = useRef(null);
    const about = useRef(null);
    const submitData = useRef({});

    // 이름 인풋창에서 포커스 아웃시 동작하는 함수
    const onNameBlurHandle = (e) => {
        if (e.target.validity.patternMismatch || e.target.value.trim().length === 0) { // 이름 패턴이 유효하지 않을 경우
            setNameWarn((prevState) => {
                return {
                    ...prevState,
                    txt: "한글 또는 영어를 2~10자 이내로 입력하세요.",
                    isVisible: true, // 경고창 활성화
                };
            });

            onInValidByUpper(); // 제출 버튼 비활성화
        } else { // 이름 패턴이 유효할 경우
            setNameWarn((prevState) => {
                return {
                    ...prevState,
                    isVisible: false, // 경고창 비활성화
                };
            });

            if ( // 모든 인풋창에 값이 있고 아이디 경고창이 없을 때(아이디가 유효할 때)
                accountName.current.value &&
                accountId.current.value &&
                !idWarn.isVisible
            ) {
                onValidByUpper(); // 제출 버튼 활성화
            }
        }
    };

    // 아이디 인풋창에서 포커스 아웃시 동작하는 함수
    const onIdBlurHandle = async (e) => {
        if (e.target.validity.patternMismatch) { // 아이디 패턴이 유효하지 않을 경우
            setIdWarn((prevState) => {
                return {
                    ...prevState,
                    txt: "영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.",
                    isVisible: true, // 경고창 활성화
                };
            });

            onInValidByUpper(); // 제출 버튼 비활성화
        } else { // 아이디 패턴이 유효할 경우
            try { // 아이디 중복 검증
                const res = await axios.post(
                    "https://mandarin.api.weniv.co.kr/user/accountnamevalid",
                    {
                        user: {
                            accountname: accountId.current.value,
                        },
                    },
                    {
                        headers: {
                            "Content-type": "application/json",
                        },
                    }
                );

                if (res.data.message === "이미 가입된 계정ID 입니다.") {
                    setIdWarn((prevState) => {
                        return {
                            ...prevState,
                            txt: res.data.message,
                            isVisible: true,
                        };
                    }); // 중복 계정일 경우 경고창 활성화

                    onInValidByUpper(); // 제출 버튼 비활성화
                } else { // 중복 계정이 아닐 경우
                    setIdWarn((prevState) => {
                        return {
                            ...prevState,
                            isVisible: false, // 경고창 비활성화
                        };
                    });

                    if ( // 모든 인풋에 값이 있고 이름 경고창이 없는 경우(이름이 유효한 경우) 제출 버튼 활성화
                        accountName.current.value &&
                        accountId.current.value &&
                        !nameWarn.isVisible
                    ) {
                        onValidByUpper();
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    // 이미지 파일 변경시 동작하는 함수
    const ImgChangeHandle = async (imgdata) => {
        const formData = new FormData();
        formData.append("image", imgdata);
        try {
            const res = await fetch("https://mandarin.api.weniv.co.kr/image/uploadfile", {
                method: "POST",
                body: formData
            });
            const json = await res.json();
            submitData.current["image"] = "https://mandarin.api.weniv.co.kr/" + json.filename;
        } catch (err) {
            console.log(err);
        }
    }

    // 폼 제출시 동작하는 함수
    const onSubmitHandle = (e) => {
        e.preventDefault();
        submitData.current["username"] = accountName.current.value;
        submitData.current["accountname"] = accountId.current.value;
        submitData.current["intro"] = about.current.value;
        onSubmitByUpper(submitData);
    };

    return (
        <ProfileSetCont id={formId} onSubmit={onSubmitHandle}>
            <ProfileImageSet onChangeByUpper={ImgChangeHandle} />
            <UserInput inputId={"userName"} label={"사용자 이름"}>
                <input
                    className={"inp"}
                    onBlur={onNameBlurHandle}
                    type={"text"}
                    id={"userName"}
                    ref={accountName}
                    placeholder={"2~10자 이내여야 합니다."}
                    minLength={"2"}
                    maxLength={"10"}
                    pattern={"[a-zA-Zㄱ-힣 ]{2,10}"}
                    required
                />
            </UserInput>
            <Warning message={nameWarn.txt} visible={nameWarn.isVisible} />
            <UserInput inputId={"accountID"} label={"계정 ID"}>
                <input
                    className={"inp"}
                    onBlur={onIdBlurHandle}
                    type={"text"}
                    id={"accountID"}
                    ref={accountId}
                    placeholder={
                        "영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."
                    }
                    pattern={"[a-zA-Z0-9._]+"}
                    required
                />
            </UserInput>
            <Warning message={idWarn.txt} visible={idWarn.isVisible} />
            <UserInput inputId={"about"} label={"소개"}>
                <input
                    className={"inp"}
                    type={"text"}
                    id={"about"}
                    ref={about}
                    placeholder={"자신과 판매할 상품에 대해 소개해 주세요!"}
                />
            </UserInput>
        </ProfileSetCont>
    );
}
