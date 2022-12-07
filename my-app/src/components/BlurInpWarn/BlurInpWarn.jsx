import React, { useState } from "react";
import InfoInput from "../shared/InfoInput/InfoInput";
import Warning from "../shared/Warning/Warning";

export default function BlurInpWarn({
    type,
    placeHolder,
    pattern,
    label,
    required,
    minlength,
    maxlength,
    message,
}) {
    const [visible, setVisibility] = useState(false);

    const handleOnBlur = (e) => {
        e.target.style.backgroundColor = "initial";
        if (e.target.validity.patternMismatch) {
            if (visible === true) {
                return;
            } else {
                setVisibility(true);
                console.log("유효하지 않아서 리렌더링 함");
            }
        } else {
            if (visible === false) {
                return;
            } else {
                setVisibility(false);
                console.log("유효해서 리렌더링 함");
            }
        }
    };

    return (
        <>
            <InfoInput
                type={type}
                placeHolder={placeHolder}
                pattern={pattern}
                label={label}
                required={required}
                minlength={minlength}
                maxlength={maxlength}
                onBlur={handleOnBlur}
            />
            <Warning message={message} visible={visible} />
        </>
    );
}
