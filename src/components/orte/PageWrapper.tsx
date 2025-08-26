
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { PortableText } from "next-sanity";
import NavWrapper from "@/components/ui/NavWrapper";
import Footer from "@/components/ui/Footer";
import Nav from "@/components/ui/Nav";
import Overlay from "@/components/orte/Overlay";
import type { OrtType, TextBlock } from "@/types/types";
import styles from "@/components/home/home.module.css";

const Map = dynamic(() => import("@/components/orte/Map"), { ssr: false });

export default function PageWrapper({
  locale,
  orte,
  text,
}: {
  locale: "de" | "en";
  orte: OrtType[];
  text: { de: TextBlock[]; en: TextBlock[] };
}) {
  const [selectedOrtIndex, setSelectedOrtIndex] = useState<number | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (orte.length > 0) {
      const ortParam = searchParams.get("ort");
      if (ortParam) {
        const ortIndex = Number.parseInt(ortParam, 10) - 1;
        if (!isNaN(ortIndex) && ortIndex >= 0 && ortIndex < orte.length) {
          setSelectedOrtIndex(ortIndex);
        }
      }
    }
  }, [searchParams, orte]);

  return (
    <main>
      <NavWrapper locale={locale} />
      <section>
        <div className={styles.placesGradient} />
        <div className={styles.section__intro} style={{ paddingBottom: "0" }}>
          <h1 style={{ marginBottom: "0" }}>
            ({locale === "de" ? "Orte" : "Location"})
          </h1>
        </div>
        <Map orte={orte} onSelectOrt={(i) => setSelectedOrtIndex(i)} />
        <div className={styles.locationList}>
          {orte.map((ort, i) => (
            <div
              className={styles.listRow}
              key={i}
              onClick={() => setSelectedOrtIndex(i)}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.locationNumber}>({i + 1})</div>{" "}
              <div>
                {ort.artist} <br />
                <em>{ort.name}</em>&nbsp;→
              </div>
            </div>
          ))}
        </div>
        <div className={styles.text}>
          <PortableText value={locale === "de" ? text.de : text.en} />
        </div>
      </section>
      <Overlay
        setSelectedOrtIndex={setSelectedOrtIndex}
        selectedOrtIndex={selectedOrtIndex}
        orte={orte}
      />
      <Nav locale={locale} />
      <Footer />
    </main>
  );
}
