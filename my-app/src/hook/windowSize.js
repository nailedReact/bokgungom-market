import {useEffect, useState} from "react";

const useWindowSizeCustom = () => {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width : 0,
        height: 0,
        // visualViewportHeight: 0 
    });

    useEffect(() => {
        // only execute all the code below in client side
        if (typeof window !== 'undefined') {

            const handleResize = () => {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                    // visualViewportHeight: window.visualViewport.height
                });
            }

            // Add event listener
            window.addEventListener("resize", handleResize);

            // Call handler right away so state gets updated with initial window size
            handleResize();

            // Remove event listener on cleanup
            return () => window.removeEventListener("resize", handleResize);
        } else {
            return () => window.removeEventListener("resize", () => {
                return null
            });
        }
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}

export default useWindowSizeCustom;