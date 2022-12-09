import React from "react";
import { ImgUploadIcon } from "./imageUpload.style";

export default function ImageUpload({ btnStyle, handleFileChangeByUpper }) {
    const handleFileChange = (event) => {
        const selectedFile = [...event.target.files];
        const fileReader = new FileReader();

        fileReader.readAsDataURL(selectedFile[0]);

        fileReader.onload = function () {
            console.log(fileReader.result);

            // handleFileChangeByUpper();
            // 파일이 업로드 되는 이벤트가 발생시, ImageUpload 컴포넌트와 ImageUpload 컴포넌트를 사용한 상위 컴포넌트를 연결하기 위한 함수입니다.
            // 상위 컴포넌트에서 함수 정의 후 ImageUpload에 handleFileChangeByUpper로 함수를 전달합니다.
        };
    };

    return (
        <ImgUploadIcon className={btnStyle}>
            <span className="ir">이미지 첨부</span>
            <input
                className="ir"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />
        </ImgUploadIcon>
    );
}
