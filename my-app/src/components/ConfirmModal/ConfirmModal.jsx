import React from "react";
import { ConfirmlLayout } from "./confirmModal.style";

export default function ConfirmModal({ confirmMsg, onCancle, buttonRight }) {
    return (
        <ConfirmlLayout>
            <h2>{confirmMsg}</h2>
            <div className={"button-group"}>
                <button type="click" onClick={onCancle}>취소</button>
                {buttonRight}
            </div>
        </ConfirmlLayout>
    );
}
