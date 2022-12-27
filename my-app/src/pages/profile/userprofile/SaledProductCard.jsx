import React from 'react'
import { useEffect, useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { UserNameContext } from "./Profile"

const Cont = styled.div`
        background: #ffffff;
        padding: 20px;
        border: 0.5px solid #DBDBDB;
    `;
    
const Window = styled.div`
    overflow-x: scroll;
    overflow-y: hidden;
    height: 100%;
    
    ::-webkit-scrollbar {
    height: 10px;

  }
  ::-webkit-scrollbar-thumb {
    background-color: #DBDBDB;
    border-radius: 10px;
    background-clip: padding-box;
    border: 1px solid transparent;
    height: 5px;
  }
   
    ::-webkit-scrollbar-track {
    background-color: grey;
    border-radius: 10px;
    box-shadow: inset 1px 1px 2px white;
  }

`;

const SaledProduct = styled.h2`
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 16px;
`;

const Productlist = styled.ul`
    display: flex;
    gap: 10px;
    height: 100%;
    padding-bottom: 20px;
    /* 자동 캐러셀 부분 - 아직 구현 완료 못함 */
    transition: ${(props) => (!props.count ? '' : 'all 0.5s ease-in-out')}; 
    transform: ${(props) => 'translateX(-' + props.count + 'px)'};
`;

const ProductCont = styled.li`
    width: 140px;
    height: 132px;
    flex-shrink: 0;
    list-style: none;
    padding: 10px 0;
`;

const Productimg = styled.img`
    width: 140px;
    height: 90px;
    border-radius: 8px;
`;

const ItemName = styled.h3`
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    margin: 6px 0px;
`;

const ItemPrice = styled.p`
    font-weight: 700;
    font-size: 12px;
    line-height: 15px;
    color: #F26E22;
`;  

const Nextbtn = styled.button`
    width:20px;
    height:20px;
`
export default function SaledProductCard() {

const [productData, setProductData] = useState([]);
const [resMsg, setResMsg] = useState([]);
// const navigate = useNavigate();
//캐러셀 관련 
// const TOTAL_SLIDES = 4;
const [count, setCount] = useState(0);
// const slideRef = useRef(null);
const { username } = useContext(UserNameContext);



//판매중인 상품 데이터를 받아오는 부분입니다.
useEffect(() => {
    const getprofile = async () => {
        const URL = "https://mandarin.api.weniv.co.kr/product/" + username;
      const res = await axios.get(URL, {
        headers: {
          Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTY5MWQwMTdhZTY2NjU4MWMzMjM1YyIsImV4cCI6MTY3NTk5NjE5MywiaWF0IjoxNjcwODEyMTkzfQ.yX_F68SQOJkak0ud8BUTI3OUHriaIlPqEqDUiWBcf6I"
        }
    });
        setResMsg(res.data.product);
    }
    getprofile();
}, [username])

// 판매중인 상품의 링크로 넘어가는 부분입니다.
const handlelink = (link) => {
        window.open("http://" + link, '_blank')
}  

// 상품을 뿌려주는 역할을 하는 부분입니다.
useEffect(() => {
    if (resMsg.length !== 0){
        const products = resMsg.map((item) => (
            <ProductCont onClick={() => handlelink(item.link)} key={item.id}>
                <Productimg src={item.itemImage} alt="상품 이미지"/>
                <ItemName>{item.itemName}</ItemName>
                <ItemPrice>{item.price}원</ItemPrice>
            </ProductCont>
        ));

        setProductData(products);
    }
  }, [resMsg])

  
    //일정 시간이 지나면 캐러셀이 움직이는 부분입니다.
//   useEffect(() => {
//         const timer = setInterval(() => {
//             setCount((prev) => (prev === TOTAL_SLIDES ? 0 : prev + 1));
//         }, 3000);

//         return () => {
//             clearInterval(timer);
//         };
//     }, [count]);

    const a = useRef();
    const [plus, setPlus] = useState(0);


    const handlenext = () => {
        let show_width = (a.current.offsetWidth);
        let all_width = (a.current.scrollWidth);
        console.log(all_width, show_width);
        console.log(plus);
        if((all_width-plus) < show_width){
            setPlus(all_width)
            setCount(all_width-plus);
            console.log("?");
        }else if(plus >= all_width){
            setPlus(0);
            setCount(0);
        }
        else{
            setPlus(plus+show_width);
            console.log(plus);
            setCount(plus);
            
        }
    }

  return (
    <>
    {resMsg.length === 0 ? null:
    <Cont>
    <SaledProduct>판매 중인 상품</SaledProduct>
    <Window>
        <Productlist ref={a} count={count}>
            {productData}
        </Productlist>
    </Window>
    <Nextbtn onClick={handlenext}> &gt; </Nextbtn>
</Cont>
    }
    </>
  )
}
