import React from 'react'
import { useNavigate } from 'react-router'
import Button from '../../../components/Button';
import TopBar from '../../../components/TopBar';

export default function NoFollowerFollowing(props) {
    const navigate = useNavigate();
    
    return (
        
        <div>
            <TopBar type="AO"/>
            {props.page === "follower" ? <>팔로우하는 유저가 없습니다</>: <>팔로잉하는 유저가 없습니다.</>}
            <Button className='large' onClick={()=> navigate("../../../search")}>탐색하기</Button>
        </div>
    )
}
