import styled from "styled-components";

const ProfileSetCont = styled.form`

    display: flex;
    flex-direction: column;
    /* align-items: center; */
    /* margin: 30px; */

    & .inp {
        font-size: 20px;
        background-color: none;
        border: none;
        padding-bottom: 2px;
        border-bottom: 1px solid #DBDBDB;
        outline: none;
        display: flex;
        width: 100%;
        @media screen and (max-width: 768px) {
            font-size: 16px;
        }
    }

    & .inp:focus {
        border-color: #4583A3;
    }
`;

export default ProfileSetCont;