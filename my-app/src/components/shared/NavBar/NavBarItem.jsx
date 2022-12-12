import { StyledLink } from "./navBarItem.style";

export default function NavBarItem({ linkSrc, iconSrc, navTxt, currentPath }) {
    return (
        <StyledLink
            to={linkSrc}
            icon={iconSrc}
            className={currentPath.includes(linkSrc) ? "activated" : ""}
        >
            {navTxt}
        </StyledLink>
    );
}
