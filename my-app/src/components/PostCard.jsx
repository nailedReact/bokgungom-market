/* eslint-disable */
/* eslint-disable array-callback-return */

import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import OptionModal from "./OptionModal/OptionModal";
import ConfirmModal from "./ConfirmModal/ConfirmModal";
import heart_active from "../assets/icon/icon-heart-active.png";
import heart from "../assets/icon/icon-heart.png";
import comment from "../assets/icon/icon-message-circle.png";
import styled from "styled-components";
import axios from "axios";
import plusimg from "../assets/icon/icon-more-vertical.png";

const Cont = styled.div`
    display: flex;
    padding: 20px;
    justify-content: center;
    background-color: white;
    border-bottom: 0.5px solid #DBDBDB;
`;

const Username = styled.h2`
    font-weight: 500;
    font-size: 14px;
    @media screen and (min-width: 768px){
        font-size: 16px;
    }
`;

const Accountname = styled.p`
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #767676;
    margin-top: 2px;
    @media screen and (min-width: 768px){
        font-size: 14px;
    }
`;

const Content = styled.p`
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    margin-top: 16px;
`;

const Contentimg = styled.img`
    width: 100%;
    display: block;
    /* height: 228px; */
    border: 0.5px solid #dbdbdb;
    border-radius: 10px;
    margin-top: 16px;
`;

const ContentCont = styled.div`
    width: 304px;
    @media screen and (min-width: 768px){
        width: 400px;
    }
`;

const Count = styled.span`
    font-weight: 400;
    font-size: 12px;
    color: #767676;
    margin-left: 7px;
    @media screen and (min-width: 768px){
        font-size: 14px;
    }
`;
const HeartComment = styled.div`
    display: flex;
    align-items: center;
    margin: 6px 0;
`
const HeartCommentCont = styled.div`
    display: flex;
    align-items: center;
    margin-right: 16px;
`;
const HeartCommentimg = styled.img`
    width: 15px;
    height: 15px;
    @media screen and (min-width: 768px){
        width: 18px;
        height: 18px;
    }
`;

const Createdate = styled.span`
    font-weight: 400;
    font-size: 10px;
    color: #767676;
    @media screen and (min-width: 768px){
        font-size: 12px;
    }
`;
const ProfilePicSmall = styled.img`
    width: 42px;
    height: 42px;
    margin-right: 12px;
    border-radius: 50%;
    object-fit: cover;
    border: 0.5px solid #C4C4C4;
    @media screen and (min-width: 768px){
        margin-right: 16px;
    }
`;

const Plusbutton = styled.button`
    background-image: url(${plusimg});
    width: 25px;
    height: 25px;
    background-color: inherit;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`

const HeadCont = styled.div`
    display: flex;
    justify-content: space-between;
`

