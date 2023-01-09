import Router from "./routes/Router";
import { GlobalStyle } from "./app.style";
import { spriteSVGIcon } from "./components/icon/spriteIcon";

function App() {
    return (
        <>
            {spriteSVGIcon}
            <GlobalStyle />
            <Router />
        </>
    );
}

export default App;
