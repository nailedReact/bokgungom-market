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
import useAuth from "../../hook/useAuth";
import useWindowSizeCustom from "../../hook/windowSize";

let fileUrls = []; // 이미지 서버 업로드용(이미지 서버 등록 API)
let renderings = []; // 화면에 띄우는 거
let submitOnProfileEdit = []; // 프로필 수정시 보낼 이미지들(프로필 수정 API)
let alreadySubmitted = []; // 화면에 띄운 거 중 새로 업로드한 파일이 아니라서 이미지 서버에 업로드할 필요 없는 것들

export default function PostEdit() {
    const [showImages, setShowImages] = useState([]);
    const [contentText, setContentText] = useState("");
    const [isBtnDisable, setIsBtnDisable] = useState(false);
    const [isFocused, setIsFocused] = useState();
    const imagePre = useRef(null);
    const URL = `https://mandarin.api.weniv.co.kr${useLocation().pathname.slice(
        0,
        -5
    )}`;
    const navigate = useNavigate();
    const toastRef = useRef(null);
    const textarea = useRef();
    const fileInpRef = useRef(null);
    const fileLabelRef =useRef();
    const data = useAuth();

    const { width } = useWindowSizeCustom();

    // 페이지 로드시 기존 게시글 정보 불러오기 위함
    useEffect(() => {
        // 초기화
        fileUrls = [];
        renderings = [];
        submitOnProfileEdit = [];
        alreadySubmitted = [];
        fileInpRef.current.value = null;

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
                        submitOnProfileEdit = res.data.post.image;
                        const splited = res.data.post.image.split(",");
                        renderings.push(...splited);
                        return [...prev, ...splited];
                    } else return prev;
                });
            } catch (err) {
                console.log(err);
            }
        };

        getPrevDetail();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                if (isFocused) {
                    fileLabelRef.current.style.bottom = "50%";
                } else {
                    fileLabelRef.current.style.bottom = "8.51%";
                }
            }
        };

        window.visualViewport.addEventListener("resize", handleResize)

        return () => window.visualViewport.removeEventListener("resize", handleResize);
    }, [isFocused])

    const handleFocus = () => {
        setIsFocused(true);
    }

    const handleBlur = () => {
        setIsFocused(false);
    }

    const rows = useRef();

    useEffect(() => {
        const newRows = textarea.current.value.split(/\r\n|\r|\n/).length;

        console.log(`예전 rows: ${rows.current}`);
        console.log(`새로운 rows: ${newRows}`);

        if (rows.current !== newRows) {
            rows.current = newRows;
            console.log("rows 업데이트");

            if (textarea.current.scrollHeight > textarea.current.clientHeight) {
                //textarea height 확장
                textarea.current.style.height = textarea.current.scrollHeight + "px";
            } else {
                //textarea height 축소
                // textarea.current.style.height =
                // textarea.current.scrollHeight - 18 + "px";

                textarea.current.style.height= (rows.current * 18) + "px";
            }
        } else {
            textarea.current.style.height = "auto";
            textarea.current.style.height = textarea.current.scrollHeight + "px";
        }
    }, [contentText]);

    const handleTextarea = (e) => {
        setContentText(e.target.value);
        // textarea.current.style.height = "auto";
        // textarea.current.style.height = textarea.current.scrollHeight + "px";
        if (e.target.value.length === 0 && showImages.length === 0) {
            setIsBtnDisable(true);
        } else {
            setIsBtnDisable(false);
        }
    };

    let previewUrl = [];
    // 이미지 브라우저 화면에 업로드 & FormData 형식으로 변환
    const handleAddImages = (event) => {
        if (renderings.length + fileInpRef.current.files.length <= 3) {
            const imageFiles = [...fileInpRef.current.files];
            renderings.push(...imageFiles);
            fileUrls = renderings.filter((e) => typeof e === "object");
            // console.log("화면에 표시되는 것:", renderings);
            // console.log("이미지 서버 등록 목록:", fileUrls);

            for (let i = 0; i < renderings.length; i++) {
                if (typeof renderings[i] === "object") {
                    let file = renderings[i];
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                        previewUrl.push(fileReader.result);
                        setShowImages([...previewUrl]);
                    };
                    fileReader.readAsDataURL(file);
                } else {
                    previewUrl.push(renderings[i]);
                    setShowImages([...previewUrl]);
                }
            }
            setIsBtnDisable(false);
            fileInpRef.current.value = null;
        } else {
            alert("이미지는 3개까지 업로드 할 수 있습니다.");
        }
    };

    const handleDeleteImage = (id) => {
        setShowImages(showImages.filter((_, index) => index !== id));

        if (!contentText && showImages.length === 1) {
            setIsBtnDisable(true);
        }

        fileInpRef.current.value = null;

        renderings = renderings.filter((_, index) => index !== id);

        fileUrls = renderings.filter((e) => typeof e === "object");

        alreadySubmitted = renderings.filter((e) => typeof e !== "object");

        // console.log("화면에 보이는 것", renderings);
        // console.log("이미지 서버 등록 목록:", fileUrls);

        submitOnProfileEdit = alreadySubmitted.join(",");
        // console.log(submitOnProfileEdit);
    };

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

    // 업로드 버튼 클릭 시 텍스트, 이미지를 서버로 전송.
    const onClickUpload = async (e) => {
        e.preventDefault();
        // 이미지 서버에 전송
        const imgUrls = [];

        try {
            if (fileUrls.length) {
                for (const file of fileUrls) {
                    imgUrls.push(
                        "https://mandarin.api.weniv.co.kr/" +
                            (await uploadImg(file))
                    );
                }
            }

            submitOnProfileEdit =
                submitOnProfileEdit.length && fileUrls.length
                    ? submitOnProfileEdit + "," + imgUrls.join(",")
                    : submitOnProfileEdit + imgUrls.join(",");

            const productData = {
                post: {
                    content: contentText,
                    image: submitOnProfileEdit,
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
            setTimeout(function () {
                navigate("/post/" + json.post.id);
            }, 1500);
        } catch (err) {
            console.log(err);
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
            <Toast ref={toastRef} msg="게시물이 수정 되었습니다!" />
            <PostEditWrapper>
                <UserProfileImg
                    src={data ? data.image : basicImg}
                    alt="게시글 작성자 프로필 사진"
                />
                <form
                    style={{ flexBasis: "304px", height: "100%" }}
                    action=""
                    id={"postUpload"}
                    onSubmit={onClickUpload}
                >
                    <ProductImgSetCont htmlFor="productImg">
                        <Textarea
                            placeholder="게시글 입력하기..."
                            onChange={handleTextarea}
                            value={contentText}
                            ref={textarea}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
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
