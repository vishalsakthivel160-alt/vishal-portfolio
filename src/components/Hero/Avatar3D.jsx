import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Html } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Avatar3D
 * This component is structured to load a TRUE 3D rigged character (.glb)
 * and play the requested cinematic animation sequence.
 * 
 * IMPORTANT: A single 2D photo cannot automatically become a rigged 3D human in code.
 * You MUST generate a 3D avatar (e.g., using ReadyPlayerMe, in3D, or MetaHuman)
 * and place it in the public/ folder as 'avatar.glb'.
 */
export default function Avatar3D({ reducedMotion, isMobile }) {
  const groupRef = useRef();
  
  // We expect the user to provide a rigged 3D model named 'avatar.glb' in the public directory.
  // The model should ideally contain animations: 'Turn', 'Walk', 'FoldArms', 'Idle'.
  // If the file is missing, useGLTF will throw an error caught by Suspense or error boundary.
  const { scene, animations } = useGLTF('/avatar.glb', true, true, (error) => {
    console.warn("Avatar GLB not found. Please place 'avatar.glb' in the public folder.");
  });

  const { actions } = useAnimations(animations, groupRef);
  
  const startTime = useRef(null);
  const [phase, setPhase] = useState('init');

  // Offset character to the right on desktop to avoid text overlap
  const charX = isMobile ? 0 : 0.8;
  const startZ = -2.0; // Start further back
  const endZ = 0.0;    // Walk forward to this Z

  useEffect(() => {
    // If the model has standard animation names, we can hook them up.
    // We safely check if they exist before playing them.
    const idleAction = actions?.['Idle'];
    const walkAction = actions?.['Walk'];
    const foldArmsAction = actions?.['FoldArms'];

    // For now, if there are animations, just play the first one as a fallback
    if (animations.length > 0 && !idleAction && !walkAction && !foldArmsAction) {
      actions[animations[0].name]?.play();
    }
  }, [actions, animations]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;
    if (startTime.current === null) startTime.current = time;
    const elapsed = time - startTime.current;

    if (reducedMotion) {
      groupRef.current.rotation.y = 0;
      groupRef.current.position.set(charX, 0, endZ);
      return;
    }

    // ANIMATION TIMELINE
    // 1. BACK VIEW (0 - 1s)
    if (elapsed < 1.0) {
      groupRef.current.rotation.y = Math.PI; // Facing away
      groupRef.current.position.set(charX, 0, startZ);
    }
    // 2. SLOW NATURAL TURN (1s - 3s)
    else if (elapsed < 3.0) {
      const t = (elapsed - 1.0) / 2.0;
      // Smooth easing
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      groupRef.current.rotation.y = Math.PI * (1 - eased);
      groupRef.current.position.set(charX, 0, startZ);
    }
    // 3. SMALL MOVEMENT TOWARD CAMERA (3s - 5s)
    else if (elapsed < 5.0) {
      groupRef.current.rotation.y = 0; // Fully facing front
      const t = (elapsed - 3.0) / 2.0;
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const currentZ = THREE.MathUtils.lerp(startZ, endZ, eased);
      groupRef.current.position.set(charX, 0, currentZ);
      
      // Ideally, trigger 'Walk' animation here via state
    }
    // 4. STOP & FOLD ARMS (5s+)
    else {
      groupRef.current.rotation.y = 0;
      groupRef.current.position.set(charX, 0, endZ);
      // Ideally, trigger 'FoldArms' and then 'Idle' here via state
    }
  });

  // Ensure materials cast/receive shadows if the model loads
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  // If the model hasn't loaded (or doesn't exist), we render nothing (or an empty group)
  // to avoid rendering a generic mannequin.
  if (!scene) {
    return (
      <group position={[charX, 0, 0]}>
        <Html center position={[0, 1, 0]}>
          <div style={{ color: 'white', background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '5px', textAlign: 'center' }}>
            <p>3D Avatar Required</p>
            <p style={{fontSize: '12px'}}>Please place avatar.glb in /public</p>
          </div>
        </Html>
      </group>
    );
  }

  return (
    <group ref={groupRef} position={[charX, 0, startZ]} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

// Preload the model to avoid pop-in if it exists
useGLTF.preload('/avatar.glb');
