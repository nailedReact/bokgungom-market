import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "../../components/Backdrop/Backdrop";
import { OptionLayout } from "./optionModal.style";

export default function OptionModal(props) {
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop onConfirm={props.onConfirm} />,
                document.getElementById("backdrop-root")
            )}
            {ReactDOM.createPortal(
                <OptionLayout>
                    <h2 className={"ir"}>모달창</h2>
                    <ul className={"modal-items"}>{props.children}</ul>
                </OptionLayout>,
                document.getElementById("modal-root")
            )}
        </>
    );
}
