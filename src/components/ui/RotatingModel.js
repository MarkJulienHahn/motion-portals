import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function RotatingModel({
  url,
  scale = 1,
  position = [0, 0, 0],
}) {
  const { scene } = useGLTF(url);
  const ref = useRef(null);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005;
    }
  });

  return (
    <primitive ref={ref} object={scene} scale={scale} position={position} />
  );
}
