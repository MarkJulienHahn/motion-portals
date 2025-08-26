import NavWrapper from "@/components/ui/NavWrapper";
import { getContact } from "../../../../../sanity/sanity-utils";
import styles from "@/components/home/home.module.css";
import { PortableText } from "next-sanity";
import Footer from "@/components/ui/Footer";
import Nav from "@/components/ui/Nav";

export default async function page({
  params,
}: {
  params: { locale: "de" | "en" };
}) {
  const contact = await getContact();

  console.log(contact);

  return (
    <main>
      <NavWrapper locale={params.locale} />
      <section style={{ minHeight: "80vh" }}>
        <div className={styles.contactGradient} />
        <div className={styles.section__intro} style={{ paddingBottom: "0" }}>
          <h1>({params.locale === "de" ? "Kontakt" : "Contact"})</h1>
        </div>
        <div className={styles.text}>
          <PortableText
            value={params.locale == "de" ? contact.text.de : contact.text.en}
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}
