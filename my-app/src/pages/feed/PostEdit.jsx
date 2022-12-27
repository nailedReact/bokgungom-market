import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import TopBar from "../../components/TopBar";
import Textarea from "../../components/Textarea/Textarea";
import axios from "axios";
import { PostEditWrapper } from "../../components/postEditWrapper.style";
import { Contentimg } from "../../components/postEditContentImg.style";
import { UserProfileImg } from "../../components/postEditUserProfile.style";
import { ProductImgSetCont } from "../../components/ProductImageSet/productImageSet.style";
import { ImgUploadIcon } from "../../components/ImageUpload/imageUpload.style";
import basicImg from "../../assets/basic-profile-img.png";
import deleteIcon from "../../assets/icon/icon-delete.png";
import Toast from "../../components/Toast";
import NavBar from "../../components/NavBar/NavBar";

export default function PostEdit() {
    const [showImages, setShowImages] = useState([]);
    const [contentText, setContentText] = useState("");
    const [isBtnDisable, setIsBtnDisable] = useState(false);
    const submitData = useRef({});
    const imagePre = useRef(null);
    const URL = `https://mandarin.api.weniv.co.kr${useLocation().pathname.slice(
        0,
        -5
    )}`;
    const navigate = useNavigate();
    const toastRef = useRef(null);
    const textarea = useRef();

    // 페이지 로드시 기존 게시글 정보 불러오기 위함
    useEffect(() => {
        const getPrevDetail = async () => {
            try {
                const res = await axios.get(URL, {
                    headers: {
                        Authorization: localStorage.getItem("Authorization"),
                        "Content-type": "application/json",
                    },
                });

                // textarea 기존 데이터 받아온 거로
                setContentText(res.data.post.content);

                setShowImages((prev) => {
                    // 받아온 기존 데이터에 이미지가 있을 경우에만 이미지 렌더링
                    if (res.data.post.image) {
                        return [...prev, res.data.post.image];
                    } else return prev;
                });

                // 기존 데이터 이미지를 나중에 게시글 수정 업로드 요청시 제출할 데이터에 넣도록(이미지 서버에 이미 등록돼있으니까 요청할 필요 없음)
                submitData.current.image = res.data.post.image;
            } catch (err) {
                console.log(err);
            }
        };

        getPrevDetail();
        // eslint-disable-next-line
    }, []);

    const handleTextarea = (e) => {
        setContentText(e.target.value);
        textarea.current.style.height = "auto";
        textarea.current.style.height = textarea.current.scrollHeight + "px";
        if (e.target.value.length === 0 && showImages.length === 0) {
            setIsBtnDisable(true);
        } else {
            setIsBtnDisable(false);
        }
    };

    // 이미지 브라우저 화면에 업로드 & FormData 형식으로 변환
    const handleAddImages = (event) => {
        const imageLists = event.target.files;
        let imageUrlLists = [...showImages];
        const fileReader = new FileReader();

        for (let i = 0; i < imageLists.length; i++) {
            imageUrlLists.push(imageLists[i].name);
            fileReader.readAsDataURL(imageLists[i]);
            fileReader.onload = function () {
                imagePre.current.src = fileReader.result;
                const formData = new FormData();
                formData.append("image", imageLists[i]);
                submitData.current["imageBeforeSubmit"] = formData;
            };
        }

        if (imageUrlLists.length > 10) {
            imageUrlLists = imageUrlLists.slice(0, 10);
        }

        setShowImages(imageUrlLists);
        setIsBtnDisable(false);
    };

    const handleDeleteImage = (id) => {
        setShowImages(showImages.filter((_, index) => index !== id));
        // 일단 이미지를 하나만 처리한다고 가정해서 버튼 클릭시 모두 null로 바꿨는데 여러장 이미지 등록할 때는 이 코드를 바꿔야 합니다.
        // 코드 수정 방향: 이미지 삭제 버튼 클릭시 해당 이미지만 삭제하도록(제출할 데이터에서)
        submitData.current.image = null;
        // console.log(submitData.current.image);
        // console.log(!!contentText);
        // console.log(showImages);
        // console.log(showImages.length);
        if (!contentText && showImages.length === 1) {
            setIsBtnDisable(true);
        }
    };

    // 업로드 버튼 클릭 시 텍스트, 이미지를 서버로 전송.
    const onClickUpload = async (e) => {
        e.preventDefault();
        // console.log(submitData.current.imageBeforeSubmit);
        // console.log(submitData.current.image);
        console.log("업로드 버튼 클릭");
        // 이미지 서버에 전송

        try {
            // imagebeforesubmit이 있는 경우에만 이미지 서버 등록 요청이 되도록(이미지 없이 업로드 위함)
            if (submitData.current.imageBeforeSubmit) {
                const res = await fetch(
                    "https://mandarin.api.weniv.co.kr/image/uploadfile",
                    {
                        method: "POST",
                        body: submitData.current.imageBeforeSubmit,
                    }
                );
                const json = await res.json();

                submitData.current["image"] =
                    "https://mandarin.api.weniv.co.kr/" + json.filename;
            }

            // 텍스트, 이미지 값 서버에 전송. 이미지는 서버에 있는 데이터를 가져와서 전송.
            (async function () {
                const productData = {
                    post: {
                        content: contentText,
                        image: submitData.current["image"],
                    },
                };
                const response = await fetch(URL, {
                    method: "PUT",
                    headers: {
                        Authorization: localStorage.getItem("Authorization"),
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(productData),
                });
                const json = await response.json();
                console.log("게시글 수정 완료");
                handleShowToast();
                setTimeout(function(){
                    navigate("/post/" + json.post.id);
                }, 1000)
            })();
        } catch (err) {
            console.log(err);
        }
    };
    const handleShowToast = () => {
        toastRef.current.style.transform = "scale(1)";
        setTimeout(function(){
            toastRef.current.style.transform = "scale(0)";
        }, 3000)
        return;
    }
    return (
        <>
            <TopBar
                type="A4"
                right4Ctrl={{ form: "postUpload", isDisabled: isBtnDisable }}
            />
            <Toast ref={toastRef} msg="게시물이 수정 되었습니다!" />
            <PostEditWrapper>
                <UserProfileImg
                    src={basicImg}
                    alt="게시글 작성자 프로필 사진"
                />
                <form action="" id={"postUpload"} onSubmit={onClickUpload}>
                    <ProductImgSetCont htmlFor="productImg">
                        <Textarea
                            placeholder="게시글 입력하기..."
                            onChange={handleTextarea}
                            value={contentText}
                            ref={textarea}
                            rows={1}
                        />

                        {showImages &&
                            showImages.map((image, id) => (
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
                                        <img
                                            src={deleteIcon}
                                            alt="이미지 삭제"
                                        />
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
