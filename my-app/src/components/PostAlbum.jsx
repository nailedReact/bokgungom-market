import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import multiimg from "../assets/icon/icon-img-layers.png";


export default function PostAlbum({data, myProfile, postDetailSrc}) {

  const Contentimg = styled.img`
    position: absolute;
    transform: translate(50, 50);
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: auto;
  `
  const Multiimg = styled.img`
    position: absolute;
    top: 4%;
    right: 4%;
    width: 18%;
    height: 18%;
  `
  const AlbumCont = styled.div`
    position: relative;
  `
  const ImgCont = styled.div`
      width: 100%;
      position: relative;
      overflow: hidden;
      outline: 1px solid #C4C4C4;
      &::after {
        content: "";
        display: block;
        padding-bottom: 100%;
      }
  `

  return (
    <>
      { data.image ? data.image.split(",").length > 1 ? 
      <Link to={postDetailSrc}>
        <AlbumCont>
          <ImgCont>
            <Contentimg src={data.image.split(",")[0]} alt="컨텐츠 사진입니다." />
          </ImgCont>
          <Multiimg src={multiimg} alt="여러 이미지 아이콘" />
        </AlbumCont>
      </Link>
      :
      <Link to={postDetailSrc}>
        <ImgCont>
          <Contentimg src={data.image} alt="컨텐츠 사진입니다." />
        </ImgCont>
      </Link>
      : null}
    </>
  )
}
