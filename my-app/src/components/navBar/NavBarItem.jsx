import { StyledLink } from "./navBarItem.style";
import SVGIcon from "../icon/SVGIcon";

export default function NavBarItem({ linkSrc, iconSrc, navTxt, currentPath }) {
    return (
        <StyledLink
            to={linkSrc}
            icon={iconSrc}
            className={currentPath.includes(linkSrc) ? "activated" : ""}
        >
            {currentPath === linkSrc || currentPath === linkSrc + "/edit/"
            ?
                <SVGIcon id={iconSrc.filled} alt={navTxt}/>
            :
                <SVGIcon id={iconSrc.basic} alt={navTxt}/>}
            {navTxt}
        </StyledLink>
    );
};