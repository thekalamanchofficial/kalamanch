// This file can be safely deleted as it's no longer used
import { useCallback, useRef } from "react";

type DebouncedFunction<TArgs extends unknown[]> = (...args: TArgs) => void | Promise<void>;

export function useDebounce<TArgs extends unknown[]>(
  callback: DebouncedFunction<TArgs>,
  delay: number,
): (...args: TArgs) => void {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: TArgs) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        void Promise.resolve(callback(...args)).catch((error) => {
          console.error("Error in debounced callback:", error);
        });
      }, delay);
    },
    [callback, delay],
  );
}
