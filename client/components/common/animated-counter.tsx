'use client';

import { useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type AnimatedCounterProps = {
  value: string;
  duration?: number;
};

function parseValue(raw: string) {
  const number = Number(raw.replace(/[^\d.]/g, '')) || 0;
  const prefix = raw.startsWith('+') ? '+' : '';
  const suffix = raw.includes('%') ? '%' : raw.includes('+') && !raw.startsWith('+') ? '+' : raw.endsWith('+') ? '+' : '';
  return { number, prefix, suffix };
}

export function AnimatedCounter({ value, duration = 0.9 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(() => (reduceMotion ? value : '0'));

  useEffect(() => {
    if (!isInView || reduceMotion) {
      if (reduceMotion) setDisplay(value);
      return;
    }

    const { number, prefix, suffix } = parseValue(value);
    if (number <= 0) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const total = duration * 1000;

    const tick = (time: number) => {
      const progress = Math.min((time - start) / total, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(number * eased);
      setDisplay(`${prefix}${current}${suffix}`);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, isInView, reduceMotion, value]);

  return <span ref={ref}>{display}</span>;
}
