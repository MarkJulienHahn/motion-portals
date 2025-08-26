"use client";

import { Link } from "@/navigation";
import { usePathname } from "next/navigation";

import styles from "./nav.module.css";
import React, { useState, useEffect, useRef } from "react";

type NavProps = { locale: "de" | "en" };

export default function Nav({ locale }: NavProps) {
  const pathname = usePathname();
  const normalizedPath = pathname.replace(/^\/(de|en)/, "") || "/";

  const navItems = [
    { href: "/", labelDe: "Home", labelEn: "Home" },
    { href: "/orte", labelDe: "Orte", labelEn: "Locations" },
    { href: "/projekt", labelDe: "Projekt", labelEn: "Project" },
    { href: "/kontakt", labelDe: "Kontakt", labelEn: "Contact" },
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  const [offsets, setOffsets] = useState<number[]>(
    Array(navItems.length).fill(0)
  );
  const [alignRight, setAlignRight] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Randomly choose alignment direction on enter
            setAlignRight(Math.random() > 0.5);

            // Generate random curve offsets
            const len = navItems.length;
            const curveFactor = Math.random() * 2 + 1; // 1 to 3
            const maxOffset = Math.random() * 15 + 25; // 60 to 140 px
            const reverse = Math.random() > 0.5;

            const newOffsets = navItems.map((_, i) => {
              const t = len > 1 ? i / (len - 1) : 0;
              const curved = Math.pow(t, curveFactor);
              const offset = curved * maxOffset;
              return reverse ? maxOffset - offset : offset;
            });

            setOffsets(newOffsets);
          } else {
            setOffsets(Array(navItems.length).fill(0));
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
      observer.disconnect();
    };
  }, [navItems.length]);

  return (
    <div
      ref={containerRef}
      className={styles.navList}
      style={{ height: "80vh" }}
    >
      {navItems.map(({ href, labelDe, labelEn }, i) => {
        const isActive =
          normalizedPath === href || normalizedPath.startsWith(href + "/");
        const label = locale === "de" ? labelDe : labelEn;

        return (
          <div
            key={href}
            className={`${isActive ? styles.active : undefined} ${styles.row}`}
            style={
              alignRight
                ? {
                    paddingRight: `${offsets[i]}%`,
                    textAlign: "right",
                    transitionDelay: `${i * 0.1}s`,
                  }
                : {
                    paddingLeft: `${offsets[i]}%`,
                    textAlign: "left",
                    transitionDelay: `${i * 0.1}s`,
                  }
            }
          >
            <Link href={href}>{label}</Link>
          </div>
        );
      })}
    </div>
  );
}
