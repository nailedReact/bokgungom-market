import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import ProfileImageSet from "../profileImageSet/ProfileImageSet";
import UserInput from "../userinput/UserInput";
import Inp from "../userinput/Inp";
import Warning from "../userinput/Warning";
import ProfileSetCont from "./profileSetInps.style";
import { BASE_URL } from "../../config";

export default function ProfileSetTemp({
    formId,
    prev,
    onInValidByUpper,
    onValidByUpper,
    onSubmitByUpper,
}) {
    const [initial, setInitial] = useState(null);
    const baseUrl = BASE_URL;
    const accountName = useRef(null);
    const accountId = useRef(null);
    const about = useRef(null);
    const nameAlert = useRef(null);
    const idAlert = useRef(null);
    const submitData = useRef({});

    useEffect(() => {
        if (Object.keys(prev).length > 0) {
            accountName.current.value = prev.username;
            accountId.current.value = prev.accountname;
            about.current.value = prev.intro;
            setInitial(prev.image);
        }
    }, [prev]);

    const onNameBlurHandle = (e) => {
        if (
            e.target.validity.patternMismatch ||
            e.target.value.trim().length === 0
        ) {
            nameAlert.current.style.display = "block";

            onInValidByUpper();
        } else {
            nameAlert.current.style.display = "none";
            if (
                accountName.current.value &&
                accountId.current.value &&
                idAlert.current.style.display === "none"
            ) {
                onValidByUpper();
            }
        };
    };

    const onIdBlurHandle = async (e) => {
        if (e.target.validity.patternMismatch) {
            idAlert.current.style.display = "block";

            onInValidByUpper();
        } else if (prev && e.target.value === prev.accountname) {
            idAlert.current.style.display = "none";
            return;
        } else {
            try {
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

                    onInValidByUpper();
                } else {
                    idAlert.current.style.display = "none";

                    if (
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

    const ImgChangeHandle = async (imgdata) => {
        const formData = new FormData();
        formData.append("image", imgdata);
        submitData.current["imageBeforeSubmit"] = formData;
    };

    const onSubmitHandle = async (e) => {
        e.preventDefault();
        if (submitData.current.imageBeforeSubmit) {
            try {
                const res = await fetch(
                    `${baseUrl}/image/uploadfile`,
                    {
                        method: "POST",
                        body: submitData.current.imageBeforeSubmit,
                    }
                );
                const json = await res.json();
    
                submitData.current["image"] =
                    `${baseUrl}` + json.filename;
                submitData.current["username"] = accountName.current.value;
                submitData.current["accountname"] = accountId.current.value;
                submitData.current["intro"] = about.current.value;
                onSubmitByUpper(submitData);
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
            <ProfileImageSet initial={initial} onChangeByUpper={ImgChangeHandle} />
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
            <Warning ref={nameAlert} className={"warn"}>* 한글 또는 영어를 2~10자 이내로 입력하세요.</Warning>
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
            <Warning ref={idAlert} className={"warn"}>* 영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다.</Warning>
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