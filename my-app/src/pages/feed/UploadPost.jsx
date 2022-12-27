import { useState, useRef } from "react";
import TopBar from "../../components/TopBar";
import { PostEditWrapper } from "../../components/postEditWrapper.style";
import { ProductImgSetCont } from "../../components/ProductImageSet/productImageSet.style";
import { ImgUploadIcon } from "../../components/ImageUpload/imageUpload.style";
import { UserProfileImg } from "../../components/postEditUserProfile.style";
import Textarea from "../../components/Textarea/Textarea";
import { Contentimg } from "../../components/postEditContentImg.style";
import basicImg from "../../assets/basic-profile-img.png";
import deleteIcon from "../../assets/icon/icon-delete.png";

let fileUrls = [];

export default function UploadPost() {
    const [showImages, setShowImages] = useState([]);
    const [contentText, setContentText] = useState("");
    const imagePre = useRef(null);
    const textarea = useRef();

    // textarea 자동 높이 조절
    const handleTextarea = (e) => {
        setContentText(e.target.value);
        textarea.current.style.height = "auto";
        textarea.current.style.height = textarea.current.scrollHeight + "px";

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

    // 이미지 미리보기
    let previewUrl = [];
    const handleAddImages = (event) => {
        const imageFiles = event.target.files;
        let imageUrlLists = [...imageFiles];
        
        imageUrlLists.forEach((file) => fileUrls.push(file));

        if (fileUrls.length <= 3) {
            for (let i = 0; i < imageFiles.length; i++) {
                let file = imageFiles[i];
                const fileReader = new FileReader();
                fileReader.onload = () => {
                    // imagePre.current.src = fileReader.result;
                    previewUrl.push(fileReader.result);
                    setShowImages([...previewUrl]);
                };
                fileReader.readAsDataURL(file);
            };
        } else {
            alert("이미지는 3개까지 올릴 수 있습니다.");
            fileUrls.pop();
        }
    };

    // 이미지 미리보기 삭제
    const handleDeleteImage = (id) => {
        setShowImages(showImages.filter((_, index) => index !== id));
    };


    // 이미지 서버에 전송
    const uploadImg = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        console.log("업로드 버튼 클릭");

        try {
            const res = await fetch(
                "https://mandarin.api.weniv.co.kr/image/uploadfiles",
                {
                    method: "POST",
                    body: formData
                }
            );
            const json = await res.json();
            console.log(json);
            console.log(json[0].filename);
            const postImgName = json[0].filename;
            return postImgName
        } catch (error) {
            console.error(error);
        }
    };

    // 저장 버튼 클릭 시 텍스트, 이미지 값 서버에 전송. 이미지는 서버에 있는 데이터를 가져와서 전송.
    const createPost = async function (e) {
        e.preventDefault()
        const url = "https://mandarin.api.weniv.co.kr/post";
        const imgUrls = [];
        
        try {
            for (const file of fileUrls) {
                imgUrls.push("https://mandarin.api.weniv.co.kr/" + (await uploadImg(file)));
            };

            const productData = {
                post: {
                    content: contentText,
                    image: imgUrls.join(","),
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
        } catch (error) {
            console.error(error);
        };
    };
    
    return (
        <>
            <TopBar
                type="A4"
                right4Ctrl={{ form: "postUpload", isDisabled: false }}
            />
            <PostEditWrapper>
                <UserProfileImg
                    src={basicImg}
                    alt="게시글 작성자 프로필 사진"
                />
                <form style={{flexBasis: "304px", height: "100%"}} action="" id={"postUpload"} onSubmit={createPost}>
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
                            multiple
                            className="ir"
                            type="file"
                            accept="image/*"
                            onChange={handleAddImages}
                        />
                    </ImgUploadIcon>
                </form>
            </PostEditWrapper>
        </>
    );
}
