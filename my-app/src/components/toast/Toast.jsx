import ReactDOM from "react-dom";
import styled from "styled-components";
import { forwardRef } from "react";

const Cont = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    background-color: white;
    position: absolute;
    right: 50px;
    top: 50px;
    padding: 12px 20px;
    border-left: 5px solid var(--color-primary);
    outline: 1px solid #C2C2C2;
    transition: all .2s;
    transform: scale(0);
    z-index: 20;
    @media screen and (max-width: 768px){
        right: 20px;
        top: 20px;
    }
`
const CloseBtn = styled.button`
    font-family: "Pretendard";
    background: none;
    color: #C2C2C2;
    border: 0.5px solid white;
    border-radius: 2px;
    font-weight: 500;
    padding: 0px 4px;
    font-size: 18px;
`
const Toast = forwardRef((props, ref) => {
    const handleCloseToast = (e) => {
        e.target.parentElement.style.transform = "scale(0)";
    }
    return (
        <>
        {ReactDOM.createPortal(
                <Cont ref={ref}>
                    {props.msg + " "}
                <CloseBtn onClick={handleCloseToast}>X</CloseBtn>
                </Cont>
                ,
                document.getElementById("modal-root")
            )}
        </>
    )
})

export default Toast;
