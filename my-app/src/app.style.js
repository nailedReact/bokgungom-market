import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
    ${reset}

    :root {
        --color-primary: #4583A3;
        --color-text: #3F3F46;
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
