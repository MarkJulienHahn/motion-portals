"use client";

import { useRef } from "react";
import styles from "./home.module.css";

import Image from "next/image";
import { PortableText } from "next-sanity";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import TypeAnimation from "../ui/TypeAnimation";
import { Swiper as SwiperType } from "swiper";
import { MotionPortalsType } from "@/types/types";

type MotionPortalsProps = {
  locale: "de" | "en";
  content: MotionPortalsType;
};

export default function MotionPortals({ locale, content }: MotionPortalsProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className={styles.home__section}>
      <div
        className={`${styles.section__intro} ${styles.motionPortals__intro}`}
      >
        <h1>Motion Portals Stuttgart</h1>
        <TypeAnimation
          content={locale === "de" ? content.headline.de : content.headline.en}
        />
      </div>

      <div className={styles.imageSlider}>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          breakpoints={{
            1000: {
              slidesPerView: 3.2,
              spaceBetween: 10,
            },
            1200: {
              slidesPerView: 4.2,
              spaceBetween: 10,
            },
          }}
        >
          {content.images.map((image, i) => (
            <SwiperSlide key={i}>
              <div
                className={styles.imageWrapper}
                onClick={() => swiperRef.current?.slideNext()}
              >
                <Image
                  fill
                  src={image.asset.url}
                  alt={image.alt || "Motion Portals Stuttgart Image"}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.caption}>
                <p>
                  ({i + 1}/{content.images.length})
                </p>
                {image.caption && (
                  <p>{locale === "de" ? image.caption.de : image.caption.en}</p>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={`${styles.text} ${styles.text__top}`}>
        <PortableText
          value={locale === "de" ? content.text.de : content.text.en}
        />
      </div>
    </section>
  );
}
