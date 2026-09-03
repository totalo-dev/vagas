"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function FadeIn({ children, delay = 0, y = 20 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!el.current) return;
    
    gsap.fromTo(
      el.current,
      { opacity: 0, y: y },
      { opacity: 1, y: 0, duration: 0.8, delay, ease: "power3.out" }
    );
  }, [delay, y]);

  return <div ref={el} style={{ opacity: 0 }}>{children}</div>;
}
