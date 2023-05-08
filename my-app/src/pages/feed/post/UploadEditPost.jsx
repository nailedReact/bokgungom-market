import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TopBar from "../../../components/topbar/TopBar";
import ImageUpload from "../../../components/imageUpload/ImageUpload";
import NavBar from "../../../components/navBar/NavBar";
import Toast from "../../../components/toast/Toast";
import Textarea from "../../../components/textarea/Textarea";
import useAuth from "../../../hook/useAuth";
import useWindowSizeCustom from "../../../hook/windowSize";
import actionImgCompress from "../../../utils/imageCompression";
import { ProductImgSetCont } from "../../../components/productImageSet/productImageSet.style";
import basicImg from "../../../assets/basic-profile-img.png";
import deleteIcon from "../../../assets/icon/icon-delete.png";
import { 
    Contentimg,
    PostEditWrapper,
    UserProfileImg } from "./post.share.style";
import { BASE_URL } from "../../../config";

let fileUrls = [];
let renderings = [];
let imagesOnSubmit = [];
let alreadySubmitted = [];

export default function UploadEditPost() {
    const baseUrl = BASE_URL;
    const [isBtnDisable, setIsBtnDisable] = useState(true);
    const [showImages, setShowImages] = useState([]);
    const [isKeyboardUp, setIsKeyboardUp] = useState(false);
    const imagePre = useRef(null);
    const textarea = useRef();
    const fileInpRef = useRef(null);
    const toastRef = useRef(null);
    const navigate = useNavigate();
    const data = useAuth();
    const { width } = useWindowSizeCustom();
    const { id } = useParams();

    useEffect(() => {
        const handleResize = (e) => {
            if (window.innerWidth < 768) {
                if (Math.abs(window.innerHeight - e.target.height) >= 1) {
                    setIsKeyboardUp(true);
                } else {
                    setIsKeyboardUp(false);
                }
            }
        };

        window.visualViewport.addEventListener("resize", handleResize);

        return () =>
            window.visualViewport.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        fileUrls = [];
        renderings = [];
        imagesOnSubmit = "";
        alreadySubmitted = [];
        fileInpRef.current.value = null;

        if (!id) {
            setShowImages([]);
            textarea.current.value = "";
        }
        const getPrevDetail = async () => {
            if (id) {
                setIsBtnDisable(false);
                try {
                    const URL = `${baseUrl}/post/${id}`;

                    const res = await axios.get(URL, {
                        headers: {
                            Authorization:
                                localStorage.getItem("Authorization"),
                            "Content-type": "application/json",
                        },
                    });

                    textarea.current.value = res.data.post.content;
                    textarea.current.style.height = "auto";
                    textarea.current.style.height =
                        textarea.current.scrollHeight + "px";

                    setShowImages((prev) => {
                        if (res.data.post.image) {
                            imagesOnSubmit = res.data.post.image;
                            const splited = res.data.post.image.split(",");
                            renderings.push(...splited);
                            return [...prev, ...splited];
                        } else return prev;
                    });
                } catch (err) {
                    console.log(err);
                }
            }
        };

        id && getPrevDetail();
    }, [baseUrl, id]);

    const handleTextarea = (e) => {
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

    const handleAddImages = async (selectedFile) => {
        if (renderings.length + fileInpRef.current.files.length <= 3) {
            for (let i = 0; i < selectedFile.length; i++) {
                const file = selectedFile[i];
                renderings.push(file);

                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = (e) => {
                    setShowImages((prev) => [...prev, fileReader.result]);
                };
                fileInpRef.current.value = null;

                const submitFile = await actionImgCompress(file);
                fileUrls.push(submitFile);
            }
            setIsBtnDisable(false);
        } else {
            alert("이미지는 3개까지 업로드 할 수 있습니다.");
        }
    };

    const handleDeleteImage = (id) => {
        setShowImages(showImages.filter((_, index) => index !== id));

        if (!textarea.current.value && showImages.length === 1) {
            setIsBtnDisable(true);
        }

        fileInpRef.current.value = null;

        renderings = renderings.filter((_, index) => index !== id);

        fileUrls = renderings.filter((e) => typeof e === "object");

        alreadySubmitted = renderings.filter((e) => typeof e !== "object");

        imagesOnSubmit = alreadySubmitted.join(",");
    };

    const uploadImg = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await fetch(
                `${baseUrl}/image/uploadfiles`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const json = await res.json();
            const postImgName = json[0].filename;

            return postImgName;
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmitHandle = async function (e) {
        e.preventDefault();
        const imgUrls = [];

        try {
            if (fileUrls.length) {
                for (const file of fileUrls) {
                    imgUrls.push(
                        `https://api.mandarin.weniv.co.kr/` +
                            (await uploadImg(file))
                    );
                }
            }

            imagesOnSubmit =
                imagesOnSubmit.length && fileUrls.length
                    ? imagesOnSubmit + "," + imgUrls.join(",")
                    : imagesOnSubmit + imgUrls.join(",");

            const productData = {
                post: {
                    content: textarea.current.value,
                    image: imagesOnSubmit,
                },
            };

            let submitRequestConfig = {};

            if (id) {
                submitRequestConfig.method = "PUT";
                submitRequestConfig.url = `${baseUrl}/post/${id}`;
            } else {
                submitRequestConfig.method = "POST";
                submitRequestConfig.url =
                    `${baseUrl}/post`;
            }

            const response = await fetch(submitRequestConfig.url, {
                method: submitRequestConfig.method,
                headers: {
                    Authorization: localStorage.getItem("Authorization"),
                    "Content-type": "application/json",
                },
                body: JSON.stringify(productData),
            });
            const json = await response.json();

            if (json.message) {
                alert(json.message);
            } else {
                handleShowToast();
                setTimeout(function () {
                    if (id) {
                        navigate("/post/" + json.post.id);
                    } else {
                        navigate(
                            `/account/profile/${json.post.author.accountname}`
                        );
                    }
                }, 3000);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleShowToast = () => {
        toastRef.current.style.transform = "scale(1)";
        setTimeout(function () {
            toastRef.current.style.transform = "scale(0)";
        }, 1500);
        return;
    };

    return (
        <>
            <TopBar
                type="A4"
                right4Ctrl={{ form: "postUpload", isDisabled: isBtnDisable }}
            />
            <Toast
                ref={toastRef}
                msg={
                    id
                        ? "게시글이 수정되었습니다!"
                        : "게시글이 업로드 되었습니다!"
                }
            />
            <PostEditWrapper>
                <UserProfileImg
                    src={data ? data.image : basicImg}
                    alt="게시글 작성자 프로필 사진"
                />
                <form
                    style={{ flexBasis: "304px", height: "100%" }}
                    action=""
                    id={"postUpload"}
                    onSubmit={onSubmitHandle}
                >
                    <ProductImgSetCont htmlFor="productImg">
                        {/* <ExReport/> */}
                        <Textarea
                            placeholder="게시글 입력하기..."
                            onChange={handleTextarea}
                            ref={textarea}
                            rows={1}
                        />
                        {showImages.map((image, id) => (
                            <div className="each-image-cont" key={id}>
                                <div>
                                    <Contentimg
                                        src={image}
                                        alt={"게시글 첨부 사진"}
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
                            </div>
                        ))}
                    </ProductImgSetCont>
                    <ImageUpload
                        btnStyle={"orange small location"}
                        onChangeByUpper={handleAddImages}
                        isMultiple={true}
                        ref={fileInpRef}
                        isKeyboardUp={isKeyboardUp}
                    />
                </form>
            </PostEditWrapper>
            {width >= 768 ? <NavBar /> : <></>}
        </>
    );
}
