/* eslint-disable react/jsx-pascal-case */
/* eslint-disable array-callback-return */
import React from 'react'
import styled from 'styled-components';
import { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import PostAlbum from "./PostAlbum"
import { UserNameContext } from "../pages/profile/userprofile/Profile";
import { useInView } from "react-intersection-observer"

import IconListOn from "../assets/icon/icon-post-list-on.png"
import IconListOff from "../assets/icon/icon-post-list-off.png"
import IconAlbumOn from "../assets/icon/icon-post-album-on.png"
import IconAlbumOff from "../assets/icon/icon-post-album-off.png"
import IconNopost from "../assets/symbol-logo-gray.png"

const PostViewCont = styled.div`
    display: flex;
    justify-content: right;
    gap: 6px;
    border: 0.5px solid #DBDBDB;
    padding: 9px 16px;
`
const BtnOption = styled.button`
    width: 26px;
    height: 26px;
    background-color: inherit;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    &.list {
      background-image: ${(props) => (props.view === 'list'? `url(${IconListOn})` : `url(${IconListOff})`)};
    }
    &.album {
      background-image: ${(props) => (props.view === 'list'? `url(${IconAlbumOff})` : `url(${IconAlbumOn})`)};
    }
`

const AlbumCont = styled.div`
  display: grid; 
  /* grid-template-rows: repeat(auto-fill, minmax(144px, 1fr)); */
  /* grid-gap: 1em; */
  grid-template-columns: repeat(3, 1fr);
  /* justify-items: stretch;  */
  /* align-items: stretch; */
  position: relative;
	width: 100%;
  grid-gap: 1px;
`;

const PostCont =styled.div`
  background: white;
  border: 0.5px solid #DBDBDB;
`;

const NoPost_Txt = styled.p`
  /* font-style: normal;
  font-weight: 400;
  font-size: 20px; */
  /* color: #767676; */
  margin-top: 20px;
`
const NoPost_img = styled.img`
  width: 120px;
  height: 120px;
`

const NoPost_Cont = styled.div`
  background: #fff;
  text-align: center;
  padding-top: 50px;
`


export default function PostList({isProfilePage}) {
  const [resMsg, setResMsg] = useState([]);
  const [postArrList, setPostArrList] = useState([]);
  const [postArrAlbum, setPostArrAlbum] = useState([]);
  const [view, setView] = useState("list");
  const { username, isMyProfile } = useContext(UserNameContext);
  const [postcount, setPostcount] = useState(5);
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [ref, inView] = useInView()

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
  }, [getItems, username, view])



  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading && count) {
      setPostcount(prevState => prevState + 6)
      setCount(0)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView,loading])

  useEffect(() => {
    if (resMsg.length !== 0){
      const postLists = resMsg.map((item, index) => {
          if (isMyProfile) {
            if(index%4 === 0 && count === 0){
              setCount(1)
              return <div ref={ref} key={item.id}><PostCard  data={item} myProfile={true} postDetailSrc={`/post/${item.id}`} deleteByUpper={deleteHandle} /></div >;
            }else{
              return <PostCard key={item.id} data={item} myProfile={true} postDetailSrc={`/post/${item.id}`} deleteByUpper={deleteHandle} />;
            }
          } else {
            if(index%4 === 0 && count === 0){
              setCount(1)
              return <div ref={ref} key={item.id}> <PostCard data={item} myProfile={false} postDetailSrc={`/post/${item.id}`} deleteByUpper={deleteHandle} /></div >;
            }else{
              return <PostCard key={item.id} data={item} myProfile={false} postDetailSrc={`/post/${item.id}`} deleteByUpper={deleteHandle} />;
            }
          }})

      const postPhotos = resMsg.map((item, index) => {
        if (isMyProfile) {
          if(index%5 === 0 && count === 0){
            setCount(1)
          return <div ref={ref} key={item.id}><PostAlbum  data={item} myProfile={true} postDetailSrc={`/post/${item.id}`} /></div>;
          }else{
            return <PostAlbum key={item.id} data={item} myProfile={true} postDetailSrc={`/post/${item.id}`} />;
          }
        } else {
          if(index%5 === 0 && count === 0){
            setCount(1)
          return <div ref={ref} key={item.id}><PostAlbum data={item} myProfile={false} postDetailSrc={`/post/${item.id}`} /></div>;
          }else{
            return <PostAlbum key={item.id} data={item} myProfile={false} postDetailSrc={`/post/${item.id}`} />;
          }
        }
      });
      setPostArrList(postLists);
      setPostArrAlbum(postPhotos);
    }
    // eslint-disable-next-line
  }, [resMsg]);

  const handleChangeView = (e) => {
    const type = e.target.className.split(' ').pop();
    setView(type);
  }
  return (
    <>
    { resMsg.length === 0 ? <NoPost_Cont><NoPost_img src={IconNopost} alt="아이콘" /> <NoPost_Txt>게시물이 없습니다</NoPost_Txt></NoPost_Cont> : <PostCont>
      {isProfilePage ?
        <PostViewCont>
          <BtnOption className='list' onClick={handleChangeView} view={view}></BtnOption>
          <BtnOption className='album' onClick={handleChangeView} view={view}></BtnOption>
        </PostViewCont>
      : <></>}
      {view === "list" ? 
      postArrList
      : <AlbumCont> {postArrAlbum}</AlbumCont>}
    </PostCont>}
    </>
  )
}
