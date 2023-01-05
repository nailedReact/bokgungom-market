import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "../backdrop/Backdrop";
import { ConfirmlLayout } from "./confirmModal.style";

export default function ConfirmModal({ confirmMsg, onConfirm, onCancle, buttonRight }) {
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop onConfirm={onConfirm} />,
                document.getElementById("backdrop-root")
            )}
            {ReactDOM.createPortal(
                <ConfirmlLayout>
                    <h2>{confirmMsg}</h2>
                    <div className={"button-group"}>
                        <button type="click" onClick={onCancle}>
                            취소
                        </button>
                        {buttonRight}
                    </div>
                </ConfirmlLayout>,
                document.getElementById("modal-root")
            )}
        </>
    );
}
