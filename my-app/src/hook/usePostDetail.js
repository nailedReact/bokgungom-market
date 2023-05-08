import axios from "axios";
import { useCallback } from "react";
import { BASE_URL } from "../config";

export default function usePostDetail(reacts) {
    const { setPostMsg, id, currentUserId } = reacts;
    const baseUrl = BASE_URL;

    const sendRequest = useCallback(
        (commentsURL, applyData, isCommentLoading) => {
            const getComments = async () => {
                try {
                    const postDetailURL =
                        `${baseUrl}/post/` + id;
                    const postDetailRes = await axios.get(postDetailURL, {
                        headers: {
                            Authorization:
                                localStorage.getItem("Authorization"),
                            "Content-type": "application/json",
                        },
                    });
                    setPostMsg(postDetailRes.data.post);
                    currentUserId.current = postDetailRes.data.post.author._id;
                    const commentsRes = await axios.get(commentsURL, {
                        headers: {
                            Authorization:
                                localStorage.getItem("Authorization"),
                            "Content-type": "application/json",
                        },
                    });

                    applyData(
                        commentsRes,
                        postDetailRes.data.post.commentCount,
                        isCommentLoading
                    );
                } catch (err) {
                    console.log(err);
                }
            };

            getComments();
        },
        [baseUrl, id, setPostMsg, currentUserId]
    );

    return sendRequest;
}
