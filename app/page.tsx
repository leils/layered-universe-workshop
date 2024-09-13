'use client'
import React, { useMemo } from 'react'
import { Canvas } from "@react-three/fiber";
import { MeshStandardMaterial } from "three";
import { Environment, Center, AccumulativeShadows, RandomizedLight, OrbitControls, useGLTF, useFBX } from "@react-three/drei";

function Model() {
  // CHANGE MODEL
  //const { scene } = useGLTF("/tiger/scene.gltf");
   const { scene } = useGLTF("https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/suzanne-high-poly/model.gltf");

    
  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new MeshStandardMaterial({
          color: 0xffd700,  // GOLD COLOR
          metalness: 1,
          roughness: 0.1,
        })
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene])

  return <primitive object={scene} scale={1.5}/>
}

export default function Home() {
  return (
    <main className="w-full h-screen ">
      <div className="absolute flex flex-col items-center justify-between text-left left-28 top-20">
          <h2 className="mb-3 text-2xl font-semibold text-white">
            The Layered Universe
          </h2>
      </div>

      <Canvas shadows camera={{ position: [4, 1.5, 8], fov: 35 }}>
        <group position={[0, -0.5, 0]}>
          <Center top>
            <Model />
          </Center>
          <AccumulativeShadows temporal frames={100} color="orange" colorBlend={2} toneMapped={true} alphaTest={0.75} opacity={2} scale={12}>
            <RandomizedLight intensity={Math.PI} amount={8} radius={4} ambient={0.5} position={[5, 5, -10]} bias={0.001} />
          </AccumulativeShadows>
        </group>
        <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
        <Environment preset="city" />
      </Canvas>
    </main>
  );
}
