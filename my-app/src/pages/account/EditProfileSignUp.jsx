import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import InitialHeading from "../../components/shared/InitialHeading/InitialHeading";
import ProfileSetInpsTemp from "../../components/ProfileSetInpsTemp/ProfileSetInpsTemp";
import Button from "../../components/Button";
import axios from "axios";

export default function EditProfileSignUp() {
    const [userData, setUserData] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);
    const location = useLocation();

    useEffect(() => {
        setUserData(location.state);
    }, [location.state]);

    // 제출 버튼을 비활성화 하는 함수: 하위 컴포넌트에 내려줄 거임
    const onInvalidFunc = () => {
        setIsDisabled(true);
    };

    // 제출 버튼을 활성화 하는 함수: 하위 컴포넌트에 내려줄 거임
    const onValidFunc = () => {
        setIsDisabled(false);
    };

    // 폼이 제출될 때 실행되는 함수
    const onSubmitFunc = async (submitted) => {
        // 원본 데이터를 훼손하지 않기 위해 스프레드 기법 + 새로운 변수를 만듦, 기존 데이터 건들지 않는 방향으로
        const edited = {
            ...userData.user,
            accountname: submitted.current.accountname,
            image: submitted.current.image,
            intro: submitted.current.intro,
            username: submitted.current.username,
        };
        const finalEdited = {
            user: edited,
        };

        try {
            const res = await axios.post(
                "https://mandarin.api.weniv.co.kr/user",
                finalEdited,
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                }
            );

            // 회원가입 후 바로 로그인이 가능하도록 토큰 저장
            const loginRes = await axios.post(
                "https://mandarin.api.weniv.co.kr/user/login",
                {
                    user: {
                        email: finalEdited.user.email,
                        password: finalEdited.user.password,
                    },
                }
            );

            localStorage.setItem("token", loginRes.data.user.token);

            console.log("회원가입 및 로그인 성공");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <InitialHeading text={"프로필 설정"} />
            <p>나중에 언제든지 변경할 수 있습니다.</p>
            <ProfileSetInpsTemp
                formId={"signUp"}
                onInValidByUpper={onInvalidFunc}
                onValidByUpper={onValidFunc}
                onSubmitByUpper={onSubmitFunc}
            />
            <Button
                form={"signUp"}
                className={"large"}
                type={"submit"}
                disabled={isDisabled}
            >
                감귤마켓 시작하기
            </Button>
        </>
    );
}
