import { StyledLink, Icon } from "./navBarItem.style";

export default function NavBarItem({ linkSrc, iconSrc, navTxt, currentPath }) {
    console.log(iconSrc, "iconSrc")
    return (
        <StyledLink
            to={linkSrc}
            icon={iconSrc}
            className={currentPath.includes(linkSrc) ? "activated" : ""}
        >
            <Icon icon={iconSrc} className={currentPath.includes(linkSrc) ? "activated" : ""}/>
            {navTxt}
        </StyledLink>
    );
}
