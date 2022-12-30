import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";
import useAuth from "../../hook/useAuth";
import { PostEditWrapper } from "../../components/postEditWrapper.style";
import { ProductImgSetCont } from "../../components/ProductImageSet/productImageSet.style";
import { ImgUploadIcon } from "../../components/ImageUpload/imageUpload.style";
import { UserProfileImg } from "../../components/postEditUserProfile.style";
import Textarea from "../../components/Textarea/Textarea";
import { Contentimg } from "../../components/postEditContentImg.style";
import basicImg from "../../assets/basic-profile-img.png";
import deleteIcon from "../../assets/icon/icon-delete.png";
import useWindowSizeCustom from "../../hook/windowSize";
import NavBar from "../../components/NavBar/NavBar";
import Toast from "../../components/Toast";

let fileUrls = [];

export default function UploadPost() {
    const [isBtnDisable, setIsBtnDisable] = useState(true);
    const [showImages, setShowImages] = useState([]);
    const [contentText, setContentText] = useState("");
    const imagePre = useRef(null);
    const textarea = useRef();
    const fileInpRef = useRef(null);
    const navigate = useNavigate();
    const data = useAuth();
    const toastRef = useRef(null);
    const fileLabelRef =useRef();

    // 화면 사이즈 변경 훅
    const { width } = useWindowSizeCustom();

    // 뒤로 가기, 또는 페이지 전환시 혹시라도 남아있을 fileURL, fileInpRef.current.value 제거 위해
    useEffect(() => {
        fileInpRef.current.value = null;
        fileUrls = [];
    }, []);

    // textarea 자동 높이 조절
    const handleTextarea = (e) => {
        setContentText(e.target.value);
        textarea.current.style.height = "auto";
        textarea.current.style.height = textarea.current.scrollHeight + "px";
        if (e.target.value.length === 0 && showImages.length === 0) {
            setIsBtnDisable(true);
        } else {
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

    // const [visualViewport, setVisualViewport] = useState();

    const handleFocus = () => {
        // console.log(window.innerHeight);
        // console.log(window.visualViewport.height);
        if (width < 768 && window.visualViewport.height !== window.innerHeight){
            fileLabelRef.current.style.bottom = "50%";
            // setVisualViewport(window.visualViewport.height);
        }
    }

    const handleBlur = () => {
        if (width < 768){
            fileLabelRef.current.style.bottom = "50px";
            // setVisualViewport(window.visualViewport.height);
        }
    }

    // 이미지 미리보기
    let previewUrl = [];
    const handleAddImages = (event) => {
        console.log(fileInpRef.current.style);
        if (
            fileUrls.length + 
            fileInpRef.current.files.length <=
            3
        ) {
            const imageFiles = [...fileInpRef.current.files];
            fileUrls.push(...imageFiles);

            for (let i = 0; i < fileUrls.length; i++) {
                let file = fileUrls[i];
                const fileReader = new FileReader();
                fileReader.onload = () => {
                    previewUrl.push(fileReader.result);
                    setShowImages([...previewUrl]);
                };
                fileReader.readAsDataURL(file);
            }
            setIsBtnDisable(false);
            fileInpRef.current.value = null;
        } else {
            alert("이미지는 3개까지 업로드 할 수 있습니다.");
        }
    };

    // 이미지 미리보기 삭제
    const handleDeleteImage = (id) => {
        setShowImages(showImages.filter((_, index) => index !== id));

        if (!contentText && showImages.length === 1) {
            setIsBtnDisable(true);
        };

        fileInpRef.current.value = null;

        fileUrls = fileUrls.filter((_, index) => index !== id);
    };

    // const postImgName = [];
    // 이미지 서버에 전송
    const uploadImg = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        
        try {
            const res = await fetch(
                "https://mandarin.api.weniv.co.kr/image/uploadfiles",
                {
                    method: "POST",
                    body: formData,
                }
            );
            const json = await res.json();
            console.log(json);

            const postImgName = json[0].filename;
            return postImgName;
        } catch (error) {
            console.error(error);
        }
    };

    // 저장 버튼 클릭 시 텍스트, 이미지 값 서버에 전송. 이미지는 서버에 있는 데이터를 가져와서 전송.
    const CreatePost = async function (e) {
        e.preventDefault();
        const url = "https://mandarin.api.weniv.co.kr/post";
        const imgUrls = [];

        try {
            for (const file of fileUrls) {
                imgUrls.push(
                    "https://mandarin.api.weniv.co.kr/" +
                        (await uploadImg(file))
                );
            }

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

            // 게시글이 없다면 오류 alert
            if (json.message) {
                alert(json.message);
            } else {
                // 게시글 등록 성공하면 본인 프로필 페이지로 이동
                handleShowToast();
                setTimeout(function(){
                    navigate(`/account/profile/${json.post.author.accountname}`);
                }, 1000)
            }
        } catch (error) {
            console.error(error);
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
            <Toast ref={toastRef} msg="게시글이 업로드 되었습니다!"/>
            <PostEditWrapper>
                <UserProfileImg
                    src={data ? data.image : basicImg}
                    alt="게시글 작성자 프로필 사진"
                />
                <form
                    style={{ flexBasis: "304px", height: "100%"}}
                    action=""
                    id={"postUpload"}
                    onSubmit={CreatePost}
                >
                    <ProductImgSetCont htmlFor="productImg">
                        {/* <ExReport/> */}
                        <Textarea
                            placeholder="게시글 입력하기..."
                            onChange={handleTextarea}
                            value={contentText}
                            ref={textarea}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
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
                    <ImgUploadIcon className={"orange small location"} ref={fileLabelRef}>
                        <span className="ir">이미지 첨부</span>
                        <input
                            multiple
                            className="ir"
                            ref={fileInpRef}
                            type="file"
                            accept="image/jpg, image/gif, image/png, image/jpeg, image/bmp, image/tif, image/heic"
                            onChange={handleAddImages}
                        />
                    </ImgUploadIcon>
                </form>
            </PostEditWrapper>
            {width >= 768 ? <NavBar /> : <></>}
        </>
    );
}
