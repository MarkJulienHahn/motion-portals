"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

import styles from "./orte.module.css";
import { OrtType } from "@/types/types";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

type MapboxMapProps = {
  center?: [number, number];
  zoom?: number;
  orte: OrtType[];
  onSelectOrt?: (i: number) => void;
};

const centerPoint: [number, number] = [9.179013722409223, 48.77844849017484];
const subtractor = 0.005;

const bounds = new mapboxgl.LngLatBounds(
  [centerPoint[0] - subtractor, centerPoint[1] - subtractor],
  [centerPoint[0] + subtractor, centerPoint[1] + subtractor]
);

export default function MapboxMap({
  center = centerPoint,
  zoom = 13,
  orte,
  onSelectOrt,
}: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/markjulienhahn/clilien5800ep01qpemgf4hgq",
      zoom: 13.011188747676933,
      center: centerPoint,
      maxBounds: bounds,
      maxZoom: 17,
      pitchWithRotate: false,
      dragRotate: false,
      touchZoomRotate: false,
      attributionControl: false,
    });

    orte.forEach((ort, i) => {
      const { coordinates, artist, name } = ort;

      if (!coordinates) return;

      const lng = Number(coordinates.longitude);
      const lat = Number(coordinates.latitude);

      if (isNaN(lng) || isNaN(lat)) return;

      const el = document.createElement("div");
      el.style.width = "30px";
      el.style.height = "30px";
      el.style.borderRadius = "50%";
      el.style.backgroundColor = "var(--primary)";
      el.style.cursor = "pointer";
      el.style.display = "flex";
      el.style.alignItems = "center";
      el.style.justifyContent = "center";
      el.style.color = "white";
      el.style.fontSize = "14px";
      el.style.fontWeight = "bold";

      el.textContent = String(i + 1);

      el.addEventListener("click", () => {
        onSelectOrt?.(i);
      });

      new mapboxgl.Marker(el)
        .setLngLat([lng, lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${artist ?? "Artist"}</h3><p>${name ?? "Location"}</p>`
          )
        )
        .addTo(map);
    });

    return () => map.remove();
  }, [center, zoom]);

  return <div ref={mapContainer} className={styles.map} />;
}
