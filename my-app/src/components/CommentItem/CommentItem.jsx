import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { CommentItemCont } from "./commentItem.style";
import iconMoreVertical from "../../assets/icon/icon-more-vertical.png";
import { formattedDate } from "../../pages/feed/feed/dateformat";

const BtnIcon = styled.button`
    background: url(${iconMoreVertical});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 24px;
    height: 24px;
`;

export default function CommentItem({ refer, onClickHandle, initialTime }) {
    const [createdAt, setCreatedAt] = useState(initialTime);
    const navigate = useNavigate();

    // 댓글 단 사람의 프로필 클릭 시 그 사람의 프로필로 이동
    function handleClickProfile(){
        navigate("../../account/profile/" + refer.author.accountname);
    }

    // 시간에 따라 렌더링 다르게 하기 위함.
    useEffect(() => {
        if (createdAt.includes("초")) {
            const identifier = setInterval(() => {
                console.log("useeffect - 1");
                setCreatedAt((prev) => {
                    console.log("실행 - 1");
                    return formattedDate(refer.createdAt);;
                });
            }, [1000]);

            return () => clearInterval(identifier);
        } else if (createdAt.includes("분")) {
            const identifier = setInterval(() => {
                console.log("useeffect - 2");
                setCreatedAt((prev) => {
                    console.log("실행 - 2");
                    return formattedDate(refer.createdAt);;
                });
            }, [60000]);

            return () => clearInterval(identifier);
        } else if (createdAt.includes("시간")) {
            const identifier = setInterval(() => {
                console.log("useeffect - 3");
                setCreatedAt((prev) => {
                    console.log("실행 - 3");
                    return formattedDate(refer.createdAt);;
                });
            }, [3600000]);

            return () => clearInterval(identifier);
        }
    }, [createdAt, setCreatedAt, refer.createdAt]);

    return (
        <CommentItemCont>
            <img src={refer.author.image} alt={"댓글 작성자 프로필 사진"} onClick={handleClickProfile}/>
            <h2 onClick={handleClickProfile}>{refer.author.username}</h2>
            <span>{createdAt}</span>
            <p>{refer.content}</p>
            <BtnIcon
                type={"button"}
                onClick={() => {
                    onClickHandle(refer.id, refer.author._id);
                }}
            >
                <span className={"ir"}>댓글 모달창</span>
            </BtnIcon>
        </CommentItemCont>
    );
}
