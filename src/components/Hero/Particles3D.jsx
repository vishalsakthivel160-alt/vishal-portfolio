import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Floating particle system for the hero background.
 * Creates subtle, cinematic depth with slowly drifting luminous particles.
 */
export default function Particles3D({ count = 120, isMobile = false }) {
  const meshRef = useRef();
  const actualCount = isMobile ? Math.floor(count * 0.4) : count;

  const { positions, sizes, speeds } = useMemo(() => {
    const positions = new Float32Array(actualCount * 3);
    const sizes = new Float32Array(actualCount);
    const speeds = new Float32Array(actualCount);

    for (let i = 0; i < actualCount; i++) {
      // Spread particles in a wide volume behind and around the avatar
      positions[i * 3] = (Math.random() - 0.5) * 8;      // x
      positions[i * 3 + 1] = (Math.random() - 0.3) * 5;   // y (biased upward)
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1; // z (mostly behind)

      sizes[i] = Math.random() * 0.02 + 0.005;
      speeds[i] = Math.random() * 0.3 + 0.1;
    }

    return { positions, sizes, speeds };
  }, [actualCount]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, sizes]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const posAttr = meshRef.current.geometry.attributes.position;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < actualCount; i++) {
      const speed = speeds[i];
      // Slow upward drift
      posAttr.array[i * 3 + 1] += speed * 0.001;

      // Gentle horizontal sway
      posAttr.array[i * 3] += Math.sin(time * speed + i) * 0.0003;

      // Reset particles that drift too high
      if (posAttr.array[i * 3 + 1] > 3) {
        posAttr.array[i * 3 + 1] = -2;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        color="#7c6fff"
        size={0.015}
        sizeAttenuation
        transparent
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
