import {useState, useRef} from 'react'
import Inp from '../../components/userinput/Inp';
import UserInput from '../../components/userinput/UserInput';
import Button from '../../components/Button';
import ImageUpload from "../../components/ImageUpload/ImageUpload";
// import ImgUploadIcon from "../../components/ImageUpload/ImageUpload";
import {ProfileImgSetCont} from "../../components/ProfileImageSet/profileImageSet.style"
// import { ProductSampleImg } from "./UploadProduct.style";

export default function UploadProduct({onChangeByUpper}) {
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productLink, setProductLink] = useState('')
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

    // 상품 이미지 업로드
    const fileOnChange = (files, fileReader) => {
        fileReader.readAsDataURL(files[0]);
        fileReader.onload = function () {
            imagePre.current.src = fileReader.result;
            onChangeByUpper(files[0]);
        };
    }

    // const fileOnChange = async (e) => {
    //     const imageFile = e.target.files[0];
    //     const formData = new FormData();
    //     formData.append("image", imageFile);
    //     console.log(imagePre);

    //     const response = await fetch("https://mandarin.api.weniv.co.kr/image/uploadfile",{
    //     method: "POST",
    //     body: formData
    //     });
    //     const json = await response.json()
    //     const uploadImg = "https://mandarin.api.weniv.co.kr/"+json.filename;
    //     console.log(uploadImg);
    // }

    // 저장 버튼 클릭하면 상품 정보 API 전송 (로그인 되어있어야 함.)
    const onClickSave = () => {
        console.log(imagePre);
        const fetchData = async() => {
            const url = "https://mandarin.api.weniv.co.kr/product";
            const productData = {
                "product":{
                "itemName": productName,
                "price": Number(productPrice),
                "link": productLink,
                "itemImage": imagePre.current.src
                }
            };
            const response = await fetch(url,{
                method:"POST",
                headers: {
                    "Authorization" : localStorage.getItem('Authorization'),
                    "Content-type" : "application/json"
                },
                body: JSON.stringify(productData)
            });
            const json = await response.json();
            console.log(json);
        };
        fetchData()
    }

    return (
        <form>
            {/* <label htmlFor="productImg">
                이미지 등록
                <img src={require(`../../assets/product-img-empty.png`)} ref={imagePre}/>
            </label>
            <input type="file" id="productImg" name="productImg" accept="image/*" onChange={fileOnChange} /> */}

            <ProfileImgSetCont>
            <span className={"ir"}>상품 이미지 설정</span>
            <img
                className={"productSampleImage"}
                src={require(`../../assets/product-img-empty.png`)}
                alt=""
                ref={imagePre}
            />
            <ImageUpload
                className={"fileUpload"}
                btnStyle={"orange small"}
                onChangeByUpper={fileOnChange}
                style="position: absolute; right: 12px; bottom: 12px;"
            />
            </ProfileImgSetCont>

            <UserInput inputId="productName" label="상품명">
            <Inp
                type="text"
                id="productName"
                onChange={handleInpName}
                value={productName} 
                required
            >
            </Inp>
            </UserInput>
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
