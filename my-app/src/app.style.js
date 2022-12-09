import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
    ${reset}

    /* reset에 border-box가 없는거 같아서 이렇게 추가했는데, 추가해도 괜찮을까요? */
    * {
        box-sizing: border-box;
    }

    .ir {
        position: absolute;
        clip-path: inset(50%);
        width: 1px;
        height: 1px;
        overflow: hidden;
    }
    button {
        border: none;
        cursor: pointer;
        :disabled {
            cursor: default;
        }
    }
`;
