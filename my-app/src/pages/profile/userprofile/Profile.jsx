import { createContext, useState, useEffect } from 'react'
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import ProfileCard from './ProfileCard';
import SaledProductCard from './SaledProductCard';
import PostList from '../../../components/PostList'
import useAuth from "../../../hook/useAuth";
import Loading from '../../error/Loading';
import TopBar from '../../../components/TopBar';
import NavBar from '../../../components/NavBar/NavBar';

const Cont = styled.div`
  display:flex;
  flex-direction: column;
  gap: 6px;
  background: #DBDBDB;
  @media screen and (min-width: 768px){
    margin-left: 240px;
  }
  @media screen and (max-width: 768px){
    margin-bottom: 60px;
  }
`;


// const PostCont =styled.div`
//   background: white;
//   border: 0.5px solid #DBDBDB;
// `;

export const UserNameContext = createContext();

export default function Profile() {
  const [accoutName, setAccountName] = useState();
  const [isMyProfile, setIsMyProfile] = useState();
  // const [checkProduct, setCheckProduct] = useState(false);
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
    return <Loading />
  }
  else {
    return (
      <UserNameContext.Provider value={{username : accountNameInURL, isMyProfile: isMyProfile}}>
            <TopBar type="A1"/>
        <Cont>
            <ProfileCard/>
            <SaledProductCard/>
            <PostList isProfilePage={true}/> 
        </Cont>
            <NavBar/>
    </UserNameContext.Provider>
  )
  }
}
