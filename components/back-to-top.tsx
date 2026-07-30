'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 480);
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  if (!visible) return null;

  const returnToTop = () => {
    const main = document.getElementById('main-content');
    main?.setAttribute('tabindex', '-1');
    main?.focus({ preventScroll: true });
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return <button type="button" onClick={returnToTop} className="back-to-top fixed bottom-5 right-5 z-40 inline-flex min-h-11 min-w-11 items-center justify-center border-2 border-[#123b5d] bg-white text-[#123b5d] shadow-none transition-colors hover:bg-[#123b5d] hover:text-white" aria-label="Back to top"><ArrowUp size={22} aria-hidden="true" /></button>;
}
