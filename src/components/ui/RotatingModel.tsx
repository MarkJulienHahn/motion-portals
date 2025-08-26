import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function RotatingModel({
  url,
  scale = 1,
  position = [0, 0, 0],
}: {
  url: string;
  scale?: number;
  position?: [number, number, number];
}) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Object3D>(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
    }
  });

  return <primitive ref={ref} object={scene} scale={scale} position={position} />;
}
