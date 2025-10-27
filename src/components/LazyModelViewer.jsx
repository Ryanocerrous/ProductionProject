import { lazy, Suspense, useEffect, useRef, useState } from 'react';

const ModelViewer = lazy(() => import('./ModelViewer.jsx'));

function useInViewport(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export default function LazyModelViewer(props) {
  const { ref, visible } = useInViewport(0.2);

  return (
    <div ref={ref} style={{ minHeight: 280 }}>
      {visible ? (
        <Suspense fallback={<div style={{ height: 280 }} />}> 
          <ModelViewer {...props} />
        </Suspense>
      ) : (
        <div style={{ height: 280 }} />
      )}
    </div>
  );
}

