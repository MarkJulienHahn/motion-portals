"use client";

import { useRef, useState, useEffect } from "react";
import styles from "./home.module.css";

import Image from "next/image";
import Link from "next/link";
import { PortableText } from "next-sanity";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import TypeAnimation from "../ui/TypeAnimation";

import { OrtType, SkulpturenType } from "@/types/types";

type SkulpturenProps = {
  locale: "de" | "en";
  content: SkulpturenType;
  orte: OrtType[];
};

export default function Skulpturen({ locale, content, orte }: SkulpturenProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  // Responsive slidesPerView
  useEffect(() => {
    const updateSlidesPerView = () => {
      const width = window.innerWidth;
      if (width >= 1000) setSlidesPerView(Math.min(5, orte.length));
      else if (width >= 600) setSlidesPerView(Math.min(2, orte.length));
      else setSlidesPerView(1);
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, [orte.length]);

  // Only enable loop if slidesPerView <= total slides
  const canLoop = slidesPerView <= orte.length;

  console.log(orte);

  return (
    <section className={`${styles.home__section} ${styles.home__sculptures}`}>
      <div className={styles.section__intro}>
        <TypeAnimation
          content={locale === "de" ? content.headline.de : content.headline.en}
        />
      </div>

      <div className={styles.text}>
        <PortableText
          value={locale === "de" ? content.text.de : content.text.en}
        />
      </div>

      <div
        className={`${styles.imageSlider} ${styles.skulpturen__imageSlider}`}
      >
        <div className={styles.leftArrow} id="customPrev">
          ←
        </div>
        <div className={styles.rightArrow} id="customNext">
          → 
        </div>

        <Swiper
          spaceBetween={50}
          modules={[Navigation]}
          slidesPerView={1}
          loop={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          breakpoints={{
            1000: { slidesPerView: 3.2, spaceBetween: 10 },
            1200: { slidesPerView: 4.2, spaceBetween: 10 },
          }}
          navigation={{
            prevEl: "#customPrev",
            nextEl: "#customNext",
          }}
        >
          {orte.map((ort, i) => (
            <SwiperSlide key={`${i}-${ort.image.asset.url}`}>
              <Link href={`${locale}/orte?ort=${i + 1}`}>
                <div className={styles.sculptureImage}>
                  <Image
                    src={ort.image.asset.url}
                    alt={ort.image.alt || "Motion Portals Image"}
                    fill
                    unoptimized
                    loading="eager"
                  />
                  <div className={styles.sculptureCaption}>
                    <div>({i + 1})</div>
                    <div>{orte[i].artist}</div>
                    <div>
                      <em>{orte[i].name}</em>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
