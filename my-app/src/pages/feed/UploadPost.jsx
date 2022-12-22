import { useState, useRef } from "react";
import Button from "../../components/Button";
import TopBar from "../../components/TopBar";
import { PostEditWrapper } from "../../components/postEditWrapper.style";
import { ProductImgSetCont } from "../../components/ProductImageSet/productImageSet.style";
import { ImgUploadIcon } from "../../components/ImageUpload/imageUpload.style";
import { UserProfileImg } from "../../components/postEditUserProfile.style";
import Textarea from "../../components/Textarea/Textarea";
import { Contentimg } from "../../components/postEditContentImg.style";
// import {basicImg} from "../../assets/basic-profile-img-small.png";
import basicImg from "../../assets/basic-profile-img.png";
import deleteIcon from "../../assets/icon/icon-delete.png";
import NavBar from "../../components/NavBar/NavBar";

export default function UploadPost() {
    const [showImages, setShowImages] = useState([]);
    const [contentText, setContentText] = useState("");
    const [isBtnDisable, setIsBtnDisable] = useState(true);
    const submitData = useRef({});
    const imagePre = useRef(null);
    const textarea = useRef();

    // textarea 자동 높이 조절
    const handleTextarea = (e) => {
        setContentText(e.target.value);
        textarea.current.style.height = "auto";
        textarea.current.style.height = textarea.current.scrollHeight + "px";

        if (e.target.value.length === 0 && showImages.length === 0) {
            setIsBtnDisable(true);
        } else if (e.target.value.length > 0) {
            setIsBtnDisable(false);
        }

        // 글자 수 제한 테스트 중입니다.
        // let text = e.target.value;
        // let text_length = text.length;
        // setContentText(text);

        // let max_length = 100;
        // if (text_length > max_length) {
        //     text = text.substring(0, 100);
        //     alert(100 + "자 이상 작성할 수 없습니다.");
        // }
    };

    // 이미지 브라우저 화면에 업로드 & FormData 형식으로 변환
    const handleAddImages = (event) => {
        const imageLists = event.target.files;
        let imageUrlLists = [...showImages];
        const fileReader = new FileReader();

        for (let i = 0; i < imageLists.length; i++) {
            imageUrlLists.push(imageLists[i].name);
            console.log(imageUrlLists);
            fileReader.readAsDataURL(imageLists[i]);
            fileReader.onload = function () {
                imagePre.current.src = fileReader.result;
                const formData = new FormData();
                formData.append("image", imageLists[i]);
                submitData.current["imageBeforeSubmit"] = formData;
            };
        }

        if (imageUrlLists.length > 3) {
            imageUrlLists = imageUrlLists.slice(0, 3);
        }

        setShowImages(imageUrlLists);
        setIsBtnDisable(false);
    };

    const handleDeleteImage = (id) => {
        setShowImages(showImages.filter((_, index) => index !== id));
        if (!contentText && showImages.length === 1) {
            setIsBtnDisable(true);
        }
    };

    // 업로드 버튼 클릭 시 텍스트, 이미지를 서버로 전송.
    const onClickUpload = async (e) => {
        e.preventDefault();
        console.log("업로드 버튼 클릭");
        // 이미지 서버에 전송
        try {
            const res = await fetch(
                "https://mandarin.api.weniv.co.kr/image/uploadfile",
                {
                    method: "POST",
                    body: submitData.current.imageBeforeSubmit,
                }
            );
            const json = await res.json();

            console.log(json);

            submitData.current["image"] =
                "https://mandarin.api.weniv.co.kr/" + json.filename;

            console.log(submitData.current);

            // 텍스트, 이미지 값 서버에 전송. 이미지는 서버에 있는 데이터를 가져와서 전송.
            (async function () {
                const url = "https://mandarin.api.weniv.co.kr/post";
                const productData = {
                    post: {
                        content: contentText,
                        image: submitData.current["image"],
                    },
                };
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        Authorization: localStorage.getItem("Authorization"),
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(productData),
                });
                const json = await response.json();
                console.log(json);
                console.log("게시글 등록 완료");
            })();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <TopBar
                type="A4"
                right4Ctrl={{ form: "postUpload", isDisabled: isBtnDisable }}
            />
            <PostEditWrapper>
                <UserProfileImg
                    src={basicImg}
                    alt="게시글 작성자 프로필 사진"
                />
                <form style={{flexBasis: "304px", height: "100%"}} action="" id={"postUpload"} onSubmit={onClickUpload}>
                    <ProductImgSetCont htmlFor="productImg">
                        <Textarea
                            placeholder="게시글 입력하기..."
                            onChange={handleTextarea}
                            value={contentText}
                            ref={textarea}
                            rows={1}
                        />

                        {/* 이미지 표시하는게 label 안에 있어도 되나? */}
                        {showImages.map((image, id) => (
                            <div className="each-image-cont" key={id}>
                                <Contentimg
                                    src={image}
                                    alt={`${image}-${id}`}
                                    ref={imagePre}
                                />
                                <button
                                    className="delete-btn"
                                    type="button"
                                    onClick={() => handleDeleteImage(id)}
                                >
                                    <img src={deleteIcon} alt="이미지 삭제" />
                                </button>
                            </div>
                        ))}
                    </ProductImgSetCont>
                     <ImgUploadIcon className={"orange small location"}>
                         <span className="ir">이미지 첨부</span>
                         <input
                            className="ir"
                            type="file"
                            accept="image/jpg, image/gif, image/png, image/jpeg, image/bmp, image/tif, image/heic"
                            onChange={handleAddImages}
                        />
                    </ImgUploadIcon>
                </form>
            </PostEditWrapper>
            <NavBar/>
        </>
    );
}
