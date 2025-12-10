import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function RotatingModel({ url, scale = 1, position = [0,0,0] }) {
  const ref = useRef(null);
  const [scene, setScene] = useState(null);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(
      url,
      gltf => setScene(gltf.scene),
      undefined,
      err => console.error("GLB load error:", err)
    );
  }, [url]);

  useFrame(() => { if(ref.current) ref.current.rotation.y += 0.005; });

  if (!scene) return null; // no <div> inside canvas

  return <primitive ref={ref} object={scene} scale={scale} position={position} />;
}
