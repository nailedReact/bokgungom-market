import React from "react";
import { CommentInpCont } from "./commentInp.style";

export default function CommentInp(props) {
    return (
        <CommentInpCont onSubmit={props.onSubmit} isBtnActivated={props.isBtnActivated}>
            {props.children}
        </CommentInpCont>
    );
};