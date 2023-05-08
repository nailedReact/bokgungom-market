import React from 'react'
import { useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { UserNameContext } from "./Profile"
import errorimg from "../../../assets/imageNotFound.png";
import {
    Cont,
    Window,
    SaledProduct,
    Productlist,
    ProductCont,
    Productimg,
    ItemName,
    ItemPrice
} from "./saledProductCard.style";
import { BASE_URL } from '../../../config';



export default function SaledProductCard() {
    const baseUrl = BASE_URL;
const [productData, setProductData] = useState([]);
const [resMsg, setResMsg] = useState([]);
const { username } = useContext(UserNameContext);

//판매중인 상품 데이터를 받아오는 부분입니다.
useEffect(() => {
    const getprofile = async () => {
        const URL = `${baseUrl}/product/` + username;
      const res = await axios.get(URL, {
        headers: {
          Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTY5MWQwMTdhZTY2NjU4MWMzMjM1YyIsImV4cCI6MTY3NTk5NjE5MywiaWF0IjoxNjcwODEyMTkzfQ.yX_F68SQOJkak0ud8BUTI3OUHriaIlPqEqDUiWBcf6I"
        }
    });
        setResMsg(res.data.product);
    }
    getprofile();
}, [baseUrl, username])

// 판매중인 상품의 링크로 넘어가는 부분입니다.
const handlelink = (link) => {
        window.open("http://" + link, '_blank')
}  

// 상품을 뿌려주는 역할을 하는 부분입니다.
useEffect(() => {
    if (resMsg.length !== 0){
        const products = resMsg.map((item) => (
            <ProductCont onClick={() => handlelink(item.link)} key={item.id}>
                <Productimg src={item.itemImage} onError={imgerror} alt={`${item.author.username}의 상품 이미지`}/>
                <ItemName>{item.itemName}</ItemName>
                <ItemPrice>{item.price.toLocaleString()}원</ItemPrice>
            </ProductCont>
        ));

        setProductData(products);
    }
  }, [resMsg])

  const imgerror = (e) => {
    e.target.src = errorimg;
    e.target.style.background = "#f2f2f2";
};


    //일정 시간이 지나면 캐러셀이 움직이는 부분입니다.
//   useEffect(() => {
//         const timer = setInterval(() => {
//             setCount((prev) => (prev === TOTAL_SLIDES ? 0 : prev + 1));
//         }, 3000);

//         return () => {
//             clearInterval(timer);
//         };
//     }, [count]);

    // const a = useRef();
    // const [plus, setPlus] = useState(0);


    // const handlenext = () => {
    //     let show_width = (a.current.offsetWidth);
    //     let all_width = (a.current.scrollWidth);
    //     console.log(all_width, show_width);
    //     console.log(plus);
    //     if((all_width-plus) < show_width){
    //         setPlus(all_width)
    //         setCount(all_width-plus);
    //         console.log("?");
    //     }else if(plus >= all_width){
    //         setPlus(0);
    //         setCount(0);
    //     }
    //     else{
    //         setPlus(plus+show_width);
    //         console.log(plus);
    //         setCount(plus);
            
    //     }
    // }

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
    {/* <Nextbtn onClick={handlenext}> &gt; </Nextbtn> */}
</Cont>
    }
    </>
  )
}
