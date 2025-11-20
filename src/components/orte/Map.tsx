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

    console.log(orte);

    orte.forEach((ort, i) => {
      const { coordinates, artist, name } = ort;

      if (!coordinates) return;

      const lng = Number(coordinates.longitude);
      const lat = Number(coordinates.latitude);

      if (isNaN(lng) || isNaN(lat)) return;

      // Marker element
      const el = document.createElement("img");
      el.src = ort.image?.asset?.url || "/default-marker.png"; // fallback
      el.style.width = "auto";
      el.style.height = "100px";
      el.style.cursor = "pointer";

      el.addEventListener("click", () => {
        onSelectOrt?.(i);
      });

      // Create popup
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        closeOnClick: false,
      }).setHTML(`<h3>${artist ?? "Artist"}</h3><p>${name ?? "Location"}</p>`);

      // Marker
      const marker = new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map);

      // Show popup on hover
      el.addEventListener("mouseenter", () =>
        popup.addTo(map).setLngLat([lng, lat])
      );
      el.addEventListener("mouseleave", () => popup.remove());
    });

    return () => map.remove();
  }, [center, zoom]);

  return <div ref={mapContainer} className={styles.map} />;
}
