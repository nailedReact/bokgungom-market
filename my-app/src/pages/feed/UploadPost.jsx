import { useState, useRef } from "react";
import Button from '../../components/Button';
import { ProductImgSetCont } from "../../components/ProductImageSet/productImageSet.style";
import { ImgUploadIcon } from "../../components/ImageUpload/imageUpload.style";

export default function UploadPost() {
    const [showImages, setShowImages] = useState([]);
    const [contentText, setContentText] = useState("")
    const submitData = useRef({});
    const imagePre = useRef(null)

    const handleTextarea = (e) => {
        setContentText(e.target.value)
    }
    
    // 이미지 브라우저 화면에 업로드 & FormData 형식으로 변환
    const handleAddImages = (event) => {
        const imageLists = event.target.files;
        let imageUrlLists = [...showImages];
        const fileReader = new FileReader();

        for (let i = 0; i < imageLists.length; i++) {
            imageUrlLists.push(imageLists[i].name);
            console.log(imageUrlLists);
            fileReader.readAsDataURL(imageLists[i])
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
    };


    const handleDeleteImage = (id) => {
        setShowImages(showImages.filter((_, index) => index !== id));
    };

    // 업로드 버튼 클릭 시 텍스트, 이미지를 서버로 전송.
    const onClickUpload = async(e) => {
        e.preventDefault()
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

            submitData.current["image"] = "https://mandarin.api.weniv.co.kr/" + json.filename;

            console.log(submitData.current);

            // 텍스트, 이미지 값 서버에 전송. 이미지는 서버에 있는 데이터를 가져와서 전송.
            (async function () {
                const url = "https://mandarin.api.weniv.co.kr/post";
                const productData = {
                    "post": {
                        "content": contentText,
                        "image": submitData.current["image"]
                    }
                };
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Authorization": localStorage.getItem('Authorization'),
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(productData)
                });
                const json = await response.json();
                console.log(json);
                console.log("게시글 등록 완료");
            }());
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="App">
            <form action="">
            <ProductImgSetCont htmlFor="productImg">
                <textarea 
                    placeholder="게시글 입력하기..."
                    onChange={handleTextarea}
                    value={contentText}
                />
            
                {showImages.map((image, id) => (
                    <div key={id}>
                        <img src={image} alt={`${image}-${id}`} ref={imagePre}/>
                        <span onClick={() => handleDeleteImage(id)}>x</span>
                    </div>
                ))}
            <ImgUploadIcon className={"orange small"}>
            <span className="ir">이미지 첨부</span>
            <input
                className="ir"
                type="file"
                accept="image/*"
                onChange={handleAddImages}
            />
            </ImgUploadIcon>
            
            </ProductImgSetCont>
            <Button
                type="submit"
                className="ms"
                // disabled={isBtnDisable}
                onClick={onClickUpload}
            >업로드
            </Button>
            </form>
        </div>
    );
}
