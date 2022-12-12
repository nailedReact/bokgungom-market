import React from "react";
import { WarningItem } from "./warning.style";

export default function Warning({ message, visible }) {
    if (visible) {
        return <WarningItem>*{message}</WarningItem>;
    }
}
