import styles from "./home.module.css";
import { PortableText } from "next-sanity";
import { AnleitungType } from "@/types/types";
import Image from "next/image";

type AnleitungProps = {
  locale: "de" | "en";
  content: AnleitungType;
};

export default function Anleitung({ locale, content }: AnleitungProps) {
  console.log(content);
  return (
    <section className={styles.home__section}>
      <div className={styles.section__intro} style={{ textAlign: "center" }}>
        <h2>{locale == "de" ? content.headline.de : content.headline.en}</h2>
      </div>
      <div className={styles.text}>
        <PortableText
          value={locale == "de" ? content.text.de : content.text.en}
        />
      </div>
      <div className={styles.schaubild}>
        {content.diagram.asset.url && (
          <Image
            src={content.diagram.asset.url}
            width={1200}
            height={800}
            alt={
              content.diagram.alt ||
              "A diagram displaying how to use the QR-Codes"
            }
          />
        )}
      </div>
    </section>
  );
}
