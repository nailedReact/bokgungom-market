// 컴포넌트에 productImageSet.style 파일 추가
// 상품 등록 페이지 이미지 업로드 및 API 코드 수정

import { useState, useRef } from 'react'
import Inp from '../../components/userinput/Inp';
import UserInput from '../../components/userinput/UserInput';
import Button from '../../components/Button';
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import { ProductImgSetCont } from "../../components/ProductImageSet/productImageSet.style";
import Warning from '../../components/Warning';

export default function UploadProduct() {
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productLink, setProductLink] = useState('')
    const nameAlertMsg = useRef(null);
    const priceAlertMsg = useRef(null);
    const linkAlertMsg = useRef(null);
    const imagePre = useRef(null)
    const handleInpName = (e) => {
        setProductName(e.target.value)
    }
    const handleInpPrice = (e) => {
        setProductPrice(e.target.value)
    }
    const handleInpLink = (e) => {
        setProductLink(e.target.value)
    }

    // 기존 미리보기 이미지에서 상품 이미지로 변경
    const submitData = useRef({});
    const fileOnChange = (files, fileReader) => {
        fileReader.readAsDataURL(files[0]);
        fileReader.onload = function () {
            imagePre.current.src = fileReader.result;
            const formData = new FormData();
            formData.append("image", files[0]);
            submitData.current["imageBeforeSubmit"] = formData;
        };
    }

    // 저장 버튼 클릭하면 상품 정보 API 전송 (로그인 되어있어야 함.)
    const onClickSave = async () => {
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

            // 입력 내용 전체 서버에 전송. 이미지는 서버에 있는 데이터를 가져와서 전송.
            (async function () {
                const url = "https://mandarin.api.weniv.co.kr/product";
                const productData = {
                    "product": {
                        "itemName": productName,
                        "price": Number(productPrice),
                        "link": productLink,
                        "itemImage": submitData.current["image"]
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

                if (json.message === "필수 입력사항을 입력해주세요."){
                    (!productName) ? 
                        nameAlertMsg.current.style.display = "block" : 
                        nameAlertMsg.current.style.display = "none";

                    (!productPrice) ? 
                        priceAlertMsg.current.style.display = "block":
                        priceAlertMsg.current.style.display = "none";
                    
                    (!productLink) ? 
                        linkAlertMsg.current.style.display = "block" : 
                        linkAlertMsg.current.style.display = "none";
                }
                else {
                    console.log("상품 등록 완료");
                }
            }());
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <form>
            <ProductImgSetCont htmlFor="productImg">
                <UserInput label="이미지 업로드">
                    <img
                        className={"productSampleImage"}
                        src={require(`../../assets/product-img-empty.png`)}
                        alt="상품 이미지 미리보기"
                        ref={imagePre}
                    />
                    <ImageUpload
                        id={"productImg"}
                        className={"fileUpload"}
                        btnStyle={"orange small"}
                        onChangeByUpper={fileOnChange}
                    />
                </UserInput>
            </ProductImgSetCont>

            <UserInput inputId="productName" label="상품명">
                <Inp
                    type="text"
                    id="productName"
                    onChange={handleInpName}
                    value={productName}
                    minLength={"2"}
                    maxLength={"15"}
                    required
                >
                </Inp>
            </UserInput>
            <Warning ref={nameAlertMsg}>* 상품명을 입력해주세요.</Warning>
            <UserInput inputId="productPrice" label="가격">
                <Inp
                    type="number"
                    id="productPrice"
                    onChange={handleInpPrice}
                    value={productPrice}
                    required
                >
                </Inp>
            </UserInput>
            <Warning ref={priceAlertMsg}>* 가격을 입력해주세요.</Warning>
            <UserInput inputId="productLink" label="판매링크">
                <Inp
                    type="url"
                    id="productLink"
                    onChange={handleInpLink}
                    value={productLink}
                    required
                >
                </Inp>
            </UserInput>
            <Warning ref={linkAlertMsg}>* 판매 링크를 입력해주세요.</Warning>
            <Button
                type="button"
                className="ms"
                // disabled={isBtnDisable}
                onClick={onClickSave}
            >저장
            </Button>
        </form>

    )
}