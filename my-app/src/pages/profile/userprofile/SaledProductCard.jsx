import { useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { UserNameContext } from "./Profile";
import errorimg from "../../../assets/imageNotFound.png";
import { Cont, Window, SaledProduct, Productlist, ProductCont, Productimg, ItemName, ItemPrice } from "./saledProductCard.style";
import { BASE_URL } from '../../../config';

export default function SaledProductCard() {
    const baseUrl = BASE_URL;
    const [productData, setProductData] = useState([]);
    const [resMsg, setResMsg] = useState([]);
    const { username } = useContext(UserNameContext);

    // 판매중인 상품 데이터를 받아오는 부분입니다.
    useEffect(() => {
        const getprofile = async () => {
            const URL = `${baseUrl}/product/` + username;
        const res = await axios.get(URL, {
            headers: {
                Authorization : localStorage.getItem("Authorization")
            }
        });
            setResMsg(res.data.product);
        }
        getprofile();
    }, [baseUrl, username])

    // 판매중인 상품의 링크로 넘어가는 부분입니다.
    const handlelink = (link) => {
            window.open("http://" + link, '_blank')
    };

    // 상품 삭제
    const handleDelete = async (productId) => {
        try {
            const url = `${baseUrl}/product/${productId}`;
            const userToken = localStorage.getItem("Authorization");
            await axios.delete(
                url,
                {
                    headers: {
                        Authorization: userToken
                    }
                }
            );
            setResMsg((prev) => 
                prev.filter((item) => item.id !== productId)
            )
        } catch (error) {
            console.log(error);
        };
    };

    // 상품을 뿌려주는 역할을 하는 부분입니다.
    useEffect(() => {
        if (resMsg.length !== 0){
            const products = resMsg.map((item) => (
                <ProductCont key={item.id}>
                    <button 
                        onClick={() => {
                            handleDelete(item.id);
                        }}
                        className="delete_btn"
                        aria-label="삭제버튼"
                    />
                    <Productimg 
                        src={item.itemImage} 
                        onError={imgerror} 
                        alt={`${item.author.username}의 상품 이미지`}
                        onClick={() => handlelink(item.link)} 
                    />
                    <ItemName>{item.itemName}</ItemName>
                    <ItemPrice>{item.price.toLocaleString()}원</ItemPrice>
                </ProductCont>
            ));
            setProductData(products);
        };
    }, [resMsg])

    const imgerror = (e) => {
        e.target.src = errorimg;
        e.target.style.background = "#f2f2f2";
    };

  return (
    <>
        {resMsg.length === 0 ? null:
            <Cont>
                <SaledProduct>판매 중인 상품</SaledProduct>
                <Window>
                    <Productlist>
                        {productData}
                    </Productlist>
                </Window>
            </Cont>
        }
    </>
  )
}
