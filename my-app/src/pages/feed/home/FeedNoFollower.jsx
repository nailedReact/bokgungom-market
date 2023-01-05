import styled from 'styled-components';
import symbolimg from "../../../assets/symbol-logo-gray.png";
import Button from "../../../components/button/Button";
import { useNavigate } from 'react-router-dom';

const FeedNoFollower = () => {

    const Symbolimg = styled.img`
        width: 120px;
        height: 120px;
    `;

    const SearchText = styled.p`
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        color: #767676;
    `;

    const Cont = styled.div`
        display: flex;
        height: calc(100vh - 60px);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        @media screen and (max-width: 768px){
            height: calc(100vh - 60px - 55px);
        }
    `;

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