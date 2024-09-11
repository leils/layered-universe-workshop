'use client'
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage } from "@react-three/drei";

function Model() {
  const gltf = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/suzanne-high-poly/model.gltf");
  return <primitive object={gltf.scene} scale={2} />;
}

export default function Home() {
  return (
    <main className="w-full h-screen ">
      <div className="absolute flex flex-col items-center justify-between text-left left-28 top-20">
          <h2 className="mb-3 text-2xl font-semibold">
            The Layered Universe{" "}
          </h2>
          <p className="m-0 text-balance text-sm opacity-50">
            description
          </p>
      </div>

      <Canvas className="w-full h-full" camera={{ position: [0, 0, 10], fov: 50 }}>
          <Stage environment="city" intensity={0.6} contactShadow={false}>
            <Model />
          </Stage>
        <OrbitControls/>
      </Canvas>
    </main>
  );
}
