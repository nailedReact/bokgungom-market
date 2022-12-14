import React from "react";
import { OptionLayout } from "./optionModal.style";

export default function OptionModal(props) {
    return (
        <OptionLayout>
            <h2 className={"ir"}>모달창</h2>
            <ul className={"modal-items"}>{props.children}</ul>
        </OptionLayout>
    );
}
