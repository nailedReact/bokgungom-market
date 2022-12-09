import React, { useLayoutEffect, useState, useRef } from "react";
import { useEffect } from "react";
import { StyledLink } from "./navBarItem.style";

export default function NavBarItem({ linkSrc, iconSrc, navTxt, currentPath }) {
    const [isActivated, setIsActivated] = useState(false);

    useEffect(() => {
        console.log(currentPath === linkSrc);
        if (currentPath === linkSrc) {
            setIsActivated(true);
        }
    }, []);

    return (
        <StyledLink
            to={linkSrc}
            icon={iconSrc}
            className={isActivated ? "activated" : ""}
        >
            {navTxt}
        </StyledLink>
    );
}
