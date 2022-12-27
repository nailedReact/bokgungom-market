import React, {
    useEffect,
    useState,
    useRef,
    useCallback,
    useMemo,
} from "react";
import { useLocation } from "react-router";
import axios from "axios";
import styled from "styled-components";
import TopBar from "../../components/TopBar";
import PostCard from "../../components/PostCard";
import CommentItem from "../../components/CommentItem/CommentItem";
import CommentInp from "../../components/CommentInp/CommentInp";
import OptionModal from "../../components/OptionModal/OptionModal";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import { formattedDate } from "./feed/dateformat";
import useAuth1 from "../../hook/useAuth1";
import usePostDetail from "../../hook/usePostDetail";
import basicImg from "../../assets/basic-profile-img.png";
import Button from "../../components/Button";

const CommentListBox = styled.ul`
    /* border-top: 1px solid #dbdbdb; */
    padding: 20px 16px 80.5px 16px;
    @media screen and (min-width: 768px) {
        padding: 20px;
        margin-bottom: 60px;
    }
`;

const PostContentBox = styled.div`
    padding: 20px 16px;
`;

const More = styled.div`
    text-align: center;
`;
export default function PostDetail() {
    const [postMsg, setPostMsg] = useState(); // 상세 게시글 API 응답 데이터 받아오는 곳
    const [commentMsg, setCommentMsg] = useState([]); // 댓글 API 응답 데이터 받아오는 곳
    const [isBtnDisabled, setIsBtnDisabled] = useState(true); // 댓글 작성 버튼 disabled 여부(초기값: true => 보이지 않음)
    const [modalNotMe, setModalNotMe] = useState(false); // 내가 작성한 댓글이 아닌 경우 - more 버튼 클릭시 보이는 모달창 보이는지 여부
    const [modalMe, setModalMe] = useState(false); // 내가 작성한 댓글인 경우 - more 버튼 클릭시 보이는 모달창 보이는지 여부
    const [deleteConfirm, setDeleteConfirm] = useState(false); // 삭제 여부를 선택하는 모달창이 보이는지 여부
    const [noComment, setNoComment] = useState(true);
    const [noComment2, setNoComment2] = useState(false);

    const currentId = useLocation().pathname.split("/")[2]; // 현재 상세 게시글의 id

    const inpRef = useRef(null); // 댓글 입력 input
    const deleteTarget = useRef(null); // 삭제할 댓글 id
    const orderedComments = useRef();

    const reacts = useMemo(() => {
        return { setPostMsg, currentId };
    }, [currentId]);

    const { data, userIdRef } = useAuth1();
    const sendRequest = usePostDetail(reacts);

    const baseURL =
        "https://mandarin.api.weniv.co.kr/post/" +
        currentId +
        "/comments" +
        "?limit=infinity&skip=0";

    // 댓글의 more 버튼 클릭시 동작하는 함수
    const onClickHandle = useCallback(
        (deleteComment, commentAuthor) => {
            if (commentAuthor === userIdRef.current) {
                setModalMe(true);
                deleteTarget.current = deleteComment;
            } else {
                setModalNotMe(true);
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
                            onClickHandle={onClickHandle}
                            initialTimeFormatted={formattedDate(e.createdAt)}
                            initialTime={e.createdAt}
                        />
                    );
                });

                setCommentMsg(comments);
            }
        },
        [recentSortHandle, onClickHandle]
    );

    // 댓글 작성 및 삭제시 렌더링 담당하는 함수
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
                            onClickHandle={onClickHandle}
                            initialTimeFormatted={formattedDate(e.createdAt)}
                            initialTime={e.createdAt}
                        />
                    );
                });

                setCommentMsg(comments);
            }
        },
        [recentSortHandle, onClickHandle]
    );

    // 댓글 입력 인풋창 변할 때 함수 - 댓글 등록 버튼 활성화 비활성화 여부 정하기 위함
    const onInpChangeHandle = (e) => {
        if (e.target.value.trim().length === 0 || e.target.value.length === 0) {
            setIsBtnDisabled(true);
        } else {
            setIsBtnDisabled(false);
        }
    };

    // 댓글이 제출될 때 동작하는 함수
    const onCommentSubmitHandle = async (e) => {
        e.preventDefault();
        try {
            const URL =
                "https://mandarin.api.weniv.co.kr/post/" +
                currentId +
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

    // 댓글 더 불러오기
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
                    onClickHandle={onClickHandle}
                    initialTimeFormatted={formattedDate(e.createdAt)}
                    initialTime={e.createdAt}
                />
            );
        });

        setCommentMsg((prev) =>
            isPreviousLoading ? [comments, ...prev] : [...prev, comments]
        );
    };

    // more 버튼 -> 댓글 삭제하기 버튼 클릭시 작동하는 함수
    // 동작시 삭제 여부를 묻는 confirm 모달창이 뜬다.
    const deleteConfirmFunc = async () => {
        setModalMe(false);
        setDeleteConfirm(true);
    };

    // 삭제 여부 묻는 confirm 모달창에서 최종적으로 삭제 버튼을 누를 때 동작하는 함수 => 동작시 댓글을 삭제한다.
    const deleteCommentFunc = async () => {
        const URL =
            "https://mandarin.api.weniv.co.kr/post/" +
            currentId +
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

            setDeleteConfirm(false);
            setModalMe(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        sendRequest(baseURL, initialDataSet, false);
    }, [currentId, initialDataSet, sendRequest, baseURL]);

    return (
        <>
            {modalNotMe && (
                <OptionModal
                    onConfirm={() => {
                        setModalNotMe(false);
                        deleteTarget.current = null;
                    }}
                >
                    <li>
                        <button
                            type={"button"}
                            onClick={() => {
                                window.alert("댓글이 신고되었습니다.");
                            }}
                        >
                            댓글 신고하기
                        </button>
                    </li>
                </OptionModal>
            )}
            {modalMe && (
                <OptionModal
                    onConfirm={() => {
                        setModalMe(false);
                        deleteTarget.current = null;
                    }}
                >
                    <li>
                        <button type={"button"} onClick={deleteConfirmFunc}>
                            댓글 삭제하기
                        </button>
                    </li>
                </OptionModal>
            )}
            {deleteConfirm && (
                <ConfirmModal
                    confirmMsg={"삭제하시겠습니까?"}
                    onCancle={() => setDeleteConfirm(false)}
                    onConfirm={() => setDeleteConfirm(false)}
                    buttonRight={
                        <button type={"button"} onClick={deleteCommentFunc}>
                            삭제
                        </button>
                    }
                />
            )}
            <TopBar type={"A1"} />
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
                    <img
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
