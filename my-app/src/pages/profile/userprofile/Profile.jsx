import React from 'react'
import styled from 'styled-components';
import ProfileCard from './ProfileCard';
import SaledProductCard from './SaledProductCard';

export default function Profile() {
    const Cont = styled.div`
          display:flex;
          flex-direction: column;
          gap: 6px;
          background: #DBDBDB;
    `;
  
    return (
    <Cont>
        <ProfileCard />
        <SaledProductCard />
    </Cont>
  )
}
