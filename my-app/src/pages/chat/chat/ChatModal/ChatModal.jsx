import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "../../../../components/Backdrop/Backdrop";
import OptionModal from "../../../../components/OptionModal/OptionModal";

export default function ChatModal(props) {
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop onConfirm={props.onConfirm} />,
                document.getElementById("backdrop-root")
            )}
            {ReactDOM.createPortal(
                <OptionModal
                >{props.children}</OptionModal>,
                document.getElementById("modal-root")
            )}
        </>
    );
}
