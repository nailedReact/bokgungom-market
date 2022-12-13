// 추가할 부분
// 입력 완료 시 저장버튼 활성화
// 상품명 글자 수, 가격 원단위 자동 변환

import {useState, useRef} from 'react'

export default function UploadProduct() {
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
    const fileOnChange = async (e) => {
        const imageFile = e.target.files[0];
        const formData = new FormData();
        formData.append("image", imageFile);

        const response = await fetch("https://mandarin.api.weniv.co.kr/image/uploadfile",{
        method: "POST",
        body: formData
        });
        const json = await response.json()
        const uploadImg = imagePre.current.src = "https://mandarin.api.weniv.co.kr/"+json.filename;
        console.log(uploadImg);
    }

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
        <div>
            <label htmlFor="productImg">
                이미지 등록
                {/* 피그마에 있는 초기 이미지는  */}
                <img src="https://mandarin.api.weniv.co.kr/Ellipse.png" ref={imagePre}/>
            </label>
            <input type="file" id="productImg" name="productImg" accept="image/*" onChange={fileOnChange} />

            <label htmlFor="productName">상품명</label>
            <input type="text" id="productName" name="productName" value={productName} onChange={handleInpName}/>

            <label htmlFor="productPrice">가격</label>
            <input type="number" id="productPrice" name="productPrice" value={productPrice} onChange={handleInpPrice}/>

            <label htmlFor="productLink">판매링크</label>
            <input type="url" id="productLink" name="productLink" value={productLink} onChange={handleInpLink}/>

            <button type='button' onClick={onClickSave}>저장</button>
        </div>
        
    )
}
