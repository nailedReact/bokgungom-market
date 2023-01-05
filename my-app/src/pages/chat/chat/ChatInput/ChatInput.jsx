import React, { useState, useRef } from "react";
import ImageUpload from "../../../../components/imageUpload/ImageUpload";
import { CommentInpCont } from "../../../../components/commentInp/commentInp.style";

export default function ChatInput() {
    const [isBtnVisible, setIsBtnVisible] = useState(false);

    const submitMsg = useRef({});
    const inpRef = useRef();

    const onImgChangeHanlde = (files, fileReader) => {
        if (files.length > 0) {
            fileReader.readAsDataURL(files[0]);

            fileReader.onload = function () {
                setIsBtnVisible(true);
                submitMsg.current.img = fileReader.result;
            };
        }
    };

    const onChangeHandle = (e) => {
        if (e.target.value.length > 0) {
            setIsBtnVisible(true);
        } else {
            setIsBtnVisible(false);
        }
    };

    const onSubmitHandle = (e) => {
        e.preventDefault();
        const date = new Date();
        submitMsg.current.date = date.toJSON();
        if (inpRef.current.value.length > 0) {
            submitMsg.current.txt = inpRef.current.value;
            inpRef.current.value = "";
        } else {
            console.log(submitMsg.current);
        }
        submitMsg.current = {};
    };

    return (
        <CommentInpCont onSubmit={onSubmitHandle} isBtnActivated={isBtnVisible}>
            <ImageUpload
                btnStyle={"gray small"}
                onChangeByUpper={onImgChangeHanlde}
            />
            <input
                ref={inpRef}
                type={"text"}
                placeholder={"메시지 입력하기..."}
                onChange={onChangeHandle}
            />
            <button
                type={"submit"}
                disabled={isBtnVisible ? false : true}
            >
                전송
            </button>
        </CommentInpCont>
    );
}
