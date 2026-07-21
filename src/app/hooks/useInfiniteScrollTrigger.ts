import { useEffect, useRef } from "react";

interface UseInfiniteScrollTriggerParams {
  onIntersect: () => void;
  enabled: boolean;
}

export function useInfiniteScrollTrigger({
  onIntersect,
  enabled,
}: UseInfiniteScrollTriggerParams) {
  const rootRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const target = targetRef.current;

    if (!root || !target || !enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      { root, threshold: 0 },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [onIntersect, enabled]);

  return { rootRef, targetRef };
}
