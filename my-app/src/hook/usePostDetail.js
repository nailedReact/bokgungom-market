import axios from "axios";
import { useCallback } from "react";

export default function usePostDetail(reacts) {
    const {setPostMsg, currentId} = reacts;

    const sendRequest = useCallback((URL, applyData, isCommentLoading) => {
        

        const getProductDetail = async () => {
            try {
                const URL =
                    "https://mandarin.api.weniv.co.kr/post/" + currentId;
                const res = await axios.get(URL, {
                    headers: {
                        Authorization: localStorage.getItem("Authorization"),
                        "Content-type": "application/json",
                    },
                });
                setPostMsg(res.data.post);
            } catch (err) {
                console.log(err);
            }
        };

        const getComments = async () => {
            try {
                const res = await axios.get(URL, {
                    headers: {
                        Authorization: localStorage.getItem("Authorization"),
                        "Content-type": "application/json",
                    },
                });

                applyData(res, isCommentLoading);
            } catch (err) {
                console.log(err);
            }
        };

        getProductDetail();
        getComments();
    }, [currentId, setPostMsg]);

    return sendRequest;
}
