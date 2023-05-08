import { useNavigate } from 'react-router-dom';
import Button from "../../../components/button/Button";
import symbolimg from "../../../assets/symbol-logo-gray.png";
import {
    Symbolimg,
    SearchText,
    Cont
} from "./homeFeed.style";

const FeedNoFollower = () => {
    const navigate = useNavigate();

    const movesearch = () => {
        navigate("/search");
    }

    return(
    <Cont>
        <Symbolimg src={symbolimg} alt="" />
        <SearchText>유저를 검색해 팔로우를 해보세요!</SearchText>
        <Button className="large" active="true" onClick={movesearch}>검색하기</Button>
    </Cont>    
)}

export default FeedNoFollower;