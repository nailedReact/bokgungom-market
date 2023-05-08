import React, { useRef } from "react";
import axios from "axios";
import ProfileImageSet from "../profileImageSet/ProfileImageSet";
import UserInput from "../userinput/UserInput";
import Inp from "../userinput/Inp";
import Warning from "../userinput/Warning";
import ProfileSetCont from "./profileSetInps.style";
import BASE_URL from "../../config";

export default function ProfileSetInpsTemp({
    formId,
    onInValidByUpper,
    onValidByUpper,
    onSubmitByUpper,
}) {
    const baseUrl = BASE_URL;
    const accountName = useRef(null);
    const accountId = useRef(null);
    const about = useRef(null);
    const nameAlert = useRef(null);
    const idAlert = useRef(null);
    const submitData = useRef({});

    // 이름 인풋창에서 포커스 아웃시 동작하는 함수
    const onNameBlurHandle = (e) => {
        if (
            e.target.validity.patternMismatch ||
            e.target.value.trim().length === 0
        ) {
            // 이름 패턴이 유효하지 않을 경우
            nameAlert.current.style.display = "block";

            onInValidByUpper(); // 제출 버튼 비활성화
        } else {
            // 이름 패턴이 유효할 경우
            nameAlert.current.style.display = "none";

            if (
                // 모든 인풋창에 값이 있고 아이디 경고창이 없을 때(아이디가 유효할 때)
                accountName.current.value &&
                accountId.current.value &&
                idAlert.current.style.display === "none"
            ) {
                onValidByUpper(); // 제출 버튼 활성화
            }
        }
    };

    // 아이디 인풋창에서 포커스 아웃시 동작하는 함수
    const onIdBlurHandle = async (e) => {
        if (e.target.validity.patternMismatch) {
            // 아이디 패턴이 유효하지 않을 경우
            idAlert.current.style.display = "block";

            onInValidByUpper(); // 제출 버튼 비활성화
        } else {
            // 아이디 패턴이 유효할 경우
            try {
                // 아이디 중복 검증
                const res = await axios.post(
                    `${baseUrl}/user/accountnamevalid`,
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
                    idAlert.current.textContent = ("*" + res.data.message);
                    idAlert.current.style.display = "block";

                    onInValidByUpper(); // 제출 버튼 비활성화
                } else {
                    // 중복 계정이 아닐 경우
                    idAlert.current.style.display = "none";

                    if (
                        // 모든 인풋에 값이 있고 이름 경고창이 없는 경우(이름이 유효한 경우) 제출 버튼 활성화
                        accountName.current.value &&
                        accountId.current.value &&
                        nameAlert.current.style.display === "none"
                    ) {
                        onValidByUpper();
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
    };

    // 이미지 파일 변경시 동작하는 함수
    const ImgChangeHandle = async (imgdata) => {
        const formData = new FormData();
        formData.append("image", imgdata);
        submitData.current["imageBeforeSubmit"] = formData;
    };

    // 폼 제출시 동작하는 함수
    const onSubmitHandle = async (e) => {
        e.preventDefault();

        if (submitData.current.imageBeforeSubmit) {
            try {
                const res = await fetch(
                    "/image/uploadfile",
                    {
                        method: "POST",
                        body: submitData.current.imageBeforeSubmit,
                    }
                );
                const json = await res.json();
    
                submitData.current["image"] =
                    `${baseUrl}/` + json.filename;
                submitData.current["username"] = accountName.current.value;
                submitData.current["accountname"] = accountId.current.value;
                submitData.current["intro"] = about.current.value;
                onSubmitByUpper(submitData);
                console.log("회원가입 성공 - 1");
            } catch (err) {
                console.log(err);
            }
        } else {
            submitData.current["username"] = accountName.current.value;
            submitData.current["accountname"] = accountId.current.value;
            submitData.current["intro"] = about.current.value;
            onSubmitByUpper(submitData);
        };
    };

    return (
        <ProfileSetCont id={formId} onSubmit={onSubmitHandle}>
            <ProfileImageSet onChangeByUpper={ImgChangeHandle} />
            <UserInput inputId={"userName"} label={"사용자 이름"}>
                <Inp
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
            <Warning ref={nameAlert}>* 한글 또는 영어를 2~10자 이내로 입력하세요.</Warning>
            <UserInput inputId={"accountID"} label={"계정 ID"}>
                <Inp
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
            <Warning ref={idAlert}>* 영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.</Warning>
            <UserInput inputId={"about"} label={"소개"}>
                <Inp
                    className={"inp"}
                    type={"text"}
                    id={"about"}
                    ref={about}
                    placeholder={"자신과 판매할 상품에 대해 소개해 주세요!"}
                />
            </UserInput>
        </ProfileSetCont>
    );
};