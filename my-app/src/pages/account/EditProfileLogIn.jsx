import React from "react";
import ProfileSetInpsTemp from "../../components/ProfileSetInpsTemp/ProfileSetInpsTemp.jsx";
import Button3rd from "../../components/shared/Button3rd/Button3rd.jsx";

export default function EditProfileLogIn() {
    return (
        <>
            <ProfileSetInpsTemp formId={"profileSetLogin"} />
            <Button3rd formId={"profileSetLogin"} btnText={"저장"} />
        </>
    );
}
