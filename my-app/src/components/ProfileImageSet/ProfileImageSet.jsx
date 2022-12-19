import React, { useRef } from "react";
import ImageUpload from "../ImageUpload/ImageUpload.jsx";
import { ProfileImgSetCont } from "./profileImageSet.style.js";

export default function ProfileImageSet({ onChangeByUpper, initial }) {
    const image = useRef(null);

    const handleFiles = (files, fileReader) => {
        fileReader.readAsDataURL(files[0]);

        fileReader.onload = function () {
            image.current.src = fileReader.result;
            onChangeByUpper(files[0]);
        };
    };
    return (
        <ProfileImgSetCont>
            <span className={"ir"}>프로필 사진 이미지 설정</span>
            <img
                className={"profileImg"}
                src={initial || require(`../../assets/basic-profile-img.png`)}
                alt=""
                ref={image}
            />
            <ImageUpload
                className={"fileUpload"}
                btnStyle={"orange small"}
                onChangeByUpper={handleFiles}
            />
        </ProfileImgSetCont>
    );
}
