import React, { useState } from 'react'
import styled from 'styled-components';
import Button from '../../../components/Button';

//취소버튼을 누르면 팔로우 취소가 된 데이터가 넘어가야합니다! - 구현예정
export default function FollowListCard({data}) {
    const Followingimg = styled.img`
        height: 50px;
        width: 50px;
        border-radius: 0px;

    `;

    const Username = styled.h3`
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
    `;

    const Intro = styled.p`
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        color: #767676;  
    `;

    const TxtCont = styled.div`
        margin-left: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 6px;
        width: 240px;
    `;

    const Cont = styled.li`
        display: flex;  
        padding: 8px 16px;
    `;

    const [checkFollowing, setCheckFollowing] = useState(data.isfollow)
      const followingchange = (e) => {
        console.log(e.target.value); 
        if(e.target.value === "true"){
            setCheckFollowing(false)
        }else{
            setCheckFollowing(true)
        }
      }

  return (
    <Cont>
        <Followingimg src={data.image} alt="팔로잉한 사람 프로필사진" />
        <TxtCont>
            <Username>{data.username}</Username>
            <Intro>{data.intro}</Intro>
        </TxtCont>
        <Button className="small" active={!checkFollowing} value={checkFollowing} onClick={followingchange}>{checkFollowing ? "취소" : "팔로우"} </Button>
    </Cont>
    
  )
}
