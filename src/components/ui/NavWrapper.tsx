"use client";

import { useEffect, useLayoutEffect, useState } from "react";

import { Link } from "@/navigation";
import { usePathname } from "next/navigation";

import styles from "./nav.module.css";
import Nav from "./Nav";

type NavProps = { locale: "de" | "en" };

export default function NavWrapper({ locale }: NavProps) {
  const [showMenu, setShowMenu] = useState(false);

  const pathname = usePathname();
  const neutralPath = removeFirstThreeCharacters(pathname);

  function removeFirstThreeCharacters(str: string): string {
    if (str.length >= 3) {
      return str.substring(3);
    }
    return str;
  }

  useEffect(() => {
    function setVh() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    setVh();

    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  // Disable page scroll when menu is open
  useLayoutEffect(() => {
    let scrollY = 0;

    if (showMenu) {
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
  }, [showMenu]);

  return (
    <>
      {/* DESKTOP */}
      <nav className={styles.desktop}>
        <Link href="/">Home</Link>
        <Link href="/orte">{locale == "de" ? "Orte" : "Locations"}</Link>
        <Link href="/projekt">{locale == "de" ? "Projekt" : "Project"}</Link>
        <Link href="/kontakt">{locale == "de" ? "Kontakt" : "Contact"}</Link>
      </nav>
      {/* MOBILE */}
      <div className={styles.mobile}>
        <div className={styles.navButton}>
          <button onClick={() => setShowMenu(!showMenu)}>(Menu)</button>
        </div>
        <nav
          className={`${styles.navWrapper} ${
            showMenu ? styles.navActive : styles.navInactive
          }`}
          onClick={() => setShowMenu(false)}
        >
          <h2 className={styles.langSwitch}>
            <Link href={`/${neutralPath}`} locale="de">
              de
            </Link>
            &nbsp;/&nbsp;
            <Link href={`/${neutralPath}`} locale="en">
              en
            </Link>
          </h2>

          <Nav locale={locale} />

          <div className={styles.closeButton}>
            {locale == "de" ? "(Schließen)" : "(Close)"}
          </div>

          <div className={styles.gradient} onClick={() => setShowMenu(false)} />
        </nav>
      </div>
    </>
  );
}
