import { useEffect, useRef } from "react";

export function usePrevState(state) {
  const ref = useRef(state);
  useEffect(() => {
    ref.current = state;
  }, [state]);
  return ref.current;
}