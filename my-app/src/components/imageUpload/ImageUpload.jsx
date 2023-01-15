import React from "react";
import { ImgUploadIcon } from "./imageUpload.style";

const ImageUpload = React.forwardRef((props, ref) => {
    const handleFileChange = (event) => {
        const selectedFile = [...event.target.files];
        props.onChangeByUpper(selectedFile);
    };

    return (
        <ImgUploadIcon className={`${props.btnStyle} ${props.isKeyboardUp ? "keyboardUp" : ''}`}>
            <span className="ir">이미지 첨부</span>
            <input
                multiple={props.isMultiple || false}
                className="ir"
                ref={ref}
                type="file"
                accept="image/jpg, image/gif, image/png, image/jpeg, image/bmp, image/tif, image/heic"
                onChange={handleFileChange}
            />
        </ImgUploadIcon>
    );
});

export default ImageUpload;
