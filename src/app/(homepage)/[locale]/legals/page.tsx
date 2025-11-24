import { PortableText } from "next-sanity";
import { getLegals } from "../../../../../sanity/sanity-utils";
import NavWrapper from "@/components/ui/NavWrapper";
import Footer from "@/components/ui/Footer";

export default async function page({
  params,
}: {
  params: { locale: "de" | "en" };
}) {
  const legals = await getLegals();

  return (
    <main>
      <NavWrapper locale={params.locale} />
      <section className="legals__wrapper">
        <div className="legals">
          <PortableText
            value={params.locale == "de" ? legals.text.de : legals.text.en}
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}
