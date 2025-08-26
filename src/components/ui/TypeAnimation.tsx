"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./ui.module.css"

type TypeAnimationProps = {
  content: string;
};

export default function TypeAnimation({ content }: TypeAnimationProps) {
  const [offsets, setOffsets] = useState<number[] | null>(null);
  const [alignRight, setAlignRight] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAlignRight(Math.random() > 0.5);

          const words = content.split(" ");
          const len = words.length;

          const curveFactor = Math.random() * 2 + 1;
          const reverse = Math.random() > 0.5;
          const maxOffsetPercent = Math.random() * 15 + 25; // 5% to 15%

          const newOffsets = words.map((_, i) => {
            const t = i / (len - 1 || 1);
            const curved = Math.pow(t, curveFactor);
            const offset = curved * maxOffsetPercent;
            return reverse ? maxOffsetPercent - offset : offset;
          });

          setOffsets(newOffsets);
        } else {
          setOffsets(null);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [content]);

  return (
    <h2 ref={ref} style={{ display: "inline-block" }}>
      {content.split(" ").map((word, i) => (
        <div
          key={i}
          className={styles.animation}
          style={{
            paddingLeft: alignRight ? undefined : `${offsets?.[i] ?? 0}%`,
            paddingRight: alignRight ? `${offsets?.[i] ?? 0}%` : undefined,
            transitionDelay: `${i * 0.1}s`,
            textAlign: alignRight ? "right" : "left",
            width: "calc(100vw - 2 * var(--space-s))",
          }}
        >
          {word}
        </div>
      ))}
    </h2>
  );
}
