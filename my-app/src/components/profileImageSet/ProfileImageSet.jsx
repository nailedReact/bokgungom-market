import { useRef } from "react";
import ImageUpload from "../imageUpload/ImageUpload";
import actionImgCompress from "../../utils/imageCompression";
import { 
    ProfileImgSetCont,
    Div,
    ProfilePic
} from "./profileImageSet.style.js";

export default function ProfileImageSet({ onChangeByUpper, initial }) {
    const image = useRef(null);

    const handleFiles = (files) => {
        if (files.length > 0) {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(files[0]);
    
            fileReader.onload = async function () {
                image.current.src = fileReader.result;
                const submitFile = await actionImgCompress(files[0], true);
                onChangeByUpper(submitFile);
            };
        }
    };
    return (
        <Div>
            <ProfileImgSetCont>
                <span className={"ir"}>프로필 사진 이미지 설정</span>
                <ProfilePic
                    className={"profileImg"}
                    src={initial || require(`../../assets/basic-profile-img.png`)}
                    alt=""
                    ref={image}
                />
                <ImageUpload
                    className={"fileUpload"}
                    btnStyle={"orange small"}
                    onChangeByUpper={handleFiles}
                />
            </ProfileImgSetCont>
        </Div>
    );
};