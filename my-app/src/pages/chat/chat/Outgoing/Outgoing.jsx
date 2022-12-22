import React from "react";
import { OutgoingCont } from "./outgoing.style";
import { TimeCont } from "../sharedStyle";

export default function Outgoing({type, content, time}) {
    let msgContent;

    if (type === "text") {
        msgContent = <p className={"txtMsg"}>{content}</p>;
    } else {
        msgContent = <img className={"imgMsg"} src={content} alt="사진" />;
    }

    return (
        <OutgoingCont>
            {msgContent}
            <TimeCont className="time" dateTime={time}>
                {time}
            </TimeCont>
        </OutgoingCont>
    );
}
