import React from 'react';
import InitialHeading from '../../components/shared/InitialHeading/InitialHeading';
import ProfileSetInpsTemp from '../../components/ProfileSetInpsTemp/ProfileSetInpsTemp.jsx';
import Button1st from '../../components/shared/Button1st/Button1st.jsx';

export default function ProfileSetSignUp() {
  return (
    <>
        <InitialHeading text={"프로필 설정"}/>
        <p>나중에 언제든지 변경할 수 있습니다.</p>
        <ProfileSetInpsTemp formId={"profileSetSignUp"}/>
        <Button1st formId={"profileSetSignUp"} btnText={"감귤마켓 시작하기"}/>
    </>
  )
}