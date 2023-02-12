import styled from 'styled-components';

const FormCont = styled.div`
    display: flex;
    flex-direction: column;
`;

const Cont = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media screen and (min-width: 768px){
        margin-left: 240px;
    }
`
const TextCont = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
export {
    FormCont,
    Cont,
    TextCont
} 