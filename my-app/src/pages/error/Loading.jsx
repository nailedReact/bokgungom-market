import {
    Cont,
    ImgContLoading
} from "./loadingError.style"

export default function Loading() {
    return (
        <Cont>
            <ImgContLoading></ImgContLoading>
            <span>로딩중</span>
        </Cont>
    )
}
