import { useEffect } from 'react';

export default function useInterserctionObserver({
  root,
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px'
}) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold
      }
    );

    const el = target && target.current;

    if (!el) return;

    observer.observe(el);

    return () => observer.unobserve(el);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.current]);
}
