/* eslint-disable */
/* eslint-disable array-callback-return */

import React from "react";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import OptionModal from "./OptionModal/OptionModal";
import ConfirmModal from "./ConfirmModal/ConfirmModal";
import heart_active from "../assets/icon/icon-heart-active.png";
import heart from "../assets/icon/icon-heart.png";
import comment from "../assets/icon/icon-message-circle.png";
import styled from "styled-components";
import axios from "axios";
import plusimg from "../assets/icon/icon-more-vertical.png";
import Toast from "./Toast";
import { v4 } from "uuid";
import errorimg from "../assets/imageNotFound.png";
import basicprofile from "../assets/basic-profile-img.png";

const Cont = styled.div`
    display: flex;
    padding: 20px;
    justify-content: center;
    background-color: white;
    border-bottom: 0.5px solid #dbdbdb;
`;

const Username = styled.h2`
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    @media screen and (min-width: 768px) {
        font-size: 16px;
    }
`;

const Accountname = styled.p`
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #767676;
    margin-top: 2px;
    cursor: pointer;
    @media screen and (min-width: 768px) {
        font-size: 14px;
    }
`;

const Content = styled.p`
    width: 100%;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    margin-top: 16px;
    white-space: pre-wrap;
    word-break: break-all;
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
    @media screen and (min-width: 768px) {
        width: 400px;
    }
`;

const Count = styled.span`
    font-weight: 400;
    font-size: 12px;
    color: #767676;
    margin-left: 7px;
    @media screen and (min-width: 768px) {
        font-size: 14px;
    }
`;
const HeartComment = styled.div`
    display: flex;
    align-items: center;
    margin: 6px 0;
`;
const HeartCommentCont = styled.div`
    display: flex;
    align-items: center;
    margin-right: 16px;
    cursor: pointer;
`;
const HeartCommentimg = styled.img`
    width: 15px;
    height: 15px;
    @media screen and (min-width: 768px) {
        width: 18px;
        height: 18px;
    }
`;

const Createdate = styled.span`
    font-weight: 400;
    font-size: 10px;
    color: #767676;
    @media screen and (min-width: 768px) {
        font-size: 12px;
    }
`;
const ProfilePicSmall = styled.img`
    width: 42px;
    height: 42px;
    margin-right: 12px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #c4c4c4;
    @media screen and (min-width: 768px) {
        margin-right: 16px;
    }
    cursor: pointer;
`;

const Plusbutton = styled.button`
    background-image: url(${plusimg});
    width: 25px;
    height: 25px;
    background-color: inherit;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`;

const HeadCont = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ImgCont = styled.div`
    display: flex;
    overflow-x: scroll;
    ::-webkit-scrollbar {
        height: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: rgb(125, 125, 125);
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
    const toastRef = useRef(null);

    // 포스트카드를 눌렀을 때 포스트디테일로 넘어가는 부분입니다.
    const handlepostdetail = () => {
        navigate(`/post/${data.id}`);
    };

    //하트를 누르면 서버에 통신하는 부분입니다.
    const heartchange = async () => {
        if (myheart === false) {
            setMyheart(true);
            const hearttrue = await axios.post(
                `https://mandarin.api.weniv.co.kr/post/${data.id}/heart`,
                {},
                {
                    headers: {
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
                },
            });
            setIsConfirmVisible(false);
            handleShowToast();
            // setTimeout(function () {
            //     navigate(-1); // 뒤로 가기
            // }, 1500);
            deleteByUpper(data.id);
        } catch (err) {
            console.log(err);
        }
    };

    function handleClickProfile() {
        navigate(`../../account/profile/${data.author.accountname}`);
    }
    const handleShowToast = () => {
        toastRef.current.style.transform = "scale(1)";
        setTimeout(function () {
            toastRef.current.style.transform = "scale(0)";
        }, 1500);
        return;
    };

    const contentimg = useRef();

    const imgerror = (e) => {
        e.target.src = errorimg;
        e.target.style.padding = "60px";
        e.target.style.background = "#f2f2f2";
    };
    const profileImgError = (e) => {
        e.target.src = basicprofile;
    };
    return (
        <div>
            <Toast ref={toastRef} msg="게시물이 삭제 되었습니다!" />
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
            <Cont>
                <ProfilePicSmall
                    src={data.author.image}
                    alt="글쓴이프로필사진"
                    onError={profileImgError}
                    onClick={handleClickProfile}
                />
                <ContentCont>
                    <HeadCont>
                        <div>
                            <Username onClick={handleClickProfile}>
                                {data.author.username}
                            </Username>
                            <Accountname onClick={handleClickProfile}>
                                @{data.author.accountname}
                            </Accountname>
                        </div>
                        {myProfile ? (
                            <Plusbutton
                                onClick={() => setIsOptionVisible(true)}
                            />
                        ) : null}
                    </HeadCont>
                    <div onClick={handlepostdetail}>
                        <Content>{data.content}</Content>
                        {data.image ? (
                            data.image.split(",").length > 1 ? (
                                <ImgCont>
                                    {data.image.split(",").map((item) => {
                                        return (
                                            <Contentimg
                                                ref={contentimg}
                                                src={item}
                                                key={v4()}
                                                onError={imgerror}
                                            />
                                        );
                                    })}
                                </ImgCont>
                            ) : (
                                <Contentimg
                                    src={data.image}
                                    onError={imgerror}
                                />
                            )
                        ) : null}
                    </div>
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
                                <HeartCommentimg
                                    src={comment}
                                    alt="댓글 아이콘"
                                />
                                <Count>{data.commentCount}</Count>
                            </HeartCommentCont>
                        </Link>
                    </HeartComment>
                    <Createdate>{data.createdAt.slice(0, 10)}</Createdate>
                </ContentCont>
            </Cont>
        </div>
    );
}
