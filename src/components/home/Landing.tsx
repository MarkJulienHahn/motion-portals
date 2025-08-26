"use client";

import React, { useEffect } from "react";
import styles from "./home.module.css";

export default function Landing() {
  useEffect(() => {
    // Set custom --vh unit for mobile support
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  useEffect(() => {
    let isThrottled = false;
    const scrollToSection = (e: WheelEvent) => {
      if (isThrottled) return;
      isThrottled = true;

      const direction = e.deltaY > 0 ? "down" : "up";

      if (direction === "down") {
        window.scrollTo({ top: window.innerHeight - 80, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

      setTimeout(() => {
        isThrottled = false;
      }, 800);
    };

    window.addEventListener("wheel", scrollToSection);
    return () => window.removeEventListener("wheel", scrollToSection);
  }, []);

  return (
    <div className={styles.landing__videoWrapper}>
      <video
        className={styles.landing__video}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/introvideo_desktop.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
