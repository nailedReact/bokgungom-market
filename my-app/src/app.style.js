import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

export const GlobalStyle = createGlobalStyle`
    ${reset}

    .ir {
        position: absolute;
        clip-path: inset(50%);
        width: 1px;
        height: 1px;
        overflow: hidden;
    }
`