import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Preload, Html } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';
import Avatar3D from './Avatar3D';
import Particles3D from './Particles3D';

class AvatarErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <group position={[this.props.isMobile ? 0 : 0.8, 0, 0]}>
          <Html center position={[0, 1, 0]}>
            <div style={{ color: 'white', background: 'rgba(0,0,0,0.7)', padding: '15px', borderRadius: '8px', textAlign: 'center', width: 'max-content' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#ff6b6b' }}>3D Avatar Missing</h3>
              <p style={{ margin: '0', fontSize: '13px' }}>Please generate your realistic 3D model</p>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px' }}>and save it as <strong>public/avatar.glb</strong></p>
            </div>
          </Html>
        </group>
      );
    }
    return this.props.children;
  }
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Camera animation rig — static distance to prevent zooming/clipping,
 * with only a very subtle tilt down to feel cinematic.
 */
function CameraRig({ reducedMotion }) {
  const startTime = useRef(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (startTime.current === null) startTime.current = time;
    const elapsed = time - startTime.current;

    // Character center is at Y=0.9
    const camX = 0;
    const camZ = 5.0; // Stay far enough back to see full 1.8m body

    if (reducedMotion) {
      state.camera.position.set(camX, 1.0, camZ);
      state.camera.lookAt(0, 0.9, 0);
      return;
    }

    // Subtle pan down during the turn (no zoom)
    const camStartY = 1.2;
    const camEndY = 1.0;
    const lookStartY = 1.1;
    const lookEndY = 0.9;

    if (elapsed < 1.0) {
      state.camera.position.set(camX, camStartY, camZ);
      state.camera.lookAt(0, lookStartY, 0);
    } else if (elapsed < 4.0) {
      const t = Math.min((elapsed - 1.0) / 3.0, 1);
      const eased = easeInOutCubic(t);

      state.camera.position.set(
        camX,
        THREE.MathUtils.lerp(camStartY, camEndY, eased),
        camZ
      );
      state.camera.lookAt(
        0,
        THREE.MathUtils.lerp(lookStartY, lookEndY, eased),
        0
      );
    } else {
      // Idle phase: tiny floating movement
      const drift = Math.sin(elapsed * 0.4) * 0.01;
      state.camera.position.set(camX, camEndY + drift, camZ);
      state.camera.lookAt(0, lookEndY, 0);
    }
  });

  return null;
}

function LightingRig() {
  return (
    <>
      <ambientLight intensity={0.4} color="#b8b8d0" />
      <directionalLight
        position={[3, 5, 4]}
        intensity={1.5}
        color="#ffffff"
        castShadow={false}
      />
      <directionalLight
        position={[-4, 2, 0]}
        intensity={0.6}
        color="#8888ff"
      />
      <directionalLight
        position={[0, 3, -5]}
        intensity={1.0}
        color="#7c6fff"
      />
      <pointLight
        position={[0, -0.5, 2]}
        intensity={0.5}
        color="#5544aa"
        distance={6}
      />
    </>
  );
}

function GroundPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial
        color="#08080e"
        roughness={0.9}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

export default function Scene3D({ reducedMotion, isMobile }) {
  return (
    <Canvas
      className="scene3d-canvas"
      camera={{
        fov: isMobile ? 55 : 45,
        near: 0.1,
        far: 100,
        position: [0, 1.2, 5.0],
      }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
      }}
    >
      <Suspense fallback={null}>
        <CameraRig reducedMotion={reducedMotion} />
        <LightingRig />
        <AvatarErrorBoundary isMobile={isMobile}>
          <Avatar3D reducedMotion={reducedMotion} isMobile={isMobile} />
        </AvatarErrorBoundary>
        <Particles3D isMobile={isMobile} count={80} />
        <GroundPlane />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
