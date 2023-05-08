/* eslint-disable */
/* eslint-disable array-callback-return */
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import axios from "axios";
import OptionModal from "../optionModal/OptionModal";
import ConfirmModal from "../confirmModal/ConfirmModal";
import Toast from "../toast/Toast";
import heart_active from "../../assets/icon/icon-heart-active.png";
import heart from "../../assets/icon/icon-heart.png";
import comment from "../../assets/icon/icon-message-circle.png";
import errorimg from "../../assets/imageNotFound.png";
import basicprofile from "../../assets/basic-profile-img.png";
import { BASE_URL } from '../../config';
import * as S from "./postCard.style";


export default function PostCard({
    data,
    myProfile,
    view,
    postDetailSrc,
    deleteByUpper,
}) {

    

    const baseUrl = BASE_URL;
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
                `${baseUrl}/post/${data.id}/heart`,
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
                `${baseUrl}/post/${data.id}/unheart`,
                {
                    headers: {
                        Authorization: localStorage.getItem("Authorization"),
                    },
                }
            );
            setMyposthearts(heartfalse.data.post.heartCount);
        };
    };

    const deleteSelectedHandle = () => {
        setIsOptionVisible(false);
        setIsConfirmVisible(true);
    };

    const deleteConfirmedHandle = async () => {
        const URL = `${baseUrl}/post/${data.id}`;
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
        };
    };

    function handleClickProfile() {
        navigate(`../../account/profile/${data.author.accountname}`);
    };

    const handleShowToast = () => {
        toastRef.current.style.transform = "scale(1)";
        setTimeout(function () {
            toastRef.current.style.transform = "scale(0)";
        }, 1500);
        return;
    };

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
            <S.Cont>
                <S.ProfilePicSmall
                    src={data.author.image}
                    onError={profileImgError}
                    onClick={handleClickProfile}
                    alt={`${data.author.username}의 프로필 이미지`}
                />
                <S.ContentCont>
                    <S.HeadCont>
                        <div>
                            <S.Username onClick={handleClickProfile}>
                                {data.author.username}
                            </S.Username>
                            <S.Accountname onClick={handleClickProfile}>
                                @{data.author.accountname}
                            </S.Accountname>
                        </div>
                        {myProfile ? (
                            <S.Plusbutton
                                onClick={() => setIsOptionVisible(true)}
                                aria-label="게시글 수정,삭제 목록"
                            />
                        ) : null}
                    </S.HeadCont>
                    <div onClick={handlepostdetail}>
                        <S.Content>{data.content}</S.Content>
                        {data.image ? (
                            data.image.split(",").length > 1 ? (
                                <S.ImgCont>
                                    {data.image.split(",").map((item) => {
                                        // console.log(data);
                                        return (
                                            <S.Contentimg
                                                src={item}
                                                width="304"
                                                height="228"
                                                key={v4()}
                                                onError={imgerror}
                                                alt={`${data.author.username}의 게시글 이미지`}
                                            />
                                        );
                                    })}
                                </S.ImgCont>
                            ) : (
                                <S.Contentimg
                                    src={data.image}
                                    width="304"
                                    height="228"
                                    onError={imgerror}
                                    alt={`${data.author.username}의 게시글 이미지`}
                                />
                            )
                        ) : null}
                    </div>
                    <S.HeartComment>
                        <span onClick={heartchange}>
                            {myheart ? (
                                <S.HeartCommentCont>
                                    <S.HeartCommentimg
                                        src={heart_active}
                                        alt="채워진 하트"
                                    />
                                    <S.Count>{myposthearts}</S.Count>
                                </S.HeartCommentCont>
                            ) : (
                                <S.HeartCommentCont>
                                    <S.HeartCommentimg
                                        src={heart}
                                        alt="비워진 하트"
                                    />
                                    <S.Count>{myposthearts}</S.Count>
                                </S.HeartCommentCont>
                            )}
                        </span>
                        <Link to={postDetailSrc}>
                            <span className={"ir"}>
                                게시글 상세 페이지로 이동
                            </span>
                            <S.HeartCommentCont>
                                <S.HeartCommentimg
                                    src={comment}
                                    alt="댓글 아이콘"
                                />
                                <S.Count>{data.commentCount}</S.Count>
                            </S.HeartCommentCont>
                        </Link>
                    </S.HeartComment>
                    <S.Createdate>{data.createdAt.slice(0, 10)}</S.Createdate>
                </S.ContentCont>
            </S.Cont>
        </div>
    );
};