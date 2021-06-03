import { useEffect, useMemo, useState } from 'react';

export const GT_LARGE = '(min-width: 1024px)';
export const LT_LARGE = '(max-width: 1024px)';
export const LT_MEDIUM = '(max-width: 768px)';
export const LT_SMALL = '(max-width: 640px)';

export function useMediaQuery(query: string) {
  const mediaQueryListener = useMemo(() => {
    if (typeof window === 'undefined') {
      return { matches: false } as MediaQueryList;
    }

    return window.matchMedia(query);
  }, [query]);

  const [matches, setMatches] = useState(mediaQueryListener.matches);

  useEffect(() => {
    function listener(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }

    mediaQueryListener.addEventListener('change', listener);
    return () => mediaQueryListener.removeEventListener('change', listener);
  }, [mediaQueryListener]);

  return matches;
}
