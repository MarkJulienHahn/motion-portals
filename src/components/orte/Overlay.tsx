"use client";

import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Image from "next/image";
import styles from "@/components/home/home.module.css";

import type { OrtType } from "@/types/types";

import dynamic from "next/dynamic";
const GLBViewer = dynamic(() => import("@/components/ui/GLBViewer.js"), { ssr: false });

type OverlayProps = {
  orte: OrtType[];
  onSelectOrtIndex?: (i: number) => void;
  setSelectedOrtIndex: React.Dispatch<React.SetStateAction<number | null>>;
  selectedOrtIndex: number | null | undefined;
};

export default function Overlay({ setSelectedOrtIndex, selectedOrtIndex, orte }: OverlayProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const swiperRef = useRef<any>(null);
  const router = useRouter();

  const currentOrt = orte[activeIndex];

  // Detect mobile
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userAgent = navigator.userAgent || navigator.vendor;
      setIsMobile(/android|iphone|ipad|ipod/i.test(userAgent.toLowerCase()));
    }
  }, []);

  // Slide Index Sync
  useEffect(() => {
    if (selectedOrtIndex !== null && selectedOrtIndex !== undefined && activeIndex !== selectedOrtIndex) {
      setActiveIndex(selectedOrtIndex);
      swiperRef.current?.slideTo(selectedOrtIndex, 0);
    }
  }, [selectedOrtIndex]);

  // Update URL when slide changes
  useEffect(() => {
    if (selectedOrtIndex !== null && selectedOrtIndex !== undefined && activeIndex !== selectedOrtIndex) {
      router.replace(`?ort=${activeIndex + 1}`, { scroll: false });
    }
  }, [activeIndex]);

  const handleSlideChange = (swiper: any) => setActiveIndex(swiper.activeIndex);

  const lastFullPathRef = useRef<string>("");
  useEffect(() => { lastFullPathRef.current = window.location.pathname; }, []);

  const handleClose = () => {
    setSelectedOrtIndex(null);
    const lastFullPath = lastFullPathRef.current.split("?")[0];
    router.replace(lastFullPath, { scroll: false });
  };

  const lat = currentOrt?.coordinates?.latitude;
  const lng = currentOrt?.coordinates?.longitude;
  const mapLink = lat && lng ? `https://www.google.com/maps?q=${lat},${lng}` : null;

  // Scroll Lock
  useLayoutEffect(() => {
    let scrollY = 0;
    if (selectedOrtIndex !== null) {
      scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      window.scrollTo(0, scrollY);
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [selectedOrtIndex]);

  // Lazy load slides
  const maxVisibleSlides = isMobile ? 1 : 3;
  const shouldLoad = (index: number) => Math.abs(activeIndex - index) < maxVisibleSlides;

  return (
    <div className={`${styles.overlay} ${selectedOrtIndex !== null && styles.overlayOpen}`}>
      {currentOrt && (
        <div className={styles.swiperInfo}>
          <h2 className={styles.locationNumber}>({activeIndex + 1}/{orte.length})</h2>
          <h2>{currentOrt.artist}</h2>
          <h2><em>{currentOrt.name}</em></h2>
        </div>
      )}
      <button className={styles.closeButton} onClick={handleClose}>(X)</button>
      <div className={styles.leftArrow} id="customPrev">←</div>
      <div className={styles.rightArrow} id="customNext">→</div>

      <Swiper
        modules={[Navigation]}
        initialSlide={activeIndex}
        spaceBetween={50}
        allowTouchMove={false}
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        className={styles.swiperContainer}
        navigation={{ prevEl: "#customPrev", nextEl: "#customNext" }}
      >
        {orte.map((ort, i) => (
          <SwiperSlide key={i} className={styles.swiperSlide}>
            {shouldLoad(i) ? (
              <GLBViewer url={ort.glb.asset.url} zoom={ort?.zoom} />
            ) : (
              <div className={styles.swiperImage}>
                <Image src={ort.image.asset.url || "/placeholder.svg"} alt={ort.name} width={1000} height={1000} />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {mapLink && (
        <div className={styles.swiperLink}>
          <a href={mapLink} target="_blank" rel="noopener noreferrer">(Weg anzeigen)</a>
        </div>
      )}
    </div>
  );
}
