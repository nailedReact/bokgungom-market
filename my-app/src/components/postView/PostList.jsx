/* eslint-disable react/jsx-pascal-case */
/* eslint-disable array-callback-return */
import { useState, useEffect, useContext, useCallback } from 'react';
import { useInView } from "react-intersection-observer"
import axios from 'axios';
import PostCard from './PostCard';
import PostAlbum from "./PostAlbum"
import { UserNameContext } from "../../pages/profile/userprofile/Profile";
import IconNopost from "../../assets/symbol-logo-gray.png"
import SVGIcon from '../icon/SVGIcon';
import {
  PostViewCont,
  BtnOption,
  AlbumCont,
  PostCont,
  NoPost_Txt,
  NoPost_img,
  NoPost_Cont
} from "./postList.style";

export default function PostList({isProfilePage}) {
  const [resMsg, setResMsg] = useState([]);
  const [postArrList, setPostArrList] = useState([]);
  const [postArrAlbum, setPostArrAlbum] = useState([]);
  const [view, setView] = useState("list");
  const { username, isMyProfile } = useContext(UserNameContext);
  const [postcount, setPostcount] = useState(5);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();

  const getItems = useCallback(async () => {
    setLoading(true)
      const URL = "https://mandarin.api.weniv.co.kr/post/" + username + `/userpost/?limit=${postcount}`
      const res = await axios.get(URL, {
        headers: {
          Authorization : localStorage.getItem("Authorization")
        }});
    
      setResMsg(res.data.post);
      setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postcount, username])

  const deleteHandle = (deleteTarget) => {
    setResMsg((prev) => (
      prev.filter(e => e.id !== deleteTarget)
    ));
  };

  useEffect(() => {
    getItems()
  }, [getItems, username, view]);



  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading && count) {
      setPostcount(prevState => prevState + 6)
      setCount(0)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView,loading]);

  useEffect(() => {
    if (resMsg.length !== 0){
      const postLists = resMsg.map((item, index) => {
        if (isMyProfile) {
          if (index%4 === 0 && count === 0){
            setCount(1)
            return <div ref={ref} key={item.id}><PostCard  data={item} myProfile={true} postDetailSrc={`/post/${item.id}`} deleteByUpper={deleteHandle} /></div >;
          } else {
            return <PostCard key={item.id} data={item} myProfile={true} postDetailSrc={`/post/${item.id}`} deleteByUpper={deleteHandle} />;
          }
        } else {
          if (index%4 === 0 && count === 0){
            setCount(1)
            return <div ref={ref} key={item.id}> <PostCard data={item} myProfile={false} postDetailSrc={`/post/${item.id}`} deleteByUpper={deleteHandle} /></div >;
          } else {
            return <PostCard key={item.id} data={item} myProfile={false} postDetailSrc={`/post/${item.id}`} deleteByUpper={deleteHandle} />;
          }
        }
      });

      const postPhotos = resMsg.map((item, index) => {
        if (isMyProfile) {
          if(index%5 === 0 && count === 0){
            setCount(1)
          return <div ref={ref} key={item.id}><PostAlbum  data={item} myProfile={true} postDetailSrc={`/post/${item.id}`} /></div>;
          } else {
            return <PostAlbum key={item.id} data={item} myProfile={true} postDetailSrc={`/post/${item.id}`} />;
          }
        } else {
          if (index%5 === 0 && count === 0){
            setCount(1)
            return <div ref={ref} key={item.id}><PostAlbum data={item} myProfile={false} postDetailSrc={`/post/${item.id}`} /></div>;
          } else{
              return <PostAlbum key={item.id} data={item} myProfile={false} postDetailSrc={`/post/${item.id}`} />;
          }
        }
      });
      setPostArrList(postLists);
      setPostArrAlbum(postPhotos);
    };
    // eslint-disable-next-line
  }, [resMsg]);

  const handleChangeView = (e) => {
    const type = view === "list" ? "album" : "list";
    setView(type);
  };

  return (
    <>
    { resMsg.length === 0 ? <NoPost_Cont><NoPost_img src={IconNopost} alt="아이콘" /> <NoPost_Txt>게시물이 없습니다</NoPost_Txt></NoPost_Cont> : <PostCont>
      {isProfilePage ?
        <PostViewCont>
          <BtnOption className='list' onClick={handleChangeView} view={view}>
            <SVGIcon id="icon-post-list" alt="게시글 리스트형 보기 버튼" width="26" height="26"/>
            <p>게시글 리스트형 보기 버튼</p>
          </BtnOption>
          
          <BtnOption className='album' onClick={handleChangeView} view={view}>
            <SVGIcon id="icon-post-album" alt="게시글 앨범형 보기 버튼" width="26" height="26"/>
            <p>게시글 앨범형 보기 버튼</p>
          </BtnOption>
        </PostViewCont>
      : <></>}
      {view === "list" ? 
      postArrList
      : <AlbumCont> {postArrAlbum}</AlbumCont>}
    </PostCont>}
    </>
  );
};