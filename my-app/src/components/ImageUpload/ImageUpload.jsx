import React from "react";
import { ImgUploadIcon } from "./imageUpload.style";

export default function ImageUpload({ btnStyle, onChangeByUpper }) {
    const handleFileChange = (event) => {
        const selectedFile = [...event.target.files];
        console.log(selectedFile);
        const fileReader = new FileReader();

        onChangeByUpper(selectedFile, fileReader);
    };

    return (
        <ImgUploadIcon className={btnStyle}>
            <span className="ir">이미지 첨부</span>
            <input
                className="ir"
                type="file"
                accept="image/jpg, image/gif, image/png, image/jpeg, image/bmp, image/tif, image/heic"
                onChange={handleFileChange}
            />
        </ImgUploadIcon>
    );
}
