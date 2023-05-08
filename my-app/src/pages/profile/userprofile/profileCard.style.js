import styled from "styled-components";

const Cont = styled.div`
    text-align: center;
    border: 0.5px solid #DBDBDB;
    background: #FFFFFF;
`;

const ProfileCont = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;
    margin-top:30px;
    gap: 40px;
`;

const Profileimg = styled.img`
    height: 110px;
    width: 110px;
    border-radius: 50%;
    border: 1px solid #C4C4C4;
    object-fit: cover;
`;

const Username = styled.h2`
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    margin-top: 16px;
`;

const Accountname = styled.p`
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #767676;
    margin-top:6px;
`;

const Intro = styled.p`
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #767676;
    margin-top: 16px;
`;

const Follower = styled.div`
    font-weight: 700;
    font-size: 18px;
    line-height: 23px;
    cursor: pointer;
`;

const Following = styled.div`
    font-weight: 700;
    font-size: 18px;
    line-height: 23px;
    color: #767676;
    cursor: pointer;
`;

const FollowTxt = styled.p`
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    color: #767676;
`;

const ButtonCont = styled.div`
    display: flex;
    gap: 10px;
    margin: 25px;
    justify-content: center;
    align-items:center;
`;

const Chatimg = styled.img`
    height: 34px;
    width: 34px;
    border: 1px solid  #DBDBDB;
    border-radius: 30px;
    padding: 9px;
`;

const Shareimg = styled.img`
    height: 34px;
    width: 34px;
    border: 1px solid  #DBDBDB;
    border-radius: 30px;
    padding: 9px;
`;

export {
    Cont,
    ProfileCont,
    Profileimg,
    Username,
    Accountname,
    Intro,
    Follower,
    Following,
    FollowTxt,
    ButtonCont,
    Chatimg,
    Shareimg
}