import React from 'react';
import styled from 'styled-components';
import symbolimg from "../../assets/symbol-logo-gray.png";
import Button from "../../components/Button";
import { useNavigate } from 'react-router-dom';

const FeedNoFollower = () => {

    const Symbolimg = styled.img`
        width: 120px;
        height: 120px;
        margin-top: 225px;
    `;

    const SearchText = styled.p`
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 14px;
        color: #767676;
        margin: 25px 0px;
    `;

    const Cont = styled.div`
        text-align: center;
        height: 100%;
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