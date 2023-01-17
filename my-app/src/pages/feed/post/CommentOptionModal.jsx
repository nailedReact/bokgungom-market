import React from "react";
import OptionModal from "../../../components/optionModal/OptionModal";

export default function CommentOptionModal({
    commentState,
    setCommentState,
    deleteTarget,
    clickHandle,
}) {
    return (
        <>
            {commentState.isOpen && (
                <OptionModal
                    onConfirm={() => {
                        setCommentState((prev) => ({
                            ...prev,
                            isMe: undefined,
                            isOpen: false,
                        }));
                        deleteTarget.current = null;
                    }}
                >
                    <li>
                        <button type="button" onClick={clickHandle}>
                            {commentState.isMe
                                ? "댓글 삭제하기"
                                : "댓글 신고하기"}
                        </button>
                    </li>
                </OptionModal>
            )}
        </>
    );
}
