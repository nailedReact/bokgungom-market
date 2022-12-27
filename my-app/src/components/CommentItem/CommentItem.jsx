import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
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

export default function CommentItem({ refer, onClickHandle, initialTimeFormatted, initialTime }) {
    const [createdAt, setCreatedAt] = useState(initialTimeFormatted);
    const navigate = useNavigate();

    const timeRenderHandle = (createdAt, next, timeBase, nextBase = 59) => {
        const parsed = createdAt.length === 4 ? parseInt(createdAt[0], 10) : parseInt(createdAt.slice(0, 2));
        const newTime = parsed + 1;

        if (parsed === nextBase) {
            return next;
        } else {
            return `${newTime}${timeBase} 전`;
        }
    };

    // 댓글 단 사람의 프로필 클릭 시 그 사람의 프로필로 이동
    function handleClickProfile() {
        navigate("../../account/profile/" + refer.author.accountname);
    }

    // 시간에 따라 렌더링 다르게 하기 위함.
    useEffect(() => {
        if (createdAt.includes("초")) {
            const identifier = setInterval(() => {
                setCreatedAt((prev) => {
                   return timeRenderHandle(createdAt, "1분 전", "초");
                });
            }, [1000]);

            return () => clearInterval(identifier);
        } else if (createdAt.includes("분")) {
            const identifier = setInterval(() => {
                setCreatedAt((prev) => {
                    return timeRenderHandle(createdAt, "1시간 전", "분");
                });
            }, [60000]);

            return () => clearInterval(identifier);
        } else if (createdAt.includes("시간")) {
            const identifier = setInterval(() => {
                setCreatedAt((prev) => {
                    return timeRenderHandle(createdAt, formattedDate(initialTime), "시간", 23);
                });
            }, [3600000]);

            return () => clearInterval(identifier);
        } else {
            return;
        }
    }, [createdAt, setCreatedAt, refer.createdAt, initialTime]);

    return (
        <CommentItemCont>
            <img
                className="comment-profile-img"
                src={refer.author.image}
                alt={"댓글 작성자 프로필 사진"}
                onClick={handleClickProfile}
            />
            <div className="comment-main">
                <h2 onClick={handleClickProfile}>{refer.author.username}</h2>
                <span>{`· ${createdAt}`}</span>
                <p>{refer.content}</p>
            </div>
            <BtnIcon
                className="comment-more-btn"
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
