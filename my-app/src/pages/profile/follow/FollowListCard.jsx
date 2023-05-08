import React, { useState } from 'react'
import styled from 'styled-components';
import Button from '../../../components/button/Button';
import axios from 'axios';
import { useNavigate } from 'react-router';
import basicprofile from "../../../assets/basic-profile-img.png";
import { BASE_URL } from '../../config';

const Followingimg = styled.img`
        height: 50px;
        width: 50px;
        border-radius: 50%;
        border: 1px solid #C4C4C4;
        flex-shrink: 0;
        cursor: pointer;
    `;

    const Username = styled.h3`
        font-weight: 500;
        font-size: 14px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: calc(100vw - 60px - 45px - 10px - 50px - 10px - 10px);
        @media screen and (min-width: 768px){
            width: calc(100vw - 240px - 200px - 50px - 80px);
        }
    `;

    const Intro = styled.p`
        font-size: 12px;
        color: #767676;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: calc(100vw - 60px - 45px - 10px - 50px - 10px - 10px);
        @media screen and (min-width: 768px){
            width: calc(100vw - 240px - 200px - 50px - 80px);
        }
    `;

    const TxtCont = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 6px;
        cursor: pointer;
    `;

    const Cont = styled.li`
        display: flex;
        padding: 10px 30px;
        justify-content: space-between;
        align-items: center;
        @media screen and (min-width: 768px){
            margin-left: 240px;
            padding: 10px 100px;
        }
        
    `;

const ContLeft  = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`

//취소버튼을 누르면 팔로우 취소가 된 데이터가 넘어가야합니다! - 구현예정
export default function FollowListCard({data}) {
    const baseUrl = BASE_URL;
    const navigate = useNavigate();
    const [checkFollowing, setCheckFollowing] = useState(data.isfollow)

    // 팔로우한 사람의 프로필 클릭 시 그 사람의 프로필로 이동
    function handleClickProfile(){
        navigate("../../../account/profile/" + data.accountname);
    }

      const followingchange = async(e) => {
        if(e.target.value === "true"){
            setCheckFollowing(false)
            // eslint-disable-next-line
            const unfollow = await axios.delete(
                `${baseUrl}/profile/${data.accountname}/unfollow`,{
                headers: {
                    // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTY5MWQwMTdhZTY2NjU4MWMzMjM1YyIsImV4cCI6MTY3NTk5NjE5MywiaWF0IjoxNjcwODEyMTkzfQ.yX_F68SQOJkak0ud8BUTI3OUHriaIlPqEqDUiWBcf6I"
                  Authorization: localStorage.getItem("Authorization")
                    }
                });
        }else{
            setCheckFollowing(true);
            // eslint-disable-next-line
            const follow = await axios.post(
                `https://mandarin.api.weniv.co.kr/profile/${data.accountname}/follow`,{},{
                headers: {
                  Authorization: localStorage.getItem("Authorization")
                    }
                });
        }
      }

      const imgerror = (e) => {
        e.target.src = basicprofile;
    }

  return (
    <Cont>
        <ContLeft>
            <Followingimg src={data.image} onError={imgerror} onClick={handleClickProfile}/>
            <TxtCont onClick={handleClickProfile}>
                <Username>{data.username}</Username>
                <Intro>{data.intro}</Intro>
            </TxtCont>
        </ContLeft>
        <Button style={{float:"right"}} className="small" active={!checkFollowing} value={checkFollowing} onClick={followingchange}>{checkFollowing ? "취소" : "팔로우"} </Button>
    </Cont>
  )
}
