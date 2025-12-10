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

  // Desktop-Navigation Items
  const navItems = [
    { href: "/", labelDe: "Home", labelEn: "Home" },
    { href: "/orte", labelDe: "Orte", labelEn: "Locations" },
    { href: "/projekt", labelDe: "Projekt", labelEn: "Project" },
    { href: "/kontakt", labelDe: "Kontakt", labelEn: "Contact" },
  ];

  const normalizedPath = pathname.replace(/^\/(de|en)/, "") || "/";

  return (
    <>
      {/* DESKTOP */}
      <nav className={styles.desktop}>
        {navItems.map(({ href, labelDe, labelEn }) => {
          const isActive =
            normalizedPath === href || normalizedPath.startsWith(href + "/");
          const label = locale === "de" ? labelDe : labelEn;

          return (
            <Link
              key={href}
              href={href}
              className={isActive ? styles.active : undefined}
            >
              {label}
            </Link>
          );
        })}
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
