"use client";

import { useRef, useEffect, useState, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import styles from "@/components/home/home.module.css";

import type { OrtType } from "@/types/types";

import dynamic from "next/dynamic";
const GLBViewer = dynamic(() => import("@/components/ui/GLBViewer.js"), {
  ssr: false,
});

type OverlayProps = {
  orte: OrtType[];
  onSelectOrtIndex?: (i: number) => void;
  setSelectedOrtIndex: React.Dispatch<React.SetStateAction<number | null>>;
  selectedOrtIndex: number | null | undefined;
};

export default function Overlay({
  setSelectedOrtIndex,
  selectedOrtIndex,
  orte,
}: OverlayProps) {
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

  // Update activeIndex and navigate Swiper when selectedOrtIndex changes (from parent)
  useEffect(() => {
    if (selectedOrtIndex !== null && selectedOrtIndex !== undefined) {
      setActiveIndex(selectedOrtIndex);
      router.replace(`?ort=${selectedOrtIndex + 1}`, { scroll: false });

      setTimeout(() => {
        if (swiperRef.current && swiperRef.current.slideTo) {
          swiperRef.current.slideTo(selectedOrtIndex, 0);
        }
      }, 100);
    }
  }, [selectedOrtIndex, router]);

  // Update URL when slide changes within overlay
  useEffect(() => {
    if (selectedOrtIndex !== null && selectedOrtIndex !== undefined) {
      router.replace(`?ort=${activeIndex + 1}`, { scroll: false });
    }
  }, [activeIndex, selectedOrtIndex, router]);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handleClose = () => {
    setSelectedOrtIndex(null);
    router.replace(window.location.pathname, { scroll: false });
  };

  const lat = currentOrt?.coordinates?.latitude;
  const lng = currentOrt?.coordinates?.longitude;

  const mapLink = (() => {
    if (!lat || !lng) return null;

    if (isMobile) {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (isIOS) {
        return `https://maps.apple.com/?ll=${lat},${lng}`;
      } else {
        return `geo:${lat},${lng}`;
      }
    } else {
      return `https://www.google.com/maps?q=${lat},${lng}`;
    }
  })();

  useLayoutEffect(() => {
    let scrollY = 0;

    if (selectedOrtIndex !== null && selectedOrtIndex !== undefined) {
      scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    }

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [selectedOrtIndex]);

  return (
    <div
      className={`${styles.overlay} ${selectedOrtIndex !== null && styles.overlayOpen}`}
    >
      {currentOrt && (
        <div className={styles.swiperInfo}>
          <h2 className={styles.locationNumber}>({activeIndex + 1})</h2>
          <h2>{currentOrt.artist}</h2>
          <h2>
            <em>{currentOrt.name}</em>
          </h2>
        </div>
      )}
      <button className={styles.closeButton} onClick={handleClose}>
        (X)
      </button>
      <Swiper
        modules={[Pagination]}
        pagination
        initialSlide={activeIndex}
        spaceBetween={50}
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          if (selectedOrtIndex !== null && selectedOrtIndex !== undefined) {
            setTimeout(() => {
              swiper.slideTo(selectedOrtIndex, 0);
            }, 50);
          }
        }}
        className={styles.swiperContainer}
      >
        {orte.map((ort, i) => (
          <SwiperSlide key={i} className={styles.swiperSlide}>
            <div
              onClick={() => {
                if (swiperRef.current) {
                  if (swiperRef.current.activeIndex === orte.length - 1) {
                    swiperRef.current.slideTo(0);
                  } else {
                    swiperRef.current.slideNext();
                  }
                }
              }}
              style={{ cursor: "pointer" }}
            >
              {ort.glb?.asset.url ? (
                <>
                  <GLBViewer url={ort.glb.asset.url} zoom={ort?.zoom} />
                </>
              ) : (
                <div className={styles.swiperImage}>
                  <Image
                    src={ort.image.asset.url || "/placeholder.svg"}
                    alt={ort.name}
                    width={1000}
                    height={1000}
                  />
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {mapLink && (
        <div className={styles.swiperLink}>
          <a href={mapLink} target="_blank" rel="noopener noreferrer">
            (Weg anzeigen)
          </a>
        </div>
      )}
    </div>
  );
}
