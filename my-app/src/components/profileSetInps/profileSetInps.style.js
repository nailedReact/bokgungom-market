import styled from "styled-components";

const ProfileSetCont = styled.form`
    display: flex;
    flex-direction: column;

    & .inp {
        font-size: 16px;
        background-color: none;
        border: none;
        padding-bottom: 2px;
        border-bottom: 1px solid #DBDBDB;
        outline: none;
        display: flex;
        width: 100%;
    };

    & .inp:focus {
        border-color: #4583A3;
    };
`;

export default ProfileSetCont;