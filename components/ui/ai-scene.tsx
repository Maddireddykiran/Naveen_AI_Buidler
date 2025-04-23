"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Stars, useProgress, Html } from "@react-three/drei";
import AIBrainModel from "./ai-brain-model";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Loading component for 3D scene
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-purple-600"></div>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
          {progress.toFixed(0)}% loaded
        </p>
      </div>
    </Html>
  );
}

export function AIScene() {
  const { scrollDirection } = useScrollAnimation();
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 6]);
  
  // Update camera position based on scroll direction
  useEffect(() => {
    if (scrollDirection === "up") {
      setCameraPosition([0, 0.3, 5.7] as [number, number, number]);
    } else if (scrollDirection === "down") {
      setCameraPosition([0, -0.3, 6.3] as [number, number, number]);
    } else {
      setCameraPosition([0, 0, 6] as [number, number, number]);
    }
  }, [scrollDirection]);
  
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-xl md:h-[500px] lg:h-[600px]">
      {/* Digital circuit pattern overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black/20 opacity-50"></div>
      <div className="pointer-events-none absolute inset-0 z-10 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
      
      <Canvas
        camera={{ position: cameraPosition, fov: 40 }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        className="h-full w-full"
        shadows
      >
        <Suspense fallback={<Loader />}>
          {/* Enhanced lighting */}
          <ambientLight intensity={0.4} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1.5}
            castShadow
            color="#a78bfa"
          />
          <spotLight
            position={[-10, -10, -10]}
            angle={0.15}
            penumbra={1}
            intensity={0.8}
            castShadow
            color="#60a5fa"
          />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#818cf8" />
          
          {/* Background stars */}
          <Stars
            radius={100}
            depth={50}
            count={1000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          
          {/* AI Brain Model */}
          <AIBrainModel position={[0, 0, 0]} scale={1} />
          
          <Environment preset="night" />
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={10}
            blur={1.5}
            far={2}
            color="#4338ca"
          />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.8}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
      
      {/* Floating data particles */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute h-1 w-1 rounded-full bg-purple-500 opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px 2px rgba(168, 85, 247, 0.4)',
              animation: `float-${i % 3} ${5 + Math.random() * 10}s linear infinite`,
            }}
          />
        ))}
      </div>
      
      {/* Floating text labels */}
      <div className="pointer-events-none absolute bottom-4 left-4 z-20 text-xs font-light text-white/70">
        <div className="mb-1 flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-purple-500"></div>
          <span>Neural Network</span>
        </div>
        <div className="mb-1 flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
          <span>Data Processing</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
          <span>Machine Learning</span>
        </div>
      </div>
    </div>
  );
}

export default AIScene;
