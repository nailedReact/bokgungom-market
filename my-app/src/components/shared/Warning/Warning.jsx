import React from "react";

export default function Warning({ message, visible }) {
    if (visible) {
        return <strong>*{message}</strong>;
    }
}
