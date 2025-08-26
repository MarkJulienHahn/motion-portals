"use client";

import { useRef, useState } from "react";
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
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1.5}
          centeredSlides={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          navigation={true}
          breakpoints={{
            1000: {
              slidesPerView: 4.2,
              spaceBetween: 10,
            },
          }}
        >
          {orte.map((ort, i) => (
            <SwiperSlide key={i}>
              <div className={styles.sculptureImage}>
                <Image
                  width={500}
                  height={500}
                  src={ort.image.asset.url}
                  alt={ort.image.alt || "Motion Portals Stuttgart Image"}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={styles.sculptureCaption}>
        <div>({activeIndex + 1})</div>
        <div>{orte[activeIndex].artist}</div>
        <div>
          <em>{orte[activeIndex].name}</em>
        </div>
      </div>

      <div className={styles.sculptureLink}>
        <Link href={`${locale}/orte?ort=${activeIndex + 1}`}>
          {" "}
          (Zur Skulptur){" "}
        </Link>
      </div>
    </section>
  );
}
