import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
    ${reset}

    @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard-dynamic-subset.css");

    :root {
        --color-primary: #4583A3;
        --color-text: #3F3F46;
        font-family: "Pretendard";
        font-size: 16px;
        font-weight: 400;
    }

    * {
        box-sizing: border-box;
        color: var(--color-text);
        
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

    a {
        text-decoration: none;
        color: inherit;
    }
`;
