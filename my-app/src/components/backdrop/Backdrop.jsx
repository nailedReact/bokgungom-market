import React from "react";
import { BackdropCont } from "./backdrop.style";

export default function Backdrop(props) {
    return <BackdropCont onClick={props.onConfirm} />;
};