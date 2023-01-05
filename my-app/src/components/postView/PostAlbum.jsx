import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import multiimg from "../../assets/icon/icon-img-layers.png";
import errorimg from "../../assets/imageNotFound.png";


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
    @media screen and (min-width: 768px){
      width: 14%;
      height: 14%;
    }
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
  const imgerror = (e) => {
    e.target.src = errorimg;
    e.target.style.padding = "60px";
    e.target.style.background = "#f2f2f2";
};

  return (
    <>
      { data.image ? data.image.split(",").length > 1 ? 
      <Link to={postDetailSrc}>
        <AlbumCont>
          <ImgCont>
            <Contentimg src={data.image.split(",")[0]} onError={imgerror} />
          </ImgCont>
          <Multiimg src={multiimg} alt="여러 이미지 아이콘" />
        </AlbumCont>
      </Link>
      :
      <Link to={postDetailSrc}>
        <ImgCont>
          <Contentimg src={data.image} onError={imgerror} />
        </ImgCont>
      </Link>
      : null}
    </>
  )
}
