import styled from "styled-components";

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
        background-color: rgb(106,106,106);
        border-radius: 10px;
        background-clip: padding-box;
        border: 1px solid transparent;
        height: 5px;
    }
    
        ::-webkit-scrollbar-track {
        background-color: transparent;
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
    object-fit: cover;
    border: 0.5px solid #dbdbdb;
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
    color: #3F7D9C;
`;  

export {
    Cont,
    Window,
    SaledProduct,
    Productlist,
    ProductCont,
    Productimg,
    ItemName,
    ItemPrice
}