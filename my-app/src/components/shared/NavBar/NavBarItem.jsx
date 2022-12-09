import { StyledLink } from "./navBarItem.style";

export default function NavBarItem({ linkSrc, iconSrc, navTxt, currentPath }) {
    if (currentPath.includes(linkSrc)) {
        return (
            <StyledLink
                to={linkSrc}
                icon={iconSrc}
                className={"activated"}
            >
            {navTxt}
            </StyledLink>
        );
    } else {
        return (
            <StyledLink
                to={linkSrc}
                icon={iconSrc}
            >
            {navTxt}
            </StyledLink>
        );
    }
}
