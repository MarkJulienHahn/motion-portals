import { getOrte } from "@/../../sanity/sanity-utils";
import PageWrapper from "@/components/orte/PageWrapper";

export default async function Page({
  params,
}: {
  params: { locale: "de" | "en" };
}) {
  const data = await getOrte();

  return (
    <PageWrapper
      locale={params.locale}
      orte={data.orte}
      text={data.text}
    />
  );
}
