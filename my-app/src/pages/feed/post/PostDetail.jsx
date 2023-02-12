import React, {
    useEffect,
    useState,
    useRef,
    useCallback,
    useMemo,
} from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import TopBar from "../../../components/topbar/TopBar";
import PostCard from "../../../components/postView/PostCard";
import CommentItem from "../../../components/commentItem/CommentItem";
import CommentInp from "../../../components/commentInp/CommentInp";
import CommentOptionModal from "./CommentOptionModal";
import PostOptionModal from "./PostOptionModal";
import ConfirmModal from "../../../components/confirmModal/ConfirmModal";
import Toast from "../../../components/toast/Toast";
import { formattedDate } from "../dateformat";
import useAuth from "../../../hook/useAuth";
import usePostDetail from "../../../hook/usePostDetail";
import Button from "../../../components/button/Button";
import basicImg from "../../../assets/basic-profile-img.png";
import {
    CommentListBox,
    PostContentBox,
    More,
    UserProfilePic
} from "./post.share.style";

export default function PostDetail() {
    const [postMsg, setPostMsg] = useState();
    const [commentMsg, setCommentMsg] = useState([]);
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);
    const [commentModal, setCommentModal] = useState({isMe: undefined, isOpen: false});
    const [postModal, setPostModal] = useState({isMe: undefined, isOpen: false});
    const [deleteConfirmModal, setDeleteConfirmModal] = useState({target: undefined, isOpen: false});
    const [noComment, setNoComment] = useState(true);
    const [noComment2, setNoComment2] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    const currentUserId = useRef();
    const inpRef = useRef(null);
    const deleteTarget = useRef(null);
    const orderedComments = useRef();
    const toastRef = useRef(null);
    const userIdRef = useRef();

    const reacts = useMemo(() => {
        return { setPostMsg, id, currentUserId };
    }, [id, currentUserId]);

    const data = useAuth();

    useEffect(() => {
        if (data) {
            userIdRef.current = data._id;
        }
    }, [data]);

    const sendRequest = usePostDetail(reacts);

    const baseURL =
        "https://mandarin.api.weniv.co.kr/post/" +
        id +
        "/comments" +
        "?limit=infinity&skip=0";

    const commentClickHandle = useCallback(
        (deleteComment, commentAuthor) => {
            if (commentAuthor === userIdRef.current) {
                setCommentModal((prev) => ({...prev, isMe: true, isOpen: true}));
                deleteTarget.current = deleteComment;
            } else {
                setCommentModal((prev) => ({...prev, isMe: false, isOpen: true}));
            }
        },
        [userIdRef]
    );

    const recentSortHandle = useCallback((arr) => {
        if (arr) {
            return [...arr].reverse();
        } else {
            return;
        }
    }, []);

    const loadHandle = (sortedArr, isPreviousLoading) => {
        if (sortedArr) {
            const sliced = isPreviousLoading
                ? sortedArr.splice(-10, 10)
                : sortedArr.splice(0, 10);
            return sliced;
        } else {
            return;
        }
    };

    const initialDataSet = useCallback(
        (commentRes) => {
            if (commentRes.data.comments) {
                if (commentRes.data.comments.length <= 10) {
                    setNoComment(false);
                }

                orderedComments.current = recentSortHandle(
                    commentRes.data.comments
                );

                const currentRenderTarget = loadHandle(
                    orderedComments.current,
                    false
                );

                const comments = currentRenderTarget.map((e) => {
                    return (
                        <CommentItem
                            key={e.id}
                            refer={e}
                            onClickHandle={commentClickHandle}
                            initialTimeFormatted={formattedDate(e.createdAt)}
                            initialTime={e.createdAt}
                        />
                    );
                });

                setCommentMsg(comments);
            }
        },
        [recentSortHandle, commentClickHandle]
    );

    const commentEditRenderHandle = useCallback(
        (commentRes, _, isInput) => {
            if (commentRes.data.comments) {
                if (commentRes.data.comments.length > 10) {
                    if (isInput) {
                        setNoComment2(true);
                        setNoComment(false);
                    } else {
                        setNoComment2(false);
                        setNoComment(true);
                    }
                } else {
                    setNoComment(false);
                    setNoComment2(false);
                }

                orderedComments.current = recentSortHandle(
                    commentRes.data.comments
                );

                const currentRenderTarget = isInput
                    ? loadHandle(orderedComments.current, true)
                    : loadHandle(orderedComments.current, false);

                const comments = currentRenderTarget.map((e) => {
                    return (
                        <CommentItem
                            key={e.id}
                            refer={e}
                            onClickHandle={commentClickHandle}
                            initialTimeFormatted={formattedDate(e.createdAt)}
                            initialTime={e.createdAt}
                        />
                    );
                });

                setCommentMsg(comments);
            }
        },
        [recentSortHandle, commentClickHandle]
    );

    const onInpChangeHandle = (e) => {
        if (e.target.value.trim().length === 0 || e.target.value.length === 0) {
            setIsBtnDisabled(true);
        } else {
            setIsBtnDisabled(false);
        }
    };

    const onCommentSubmitHandle = async (e) => {
        e.preventDefault();
        try {
            const URL =
                "https://mandarin.api.weniv.co.kr/post/" +
                id +
                "/comments";
            await axios.post(
                URL,
                {
                    comment: {
                        content: inpRef.current.value,
                    },
                },
                {
                    headers: {
                        Authorization: localStorage.getItem("Authorization"),
                        "Content-type": "application/json",
                    },
                }
            );

            sendRequest(baseURL, commentEditRenderHandle, true);

            inpRef.current.value = "";
            setIsBtnDisabled(true);
        } catch (err) {
            console.log(err);
        }
    };

    const handleMoreComment = (isPreviousLoading = false) => {
        const currentRenderTarget = loadHandle(
            orderedComments.current,
            isPreviousLoading
        );

        if (orderedComments.current.length === 0) {
            isPreviousLoading ? setNoComment2(false) : setNoComment(false);
        }

        const comments = currentRenderTarget.map((e) => {
            return (
                <CommentItem
                    key={e.id}
                    refer={e}
                    onClickHandle={commentClickHandle}
                    initialTimeFormatted={formattedDate(e.createdAt)}
                    initialTime={e.createdAt}
                />
            );
        });

        setCommentMsg((prev) =>
            isPreviousLoading ? [comments, ...prev] : [...prev, comments]
        );
    };

    const deleteCommentSelectedFunc = () => {
        setCommentModal((prev) => ({...prev, isMe: undefined, isOpen: false}));
        setDeleteConfirmModal((prev) => ({...prev, target: "comment", isOpen: true}));
    };

    const reportCommentSelectedFunc = () => {
        window.alert("댓글이 신고되었습니다.");
        setCommentModal((prev) => ({...prev, isMe: undefined, isOpen: false}));
    };

    const deletePostSelectedFunc = () => {
        setPostModal((prev) => ({...prev, isMe: undefined, isOpen: false}));
        setDeleteConfirmModal((prev) => ({...prev, target: "post", isOpen: true}));
    };

    const reportPostSelectedFunc = () => {
        window.alert("게시글이 신고되었습니다.");
        setPostModal((prev) => ({...prev, isMe: undefined, isOpen: false}));
    };

    const handleShowToast = () => {
        toastRef.current.style.transform = "scale(1)";
        setTimeout(function () {
            toastRef.current.style.transform = "scale(0)";
        }, 1500);
        return;
    };

    const deleteCommentFunc = async () => {
        const URL =
            "https://mandarin.api.weniv.co.kr/post/" +
            id +
            "/comments/" +
            deleteTarget.current;
        try {
            await axios.delete(URL, {
                headers: {
                    Authorization: localStorage.getItem("Authorization"),
                    "Content-type": "application/json",
                },
            });

            orderedComments.current.length === 0
                ? setNoComment(false)
                : setNoComment(true);

            sendRequest(baseURL, commentEditRenderHandle, false);

            setDeleteConfirmModal((prev) => ({...prev, target: undefined, isOpen: false}));
            setCommentModal((prev) => ({...prev, isMe: undefined, isOpen: false}));
        } catch (err) {
            console.log(err);
        }
    };

    const deletePostFunc = async () => {
        const URL = `https://mandarin.api.weniv.co.kr/post/${id}`;
        try {
            await axios.delete(URL, {
                headers: {
                    Authorization: localStorage.getItem("Authorization"),
                    "Content-type": "application/json",
                },
            });

            setDeleteConfirmModal((prev) => ({...prev, target: undefined, isOpen: false}));

            handleShowToast();
            setTimeout(function () {
                navigate(-1);
            }, 1500);
        } catch (err) {
            console.log(err);
        }
    };

    const postDetailModalHandle = () => {
        if (currentUserId.current === userIdRef.current) {
            setPostModal((prev) => ({...prev, isMe: true, isOpen: true}));
        } else {
            setPostModal((prev) => ({...prev, isMe: false, isOpen: true}));
        }
    };

    useEffect(() => {
        sendRequest(baseURL, initialDataSet, false);
    }, [id, initialDataSet, sendRequest, baseURL]);

    return (
        <>
            <CommentOptionModal 
                commentState={commentModal}
                setCommentState={setCommentModal}
                deleteTarget={deleteTarget}
                clickHandle={commentModal.isMe ? deleteCommentSelectedFunc : reportCommentSelectedFunc}
            />
            <PostOptionModal 
                postState={postModal}
                setPostState={setPostModal}
                clickHandle={postModal.isMe ? deletePostSelectedFunc : reportPostSelectedFunc}
                postDetailId={id}
            />
            {deleteConfirmModal.isOpen && (
                <ConfirmModal
                    confirmMsg={"삭제하시겠습니까?"}
                    onCancle={() => setDeleteConfirmModal((prev) => ({...prev, target: undefined, isOpen: false}))}
                    onConfirm={() => setDeleteConfirmModal((prev) => ({...prev, target: undefined, isOpen: false}))}
                    buttonRight={
                        <button type="button" onClick={deleteConfirmModal.target === "comment" ? deleteCommentFunc : deletePostFunc}>
                            삭제
                        </button>
                    }
                />
            )}
            <TopBar type={"A1"} onClickModal={postDetailModalHandle} />
            <Toast ref={toastRef} msg="게시물이 삭제 되었습니다!" />
            {postMsg && (
                <PostContentBox>
                    <PostCard data={postMsg} />
                </PostContentBox>
            )}
            {commentMsg && (
                <CommentListBox>
                    <More>
                        <Button
                            className="small"
                            onClick={() => handleMoreComment(true)}
                            style={{
                                display: noComment2 ? "block" : "none",
                                margin: "0 auto",
                            }}
                        >
                            + 이전 댓글 보기
                        </Button>
                    </More>
                    {commentMsg}
                    <More>
                        <Button
                            className="small"
                            onClick={() => handleMoreComment(false)}
                            style={{
                                display: noComment ? "block" : "none",
                                margin: "0 auto",
                            }}
                        >
                            + 댓글 더보기
                        </Button>
                    </More>
                </CommentListBox>
            )}
            <CommentInp
                onSubmit={onCommentSubmitHandle}
                isBtnActivated={!isBtnDisabled}
            >
                {postMsg && (
                    <UserProfilePic
                        src={data ? data.image : basicImg}
                        alt={"작성자 프로필 사진"}
                    />
                )}
                <input
                    ref={inpRef}
                    placeholder={"댓글 입력하기..."}
                    onChange={onInpChangeHandle}
                />
                <button type={"submit"} disabled={isBtnDisabled}>
                    게시
                </button>
            </CommentInp>
        </>
    );
}
