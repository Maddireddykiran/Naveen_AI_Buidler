"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Float, PresentationControls, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function AIBrainModel(props: any) {
  // Use a placeholder model or create your own
  // You can replace this with an actual AI brain model
  const group = useRef<THREE.Group>(null);
  const brainCore = useRef<THREE.Mesh>(null);
  const outerLayer = useRef<THREE.Mesh>(null);
  const nodeRefs = useRef<THREE.Mesh[]>([]);
  const lineRefs = useRef<THREE.Line[]>([]);
  
  // Get scroll animation data
  const { scrollY, scrollDirection, scrollProgress } = useScrollAnimation();
  const [pulseIntensity, setPulseIntensity] = useState(0.5);
  
  // Animate based on scroll
  useEffect(() => {
    if (scrollDirection === "up") {
      setPulseIntensity(Math.min(1.5, pulseIntensity + 0.2));
    } else if (scrollDirection === "down") {
      setPulseIntensity(Math.max(0.3, pulseIntensity - 0.1));
    }
  }, [scrollDirection, pulseIntensity]);
  
  // Create brain-like structure using spheres and connections with animations
  useFrame((state, delta) => {
    if (group.current) {
      // Base rotation
      group.current.rotation.y += delta * 0.15;
      
      // Scroll-based animations
      if (scrollDirection === "up") {
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -0.2, 0.05);
        group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, 1.1, 0.05));
      } else if (scrollDirection === "down") {
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0.2, 0.05);
        group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, 0.95, 0.05));
      } else {
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0, 0.05);
        group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, 1, 0.05));
      }
    }
    
    // Animate brain core
    if (brainCore.current) {
      brainCore.current.rotation.z += delta * 0.05;
      brainCore.current.rotation.x += delta * 0.03;
    }
    
    // Animate outer layer
    if (outerLayer.current) {
      outerLayer.current.rotation.y -= delta * 0.03;
      outerLayer.current.rotation.z -= delta * 0.02;
      (outerLayer.current.material as THREE.MeshStandardMaterial).opacity = 0.1 + Math.sin(state.clock.elapsedTime) * 0.05;
    }
    
    // Animate nodes
    nodeRefs.current.forEach((node, i) => {
      if (node) {
        const time = state.clock.elapsedTime;
        const offset = i * 0.2;
        node.position.y += Math.sin(time + offset) * 0.001;
        node.position.x += Math.cos(time + offset) * 0.001;
        (node.material as THREE.MeshStandardMaterial).emissiveIntensity = 
          0.8 + Math.sin(time * 2 + offset) * 0.2 * pulseIntensity;
      }
    });
  });

  return (
    <PresentationControls
      global
      rotation={[0.13, 0.1, 0]}
      polar={[-0.4, 0.2]}
      azimuth={[-1, 0.75]}
      config={{ mass: 2, tension: 400 }}
      snap={{ mass: 4, tension: 400 }}
    >
      <Float rotationIntensity={0.4}>
        <group ref={group} {...props} dispose={null}>
          {/* AI brain core with distortion effect */}
          <mesh ref={brainCore} position={[0, 0, 0]}>
            <sphereGeometry args={[1.3, 64, 64]} />
            <MeshDistortMaterial
              color="#4338ca"
              emissive="#3b0764"
              emissiveIntensity={0.7}
              metalness={0.8}
              roughness={0.2}
              wireframe={true}
              distort={0.3} // Amount of distortion
              speed={2} // Speed of distortion
            />
          </mesh>
          
          {/* Neural network structure */}
          <mesh position={[0, 0, 0]}>
            <icosahedronGeometry args={[1.5, 1]} />
            <meshStandardMaterial
              color="#4338ca"
              wireframe={true}
              transparent
              opacity={0.3}
              emissive="#4338ca"
            />
          </mesh>
          
          {/* Digital circuit patterns */}
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 4, 0, Math.PI / 6]}>
            <torusGeometry args={[1.8, 0.05, 16, 100]} />
            <meshStandardMaterial
              color="#818cf8"
              emissive="#818cf8"
              emissiveIntensity={1}
            />
          </mesh>
          
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, Math.PI / 4, 0]}>
            <torusGeometry args={[1.8, 0.05, 16, 100]} />
            <meshStandardMaterial
              color="#818cf8"
              emissive="#818cf8"
              emissiveIntensity={1}
            />
          </mesh>
          
          {/* Neural network nodes with references for animation */}
          {Array.from({ length: 30 }).map((_, i) => {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            const radius = 1.5 + Math.random() * 0.5;
            
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);
            
            return (
              <mesh 
                key={i} 
                position={[x, y, z]}
                ref={(el: THREE.Mesh | null) => {
                  if (el) nodeRefs.current[i] = el;
                }}
              >
                <sphereGeometry args={[0.05 + Math.random() * 0.05, 16, 16]} />
                <meshStandardMaterial 
                  color={i % 3 === 0 ? "#818cf8" : i % 3 === 1 ? "#a5b4fc" : "#60a5fa"}
                  emissive={i % 3 === 0 ? "#818cf8" : i % 3 === 1 ? "#a5b4fc" : "#60a5fa"}
                  emissiveIntensity={1}
                />
              </mesh>
            );
          })}
          
          {/* Neural connections with more complex paths */}
          {Array.from({ length: 40 }).map((_, i) => {
            const startTheta = Math.random() * Math.PI * 2;
            const startPhi = Math.random() * Math.PI;
            const startRadius = 1.5;
            
            const endTheta = Math.random() * Math.PI * 2;
            const endPhi = Math.random() * Math.PI;
            const endRadius = 1.5;
            
            const startX = startRadius * Math.sin(startPhi) * Math.cos(startTheta);
            const startY = startRadius * Math.sin(startPhi) * Math.sin(startTheta);
            const startZ = startRadius * Math.cos(startPhi);
            
            const endX = endRadius * Math.sin(endPhi) * Math.cos(endTheta);
            const endY = endRadius * Math.sin(endPhi) * Math.sin(endTheta);
            const endZ = endRadius * Math.cos(endPhi);
            
            // Create a more complex curve with multiple control points
            const midPoint1 = new THREE.Vector3(
              (startX + endX) / 2 + (Math.random() - 0.5) * 0.8,
              (startY + endY) / 2 + (Math.random() - 0.5) * 0.8,
              (startZ + endZ) / 2 + (Math.random() - 0.5) * 0.8
            );
            
            const midPoint2 = new THREE.Vector3(
              (startX + endX) / 2 + (Math.random() - 0.5) * 0.8,
              (startY + endY) / 2 + (Math.random() - 0.5) * 0.8,
              (startZ + endZ) / 2 + (Math.random() - 0.5) * 0.8
            );
            
            const curve = new THREE.CatmullRomCurve3([
              new THREE.Vector3(startX, startY, startZ),
              midPoint1,
              midPoint2,
              new THREE.Vector3(endX, endY, endZ)
            ]);
            
            const points = curve.getPoints(30);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            
            const lineMaterial = new THREE.LineBasicMaterial({
              color: i % 3 === 0 ? "#a5b4fc" : i % 3 === 1 ? "#60a5fa" : "#818cf8",
              transparent: true,
              opacity: 0.4 + Math.random() * 0.4,
              linewidth: 1
            });
            
            const line = new THREE.Line(geometry, lineMaterial);
            
            return (
              <group key={i + 100}>
                <primitive 
                  object={line} 
                  ref={(el: THREE.Line | null) => {
                    if (el) lineRefs.current[i] = el;
                  }}
                />
              </group>
            );
          })}
          
          {/* Data flow particles */}
          {Array.from({ length: 10 }).map((_, i) => {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            const radius = 1.5 + Math.random() * 0.8;
            
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);
            
            return (
              <mesh key={i + 200} position={[x, y, z]}>
                <boxGeometry args={[0.1, 0.1, 0.1]} />
                <MeshWobbleMaterial 
                  color="#60a5fa"
                  emissive="#60a5fa"
                  emissiveIntensity={1.5}
                  factor={1} // Wobble factor
                  speed={i * 0.5} // Wobble speed
                />
              </mesh>
            );
          })}
          
          {/* Pulsing outer aura */}
          <mesh ref={outerLayer}>
            <sphereGeometry args={[1.9, 32, 32]} />
            <meshStandardMaterial 
              color="#4338ca"
              transparent
              opacity={0.1}
              emissive="#4338ca"
              emissiveIntensity={0.3 * pulseIntensity}
            />
          </mesh>
        </group>
      </Float>
    </PresentationControls>
  );
}

export default AIBrainModel;
