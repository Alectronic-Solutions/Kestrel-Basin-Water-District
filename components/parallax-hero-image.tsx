'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { publicAsset } from '@/lib/paths';

export function ParallaxHeroImage() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameId: number | null = null;

    const updateOffset = () => {
      if (motionPreference.matches) {
        layerRef.current?.style.setProperty('--hero-parallax-offset', '0px');
        return;
      }

      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(() => {
        const offset = Math.min(window.scrollY * 0.16, 48);
        layerRef.current?.style.setProperty('--hero-parallax-offset', `${offset.toFixed(1)}px`);
        frameId = null;
      });
    };

    updateOffset();
    window.addEventListener('scroll', updateOffset, { passive: true });
    motionPreference.addEventListener('change', updateOffset);

    return () => {
      window.removeEventListener('scroll', updateOffset);
      motionPreference.removeEventListener('change', updateOffset);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div ref={layerRef} className="hero-parallax-media" aria-hidden="true">
      <Image
        src={publicAsset('/images/kestrel-reservoir-hero.webp')}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
    </div>
  );
}
