'use client'
import React, { useMemo } from 'react'
import { Canvas } from "@react-three/fiber";
import * as THREE from 'three'
import { Environment, Center, AccumulativeShadows, RandomizedLight, OrbitControls, useGLTF, useFBX, } from "@react-three/drei";


function Model() {
  // CHANGE MODEL
  // const { scene } = useGLTF("/tiger/scene.gltf");
  // const { scene } = useGLTF("ring.glb");
  const { scene } = useGLTF("/engraved_ring/scene.gltf");
  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const meshChild = child as THREE.Mesh;
        meshChild.material = new THREE.MeshStandardMaterial({
          color: 0xffd700,  // GOLD COLOR
          metalness: 1,
          roughness: 0.1,
        });
        meshChild.castShadow = true;
        meshChild.receiveShadow = true;
      }
    });
  }, [scene]);

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
