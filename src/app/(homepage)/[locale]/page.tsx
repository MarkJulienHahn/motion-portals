import { getHome, getOrte } from "@/../../sanity/sanity-utils";

import styles from "@/components/home/home.module.css";

import Anleitung from "@/components/home/Anleitung";
import Landing from "@/components/home/Landing";
import MotionPortals from "@/components/home/MotionPortals";
import Skulpturen from "@/components/home/Skulpturen";
import Nav from "@/components/ui/Nav";
import NavWrapper from "@/components/ui/NavWrapper";
import Footer from "@/components/ui/Footer";

export default async function Home({
  params: { locale },
}: Readonly<{
  params: { locale: "de" | "en" };
}>) {
  const home = await getHome();
  const orte = await getOrte();

  return (
    <main className={styles.pageWrapper}>
      <section className={styles.landing__wrapper}>
        <Landing />
      </section>
      <section className={styles.mainContent}>
        <NavWrapper locale={locale} />
        <MotionPortals content={home.motionPortals} locale={locale} />
        <Skulpturen
          content={home.skulpturen}
          orte={orte.orte}
          locale={locale}
        />
        <Anleitung content={home.anleitung} locale={locale} />
        <Nav locale={locale} />
        <Footer />
      </section>
    </main>
  );
}
