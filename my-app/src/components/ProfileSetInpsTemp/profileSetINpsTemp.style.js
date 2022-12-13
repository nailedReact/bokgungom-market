import styled from "styled-components";

const ProfileSetCont = styled.form`
    & .inp {
        font-size: 14px;
        background-color: none;
        border: none;
        padding-bottom: 2px;
        border-bottom: 1px solid #DBDBDB;
        outline: none;
    }

    & .inp:focus {
        border-color: #f26e22;
    }
`;

export default ProfileSetCont;