import { useEffect, useRef } from "react";

export function useInterval(cb: () => void, ms: number) {
  const cbRef = useRef(cb)
  cbRef.current = cb

  useEffect(() => {
    const timer = setInterval(() => cbRef.current(), ms)

    return () => clearInterval(timer)
  }, [])
}