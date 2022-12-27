import ReactDOM from "react-dom";
import styled from "styled-components";
import { forwardRef } from "react";

const Cont = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    position: absolute;
    right: 50px;
    top: 50px;
    padding: 12px 20px;
    /* font-size: 14px; */
    font-weight: 300;
    /* border: 1px solid var(--color-primary); */
    /* outline: 1px solid white; */
    border-radius: 5px;
    transition: all .2s;
    transform: scale(0);
    z-index: 20;
`
const CloseBtn = styled.button`
    font-family: "Pretendard";
    background: rgba(255, 255, 255, 0.3);
    color: white;
    border: 0.5px solid white;
    border-radius: 2px;
    font-weight: 700;
    padding: 0px 4px;
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
