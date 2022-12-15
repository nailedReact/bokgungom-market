import React from 'react'
import styled from 'styled-components';
import ProfileCard from './ProfileCard';
import SaledProductCard from './SaledProductCard';
import PostList from '../../../components/PostList'

export default function Profile() {
    const Cont = styled.div`
          display:flex;
          flex-direction: column;
          gap: 6px;
          background: #DBDBDB;
    `;
  
    const PostCont =styled.div`
      background: white;
      border: 0.5px solid #DBDBDB;
    `;
  
    return (
    <Cont>
        <ProfileCard />
        <SaledProductCard />
        <PostCont>
          <PostList/>
        </PostCont>
        
    </Cont>
  )
}
