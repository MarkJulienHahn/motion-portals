import { useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";

export default function RotatingModel({ url, scale = 1, position = [0, 0, 0] }) {
  const { scene } = useGLTF(url, true);
  const ref = useRef(null);

  // Rotation
  useEffect(() => {
    const handle = () => {
      if (ref.current) {
        ref.current.rotation.y += 0.005;
      }
    };
    const id = requestAnimationFrame(handle);
    return () => cancelAnimationFrame(id);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scene) {
        scene.traverse((obj) => {
          if (obj.isMesh) {
            obj.geometry.dispose();
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m) => m.dispose());
            } else if (obj.material) {
              obj.material.dispose();
            }
          }
        });
      }
    };
  }, [scene]);

  return <primitive ref={ref} object={scene} scale={scale} position={position} />;
}
