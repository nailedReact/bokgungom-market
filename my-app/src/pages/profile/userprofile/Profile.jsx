import { createContext, useState, useEffect } from 'react'
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import ProfileCard from './ProfileCard';
import SaledProductCard from './SaledProductCard';
import PostList from '../../../components/PostList'
import useAuth from "../../../hook/useAuth"


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
  const [accoutName, setAccountName] = useState();
  const [isMyProfile, setIsMyProfile] = useState();
  const accountNameInURL = useParams().username;
  console.log(accountNameInURL, "accountNameInURL")
  const data = useAuth();

  useEffect(() => {
    console.log(data);
    data && setAccountName(data.accountname);
  },[data])

  useEffect(() => {
    if (accoutName && !isMyProfile){
      if (accoutName === accountNameInURL){
        setIsMyProfile(true);
      }
      else {
        setIsMyProfile(false);
      }
    }
  }, [accoutName, accountNameInURL])
  // console.log(isMyProfile);
    
  if (!data && !isMyProfile && !accoutName){
    return <div>로딩중</div>
  }
  else {
    return (
      <UserNameContext.Provider value={{username : accountNameInURL, isMyProfile: isMyProfile}}>
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
}
