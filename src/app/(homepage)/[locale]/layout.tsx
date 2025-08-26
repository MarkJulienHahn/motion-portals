import type { Metadata } from "next";
import "../../../globals.css";

import "mapbox-gl/dist/mapbox-gl.css";

export const metadata: Metadata = {
  title: "Motion Portals",
  description:
    "Motion Portals Stuttgart basiert auf der Vision, Kunst im öffentlichen Raum um tänzerische Inhalte zu erweitern und erlebbar zu machen.",
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: "de" | "en" };
}>) {
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}
