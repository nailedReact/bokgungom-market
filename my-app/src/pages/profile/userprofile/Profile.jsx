import { createContext, useContext, useState } from 'react'
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import ProfileCard from './ProfileCard';
import SaledProductCard from './SaledProductCard';
import PostList from '../../../components/PostList'



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

export const UserNameContext = createContext();

export default function Profile() {
  return (
    <UserNameContext.Provider value={{username : useParams().username}}>
    <Cont>
        <ProfileCard/>
        <SaledProductCard/>
        <PostCont>
          <PostList/>
        </PostCont>
    </Cont>
  </UserNameContext.Provider>
)
}
