import React from "react";
import { IncomingCont } from "./incoming.style";
import { TimeCont } from "../sharedStyle";

export default function Incoming({ imgSrc, type, content, time }) {
    let msgContent;

    if (type === "text") {
        msgContent = <p className={"txtMsg"}>{content}</p>;
    } else {
        msgContent = <img className={"imgMsg"} src={content} alt="사진" />;
    }

    // const formattedTime = `${time[0]}:${time[1]}`;

    return (
        <IncomingCont>
            <img
                className={"profileImg"}
                src={imgSrc}
                alt={"발신자 프로필 사진"}
            />
            {msgContent}
            <TimeCont dateTime={time}>
                {time}
            </TimeCont>
        </IncomingCont>
    );
}
