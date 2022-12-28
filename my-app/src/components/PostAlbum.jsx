import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import multiimg from "../assets/icon/iccon-img-layers.png";


export default function PostAlbum({data, myProfile, postDetailSrc}) {

  const Contentimg = styled.img`
    width: 100%;
	  height: 100%;
    outline: 1px solid #C4C4C4;
  `
  const Multiimg = styled.img`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
  `
  const AlbumCont = styled.div`
    position: relative;  
  `

  return (
    <>
      { data.image ? data.image.split(",").length > 1 ? <Link to={postDetailSrc}><AlbumCont><Contentimg src={data.image.split(",")[0]} alt="컨텐츠 사진입니다." /><Multiimg src={multiimg} alt="여러 이미지 아이콘" /></AlbumCont></Link>  : <Link to={postDetailSrc}><Contentimg src={data.image} alt="컨텐츠 사진입니다." /></Link> : null}
    </>
  )
}
