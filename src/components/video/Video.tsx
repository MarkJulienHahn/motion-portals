"use client";
import { useState, useRef, useEffect } from "react";
import styles from "@/components/video/video.module.css";
import Footer from "@/components/ui/Footer";
import Player from "@vimeo/player";

export default function Video({ video }) {
  const [showPlayer, setShowPlayer] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleClick = () => {
    setShowPlayer(true);
  };

  useEffect(() => {
    if (!showPlayer || !iframeRef.current) return;

    const player = new Player(iframeRef.current);

    // Play the video
    player.play().catch(console.error);

    // Request fullscreen
    iframeRef.current.requestFullscreen?.().catch(console.error);
  }, [showPlayer]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.videoContainer} onClick={handleClick}>
        {!showPlayer ? (
          <div className={styles.videoPlaceholder}>
            Click to play
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            src={`https://player.vimeo.com/video/${video.id}?autoplay=1&loop=0&title=0&byline=0&portrait=0&controls=1`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          ></iframe>
        )}
      </div>
      <Footer />
    </section>
  );
}
