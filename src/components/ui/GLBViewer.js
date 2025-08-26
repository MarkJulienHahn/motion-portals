"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

import RotatingModel from "./RotatingModel";

export default function GLBViewer({ url, zoom }) {
  return (
    <div style={{ width: "100%", height: "80vh" }}>
      <Canvas camera={{ position: [0, 0, 3], fov: zoom }}>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 2, 2]} />
        <Suspense fallback={null}>
          <RotatingModel url={url} position={[0, -0.5, 0]} />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}
