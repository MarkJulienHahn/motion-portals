import { getProject, getPeople } from "../../../../../sanity/sanity-utils";

import styles from "../../../../components/home/home.module.css";

import { PortableText } from "next-sanity";

import NavWrapper from "@/components/ui/NavWrapper";
import Section from "@/components/projekt/Section";
import Nav from "@/components/ui/Nav";

import { ProjectSectionType } from "@/types/types";
import TypeAnimation from "@/components/ui/TypeAnimation";
import Footer from "@/components/ui/Footer";

export default async function page({
  params: { locale },
}: Readonly<{
  params: { locale: "de" | "en" };
}>) {
  const projekt = await getProject();
  const people = await getPeople();

  return (
    <main>
      <NavWrapper locale={locale} />
      <div>
        <section className={styles.home__section}>
          <div style={{paddingBottom: "var(--space-xs)"}} className={styles.section__intro}>
            <h1 style={{marginBottom: "0"}}>({projekt.intro.headline})</h1>
          </div>
          <div className={styles.text}>
            <PortableText
              value={
                locale == "de" ? projekt.intro.text.de : projekt.intro.text.en
              }
            />
          </div>
          <div className={styles.projectsGradient}/>
        </section>

        {projekt.body.map((section: ProjectSectionType, i: number) => (
          <Section key={i} content={section} locale={locale} />
        ))}
      </div>

      <section className={styles.home__section}>
        <div className={styles.section__intro}>
          <TypeAnimation
            content={locale == "de" ? "Team/ Künstler:innen" : "Team/ Artists"}
          />
        </div>

        <div className={styles.text} style={{ textAlign: "center" }}>
          <PortableText
            value={locale == "de" ? people.content.de : people.content.en}
          />
        </div>
      </section>
      <Nav locale={locale} />
      <Footer />
    </main>
  );
}