export default function PostCard({
    data,
    myProfile,
    view,
    postDetailSrc,
    deleteByUpper,
}) {
    const [myheart, setMyheart] = useState(data.hearted);
    const [myposthearts, setMyposthearts] = useState(data.heartCount);
    const navigate = useNavigate();
    const [isOptionVisible, setIsOptionVisible] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    // 포스트카드를 눌렀을 때 포스트디테일로 넘어가는 부분입니다.
    const handlepostdetail = () => {
        navigate(`/post/${data.id}`);
    }

    //하트를 누르면 서버에 통신하는 부분입니다.
    const heartchange = async () => {
        if (myheart === false) {
            setMyheart(true);
            const hearttrue = await axios.post(
                `https://mandarin.api.weniv.co.kr/post/${data.id}/heart`,
                {},
                {
                    headers: {
                        // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTY5MWQwMTdhZTY2NjU4MWMzMjM1YyIsImV4cCI6MTY3NTk5NjE5MywiaWF0IjoxNjcwODEyMTkzfQ.yX_F68SQOJkak0ud8BUTI3OUHriaIlPqEqDUiWBcf6I"
                        Authorization: localStorage.getItem("Authorization"),
                    },
                }
            );
            setMyposthearts(hearttrue.data.post.heartCount);
        } else {
            setMyheart(false);
            const heartfalse = await axios.delete(
                `https://mandarin.api.weniv.co.kr/post/${data.id}/unheart`,
                {
                    headers: {
                        // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTY5MWQwMTdhZTY2NjU4MWMzMjM1YyIsImV4cCI6MTY3NTk5NjE5MywiaWF0IjoxNjcwODEyMTkzfQ.yX_F68SQOJkak0ud8BUTI3OUHriaIlPqEqDUiWBcf6I"
                        Authorization: localStorage.getItem("Authorization"),
                    },
                }
            );
            setMyposthearts(heartfalse.data.post.heartCount);
        }
    };

    const deleteSelectedHandle = () => {
        setIsOptionVisible(false);
        setIsConfirmVisible(true);
    };

    const deleteConfirmedHandle = async () => {
        const URL = `https://mandarin.api.weniv.co.kr/post/${data.id}`;
        try {
            const res = await axios.delete(URL, {
                headers: {
                    Authorization: localStorage.getItem("Authorization"),
                    "Content-type": "application/json",
                }
            });
            console.log(res.data);
            setIsConfirmVisible(false);
            setIsDeleted(true);
        } catch (err) {
            console.log(err);
        }
    };
 
    function handleClickProfile(){
        navigate(`../../account/profile/${data.author.accountname}`);
    }

    return (
        <div>
            {isOptionVisible && (
                <OptionModal onConfirm={() => setIsOptionVisible(false)}>
                    <li>
                        <button type="button" onClick={deleteSelectedHandle}>
                            삭제
                        </button>
                    </li>
                    <li>
                        <Link to={`/post/${data.id}/edit`}>수정</Link>
                    </li>
                </OptionModal>
            )}
            {isConfirmVisible && (
                <ConfirmModal
                    confirmMsg={"삭제하시겠습니까?"}
                    onCancle={() => setIsConfirmVisible(false)}
                    onConfirm={() => setIsConfirmVisible(false)}
                    buttonRight={
                        <button type="button" onClick={deleteConfirmedHandle}>
                            삭제
                        </button>
                    }
                />
            )}
            {!isDeleted && (
                <Cont>
                    <ProfilePicSmall
                        src={data.author.image}
                        alt="글쓴이프로필사진"
                        onClick={handleClickProfile}
                    />
                    <ContentCont>
                        <HeadCont>
                            <div>
                                <Username onClick={handleClickProfile}>{data.author.username}</Username>
                                <Accountname onClick={handleClickProfile}>@{data.author.accountname}</Accountname>
                            </div>
                            {myProfile ? <Plusbutton onClick={() => setIsOptionVisible(true)}/> : null}
                        </HeadCont>
                        <div onClick={handlepostdetail}>
                            <Content>{data.content}</Content>
                            {data.image ? (
                                <Contentimg src={data.image} alt="컨텐츠 사진" />
                            ) : null}
                        </div >
                        <HeartComment>
                            <span onClick={heartchange}>
                                {myheart ? (
                                    <HeartCommentCont>
                                        <HeartCommentimg
                                            src={heart_active}
                                            alt="채워진 하트"
                                        />
                                        <Count>{myposthearts}</Count>
                                    </HeartCommentCont>
                                ) : (
                                    <HeartCommentCont>
                                        <HeartCommentimg
                                            src={heart}
                                            alt="비워진 하트"
                                        />
                                        <Count>{myposthearts}</Count>
                                    </HeartCommentCont>
                                )}
                            </span>
                            <Link to={postDetailSrc}>
                                <span className={"ir"}>
                                    게시글 상세 페이지로 이동
                                </span>
                                <HeartCommentCont>
                                    <HeartCommentimg src={comment} alt="댓글 아이콘" />
                                    <Count>{data.commentCount}</Count>
                                </HeartCommentCont>
                            </Link>
                        </HeartComment>
                        <Createdate>{data.createdAt.slice(0, 10)}</Createdate>
                    </ContentCont>
                </Cont>
            )}
        </div>
    )
                                }