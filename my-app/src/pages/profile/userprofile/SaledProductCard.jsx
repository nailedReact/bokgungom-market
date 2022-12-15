import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

export default function SaledProductCard() {
    
    const Cont = styled.div`
        background: #ffffff;
        padding: 20px;
        border: 0.5px solid #DBDBDB;
    `;
    
    const Window = styled.div`
        overflow: hidden;
        height: 140px;
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
        /* 자동 캐러셀 부분 - 아직 구현 완료 못함 */
        transition: ${(props) => (!props.count ? '' : 'all 0.5s ease-in-out')};
        transform: ${(props) => 'translateX(-' + props.count * 140 + 'px)'};
    `;

    const ProductCont = styled.li`
        width: 140px;
        height: 132px;
        flex-shrink: 0;
        list-style: none;
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

const [productData, setProductData] = useState([]);
const [resMsg, setResMsg] = useState([]);
const navigate = useNavigate();
//캐러셀 관련 
const TOTAL_SLIDES = 4;
const [count, setCount] = useState(0);
const slideRef = useRef(null);

//판매중인 상품 데이터를 받아오는 부분입니다.
useEffect(() => {
    const getprofile = async () => {
      const res = await axios.get('https://mandarin.api.weniv.co.kr/product/hyejee', {
        headers: {
          Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTY5MWQwMTdhZTY2NjU4MWMzMjM1YyIsImV4cCI6MTY3NTk5NjE5MywiaWF0IjoxNjcwODEyMTkzfQ.yX_F68SQOJkak0ud8BUTI3OUHriaIlPqEqDUiWBcf6I"
        }
    });
        console.log(res.data.product);
        setResMsg(res.data.product);
    }
    getprofile();
}, [])

// 판매중인 상품의 링크로 넘어가는 부분입니다.
const handlelink = (link) => {
        navigate(link);
    }  

// 상품을 뿌려주는 역할을 하는 부분입니다.
useEffect(() => {
    if (resMsg.length !== 0){
        resMsg.forEach((item) => {
            setProductData((productData) => {
            return [...productData, 
            <ProductCont onClick={() => handlelink(item.link)}>
                <Productimg src={item.itemImage} alt="상품 이미지"/>
                <ItemName>{item.itemName}</ItemName>
                <ItemPrice>{item.price}원</ItemPrice>
            </ProductCont>
            ];
          })
      })
    }
  }, [resMsg])

  
    //일정 시간이 지나면 캐러셀이 움직이는 부분입니다.
  useEffect(() => {
        const timer = setInterval(() => {
            setCount((prev) => (prev === TOTAL_SLIDES ? 0 : prev + 1));
        }, 3000);

        return () => {
            clearInterval(timer);
        };
    }, [count]);

  return (
    <Cont>
        <SaledProduct>판매 중인 상품</SaledProduct>
        <Window>
            <Productlist ref={slideRef} count={count}>
                {productData}
            </Productlist>
        </Window>
    </Cont>
  )
}
