import styled from "styled-components";

export const PostEditWrapper = styled.div`
    /* position: relative; */
    overflow: auto;
    padding: 20px 16px;
    height: ${(props) => `calc(${props.heightProp}px - 55px)`};
    @media screen and (min-width: 768px) {
        margin-left: 240px;
        padding: 40px;
    }
`;
