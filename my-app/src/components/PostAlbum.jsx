import React from 'react'
import styled from 'styled-components'


export default function PostAlbum({data, myProfile}) {
    
  const Contentimg = styled.img`
    width: 100%;
	  height: auto;
  `;

  return (
    <>
      { data.image ? <Contentimg src={data.image} alt="컨텐츠 사진입니다." /> : null}
    </>
  )
}
