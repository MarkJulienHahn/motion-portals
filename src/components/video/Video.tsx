"use client";
import styles from "@/components/video/video.module.css";
import Footer from "@/components/ui/Footer";

export default function Video({video}) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.videoContainer}>
        <iframe
          src={`https://player.vimeo.com/video/${video.id}?background=0&autoplay=0&loop=0&title=0&byline=0&portrait=0&controls=1`}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          frameBorder="0"
        ></iframe>
      </div>
      <Footer />
    </section>
  );
}
