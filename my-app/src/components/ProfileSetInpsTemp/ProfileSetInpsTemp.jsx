import React from "react";
import ProfileImageSet from "../shared/ProfileImageSet/ProfileImageSet";
import InfoInput from "../shared/InfoInput/InfoInput";
import BlurInpWarn from "../BlurInpWarn/BlurInpWarn";

export default function ProfileSetInpsTemp({ formId }) {
    return (
        <form id={formId}>
            <ProfileImageSet />
            <BlurInpWarn
                type={"text"}
                label={"사용자 이름"}
                placeHolder={"2~10자 이내여야 합니다."}
                minlength={"2"}
                maxlength={"10"}
                pattern={"[a-zA-Zㄱ-힣 ]{2,10}"}
                required={true}
                message={"경고"}
            />
            <BlurInpWarn
                type={"text"}
                label={"계정 ID"}
                placeHolder={"영문, 숫자, 특수문자(.),(_)만 사용 가능합니다."}
                pattern={"[a-zA-Z0-9._]+"}
                required={true}
                message={"영문, 숫자, 밑줄 및 마침표만 사용할 수 있습니다."}
            />
            <InfoInput
                type={"text"}
                label={"소개"}
                placeHolder={"자신과 판매할 상품에 대해 소개해 주세요!"}
                onBlur={(e) => (e.target.style.backgroundColor = "initial")}
            />
        </form>
    );
}
