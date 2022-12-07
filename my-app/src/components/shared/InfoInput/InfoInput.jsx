import React from "react";

export default function InputAndWarn({
    type,
    placeHolder,
    pattern,
    label,
    required,
    minlength,
    maxlength,
    onBlur,
}) {
    let inpEl = (
        <input
            type={type}
            placeholder={placeHolder}
            pattern={pattern}
            minLength={minlength}
            maxLength={maxlength}
            onBlur={onBlur}
            onFocus={(e) => {
                e.target.style.backgroundColor = "red";
            }}
        />
    );

    if (required) {
        inpEl = (
            <input
                type={type}
                placeholder={placeHolder}
                pattern={pattern}
                minLength={minlength}
                maxLength={maxlength}
                onBlur={onBlur}
                onFocus={(e) => {
                    e.target.style.backgroundColor = "red";
                }}
                required
            />
        );
    }

    return (
        <label>
            <span>{label}</span>
            {inpEl}
        </label>
    );
}
