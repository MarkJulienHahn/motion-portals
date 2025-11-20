"use client";

import { useRef } from "react";

import styles from "../home/home.module.css";

import { ProjectSectionType } from "@/types/types";
import { PortableText } from "next-sanity";
import Image from "next/image";

import TypeAnimation from "../ui/TypeAnimation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";

type SectionProps = {
  locale: "de" | "en";
  content: ProjectSectionType;
};

export default function Section({ content, locale }: SectionProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  return (
    <section className={styles.home__section}>
      <div className={styles.section__intro}>
        <TypeAnimation
          content={locale === "de" ? content.headline.de : content.headline.en}
        />
      </div>

      <div className={styles.text}>
        <PortableText
          value={locale == "de" ? content.text.de : content.text.en}
        />
      </div>

      {content.images?.length && (
        <div className={styles.imageSlider}>
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {content.images.map((image, i) => (
              <SwiperSlide key={i}>
                <div
                  className={styles.projectImage}
                  onClick={() => swiperRef.current?.slideNext()}
                >
                  <div className={styles.projectImageInner}>
                    <Image
                      src={image.asset.url}
                      alt={image.alt || "Motion Portals Stuttgart Image"}
                      width={1200} // max width
                      height={800} // max height
                      style={{ objectFit: "contain", objectPosition: "center" }}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </section>
  );
}
