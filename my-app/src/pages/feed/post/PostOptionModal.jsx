import React from "react";
import { Link } from "react-router-dom";
import OptionModal from "../../../components/optionModal/OptionModal";

export default function PostOptionModal({
    postState,
    setPostState,
    clickHandle,
    postDetailId
}) {
    return (
        <>
            {postState.isOpen && (
                <OptionModal
                    onConfirm={() => {
                        setPostState((prev) => ({
                            ...prev,
                            isMe: undefined,
                            isOpen: false,
                        }));
                    }}
                >
                    <li>
                        <button type="button" onClick={clickHandle}>
                            {postState.isMe
                                ? "삭제"
                                : "신고"}
                        </button>
                    </li>
                    {postState.isMe && (
                        <li>
                            <Link to={`/post/${postDetailId}/edit`}>수정</Link>
                        </li>
                    )}
                </OptionModal>
            )}
        </>
    );
}