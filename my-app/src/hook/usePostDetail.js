import axios from "axios";
import { useCallback } from "react";

export default function usePostDetail(reacts) {
    const { setPostMsg, currentId } = reacts;

    const sendRequest = useCallback(
        (commentsURL, applyData, isCommentLoading) => {
            const getComments = async () => {
                try {
                    const postDetailURL =
                        "https://mandarin.api.weniv.co.kr/post/" + currentId;
                    const postDetailRes = await axios.get(postDetailURL, {
                        headers: {
                            Authorization:
                                localStorage.getItem("Authorization"),
                            "Content-type": "application/json",
                        },
                    });
                    setPostMsg(postDetailRes.data.post);

                    const commentsRes = await axios.get(commentsURL, {
                        headers: {
                            Authorization:
                                localStorage.getItem("Authorization"),
                            "Content-type": "application/json",
                        },
                    });

                    applyData(commentsRes, postDetailRes.data.post.commentCount, isCommentLoading);
                } catch (err) {
                    console.log(err);
                }
            };

            getComments();
        },
        [currentId, setPostMsg]
    );

    return sendRequest;
}
