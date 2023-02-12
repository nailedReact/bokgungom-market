import { Link } from 'react-router-dom';
import multiimg from "../../assets/icon/icon-img-layers.png";
import errorimg from "../../assets/imageNotFound.png";
import {
  Contentimg,
  Multiimg,
  AlbumCont,
  ImgCont
} from "./postAlbum.style";

export default function PostAlbum({data, myProfile, postDetailSrc}) {
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
  );
};