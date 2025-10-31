/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unknown-property */
import { Suspense, useRef, useLayoutEffect, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useLoader, useThree, invalidate } from '@react-three/fiber';
import { OrbitControls, useGLTF, useFBX, useProgress, Html, Environment, ContactShadows } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as THREE from 'three';

const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
const deg2rad = (d) => (d * Math.PI) / 180;
const DECIDE = 8;
const ROTATE_SPEED = 0.005;
const INERTIA = 0.925;
const PARALLAX_MAG = 0.05;
const PARALLAX_EASE = 0.12;
const HOVER_MAG = deg2rad(6);
const HOVER_EASE = 0.15;

const Loader = ({ placeholderSrc }) => {
  const { progress, active } = useProgress();
  if (!active && placeholderSrc) return null;
  return (
    <Html center>
      {placeholderSrc ? (
        <img src={placeholderSrc} width={128} height={128} style={{ filter: 'blur(8px)', borderRadius: 8 }} />
      ) : (
        `${Math.round(progress)} %`
      )}
    </Html>
  );
};

const DesktopControls = ({ pivot, min, max, zoomEnabled }) => {
  const ref = useRef(null);
  useFrame(() => ref.current?.target.copy(pivot));
  return (
    <OrbitControls
      ref={ref}
      makeDefault
      enablePan={false}
      enableRotate={false}
      enableZoom={zoomEnabled}
      minDistance={min}
      maxDistance={max}
    />
  );
};

const ModelInner = ({
  url,
  xOff,
  yOff,
  pivot,
  initYaw,
  initPitch,
  minZoom,
  maxZoom,
  scaleMultiplier,
  enableMouseParallax,
  enableManualRotation,
  enableHoverRotation,
  enableManualZoom,
  autoFrame,
  fadeIn,
  autoRotate,
  autoRotateSpeed,
  onLoaded
}) => {
  const outer = useRef(null);
  const inner = useRef(null);
  const { camera, gl } = useThree();

  const vel = useRef({ x: 0, y: 0 });
  const tPar = useRef({ x: 0, y: 0 });
  const cPar = useRef({ x: 0, y: 0 });
  const tHov = useRef({ x: 0, y: 0 });
  const cHov = useRef({ x: 0, y: 0 });

  const ext = useMemo(() => url.split('.').pop().toLowerCase(), [url]);
  const content = useMemo(() => {
    if (ext === 'glb' || ext === 'gltf') return useGLTF(url).scene.clone();
    if (ext === 'fbx') return useFBX(url).clone();
    if (ext === 'obj') return useLoader(OBJLoader, url).clone();
    console.error('ModelViewer: unsupported format', ext);
    return null;
  }, [url, ext]);

  const pivotW = useRef(new THREE.Vector3());
  useLayoutEffect(() => {
    if (!content) return;
    const g = inner.current;
    g.clear();
    g.add(content);
    g.updateWorldMatrix(true, true);

    const sphere = new THREE.Box3().setFromObject(g).getBoundingSphere(new THREE.Sphere());
    const scale = 1 / (sphere.radius * 2);
    g.position.set(-sphere.center.x, -sphere.center.y, -sphere.center.z);
    g.scale.setScalar(scale * scaleMultiplier);

    g.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        if (fadeIn) {
          o.material.transparent = true;
          o.material.opacity = 0;
        }
      }
    });

    g.getWorldPosition(pivotW.current);
    pivot.copy(pivotW.current);
    outer.current.rotation.set(initPitch, initYaw, 0);

    if (autoFrame && camera.isPerspectiveCamera) {
      const persp = camera;
      const fitR = sphere.radius * scale;
      const distance = (fitR * 1.2) / Math.sin((persp.fov * Math.PI) / 180 / 2);
      persp.position.set(pivotW.current.x, pivotW.current.y, pivotW.current.z + distance);
      persp.near = distance / 10;
      persp.far = distance * 10;
      persp.updateProjectionMatrix();
    }

    if (fadeIn) {
      let t = 0;
      const id = setInterval(() => {
        t += 0.05;
        const opacity = Math.min(t, 1);
        g.traverse((o) => {
          if (o.isMesh) o.material.opacity = opacity;
        });
        invalidate();
        if (opacity === 1) {
          clearInterval(id);
          onLoaded?.();
        }
      }, 16);
      return () => clearInterval(id);
    }

    onLoaded?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  useEffect(() => {
    if (!enableManualRotation || isTouch) return;
    const el = gl.domElement;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const down = (event) => {
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      window.addEventListener('pointerup', up);
    };

    const move = (event) => {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
      outer.current.rotation.y += dx * ROTATE_SPEED;
      outer.current.rotation.x = THREE.MathUtils.clamp(
        outer.current.rotation.x + dy * ROTATE_SPEED,
        -Math.PI / 2.2,
        Math.PI / 2.2
      );
      vel.current = { x: dx * ROTATE_SPEED, y: dy * ROTATE_SPEED };
      invalidate();
    };

    const up = () => {
      dragging = false;
      window.removeEventListener('pointerup', up);
    };

    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    return () => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [gl, enableManualRotation]);

  useEffect(() => {
    if (!enableManualRotation || !isTouch) return;
    const el = gl.domElement;
    const touches = new Map();

    let mode = 'idle';
    let startX = 0,
      startY = 0,
      lastX = 0,
      lastY = 0,
      startDist = 0,
      startZoom = 0;

    const down = (event) => {
      if (event.pointerType !== 'touch') return;
      touches.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (touches.size === 1) {
        mode = 'decide';
        startX = lastX = event.clientX;
        startY = lastY = event.clientY;
      } else if (touches.size === 2 && enableManualZoom) {
        mode = 'pinch';
        const [a, b] = [...touches.values()];
        startDist = Math.hypot(a.x - b.x, a.y - b.y);
        startZoom = camera.position.z;
        event.preventDefault();
      }
      invalidate();
    };

    const move = (event) => {
      const touch = touches.get(event.pointerId);
      if (!touch) return;
      touch.x = event.clientX;
      touch.y = event.clientY;

      if (mode === 'decide') {
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;
        if (Math.abs(dx) > DECIDE || Math.abs(dy) > DECIDE) {
          if (enableManualRotation && Math.abs(dx) > Math.abs(dy)) {
            mode = 'rotate';
            el.setPointerCapture(event.pointerId);
          } else {
            mode = 'idle';
            touches.clear();
          }
        }
      }

      if (mode === 'rotate') {
        event.preventDefault();
        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;
        lastX = event.clientX;
        lastY = event.clientY;
        outer.current.rotation.y += dx * ROTATE_SPEED;
        outer.current.rotation.x = THREE.MathUtils.clamp(
          outer.current.rotation.x + dy * ROTATE_SPEED,
          -Math.PI / 2.2,
          Math.PI / 2.2
        );
        vel.current = { x: dx * ROTATE_SPEED, y: dy * ROTATE_SPEED };
        invalidate();
      } else if (mode === 'pinch' && touches.size === 2) {
        event.preventDefault();
        const [a, b] = [...touches.values()];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        const ratio = startDist / Math.max(distance, 0.001);
        camera.position.z = THREE.MathUtils.clamp(startZoom * ratio, minZoom, maxZoom);
        invalidate();
      }
    };

    const up = (event) => {
      touches.delete(event.pointerId);
      if (mode === 'rotate' && touches.size === 0) mode = 'idle';
      if (mode === 'pinch' && touches.size < 2) mode = 'idle';
    };

    el.addEventListener('pointerdown', down, { passive: true });
    window.addEventListener('pointermove', move, { passive: false });
    window.addEventListener('pointerup', up, { passive: true });
    window.addEventListener('pointercancel', up, { passive: true });
    return () => {
      el.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
  }, [gl, enableManualRotation, enableManualZoom, minZoom, maxZoom, camera]);

  useEffect(() => {
    if (isTouch) return;
    const handleMove = (event) => {
      if (event.pointerType !== 'mouse') return;
      const nx = (event.clientX / window.innerWidth) * 2 - 1;
      const ny = (event.clientY / window.innerHeight) * 2 - 1;
      if (enableMouseParallax) tPar.current = { x: -nx * PARALLAX_MAG, y: -ny * PARALLAX_MAG };
      if (enableHoverRotation) tHov.current = { x: ny * HOVER_MAG, y: nx * HOVER_MAG };
      invalidate();
    };
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, [enableMouseParallax, enableHoverRotation]);

  useFrame((_, dt) => {
    let needsUpdate = false;
    cPar.current.x += (tPar.current.x - cPar.current.x) * PARALLAX_EASE;
    cPar.current.y += (tPar.current.y - cPar.current.y) * PARALLAX_EASE;
    const prevHoverX = cHov.current.x;
    const prevHoverY = cHov.current.y;
    cHov.current.x += (tHov.current.x - cHov.current.x) * HOVER_EASE;
    cHov.current.y += (tHov.current.y - cHov.current.y) * HOVER_EASE;

    outer.current.position.copy(pivotW.current);
    outer.current.position.x += xOff + cPar.current.x;
    outer.current.position.y += yOff + cPar.current.y;

    outer.current.rotation.x = THREE.MathUtils.clamp(
      outer.current.rotation.x + (cHov.current.x - prevHoverX),
      -Math.PI / 2.2,
      Math.PI / 2.2
    );
    outer.current.rotation.y += cHov.current.y - prevHoverY;

    if (autoRotate) {
      outer.current.rotation.y += autoRotateSpeed * dt;
      needsUpdate = true;
    }

    outer.current.rotation.y += vel.current.x;
    outer.current.rotation.x = THREE.MathUtils.clamp(
      outer.current.rotation.x + vel.current.y,
      -Math.PI / 2.2,
      Math.PI / 2.2
    );
    vel.current.x *= INERTIA;
    vel.current.y *= INERTIA;

    if (Math.abs(vel.current.x) > 1e-4 || Math.abs(vel.current.y) > 1e-4) needsUpdate = true;
    if (
      Math.abs(cPar.current.x - tPar.current.x) > 1e-4 ||
      Math.abs(cPar.current.y - tPar.current.y) > 1e-4 ||
      Math.abs(cHov.current.x - tHov.current.x) > 1e-4 ||
      Math.abs(cHov.current.y - tHov.current.y) > 1e-4
    )
      needsUpdate = true;

    if (needsUpdate) invalidate();
  });

  if (!content) return null;
  return (
    <group ref={outer}>
      <group ref={inner}>
        <primitive object={content} />
      </group>
    </group>
  );
};

const ModelViewer = ({
  url,
  width = 400,
  height = 400,
  modelXOffset = 0,
  modelYOffset = 0,
  defaultRotationX = -50,
  defaultRotationY = 20,
  defaultZoom = 0.5,
  minZoomDistance = 0.5,
  maxZoomDistance = 10,
  scaleMultiplier = 1,
  enableMouseParallax = true,
  enableManualRotation = true,
  enableHoverRotation = true,
  enableManualZoom = true,
  ambientIntensity = 0.3,
  keyLightIntensity = 1,
  fillLightIntensity = 0.5,
  rimLightIntensity = 0.8,
  environmentPreset = 'forest',
  autoFrame = false,
  fadeIn = false,
  autoRotate = false,
  autoRotateSpeed = 0.35,
  showScreenshotButton = true,
  placeholderSrc,
  onModelLoaded
}) => {
  useEffect(() => {
    if (url.endsWith('.glb') || url.endsWith('.gltf')) {
      useGLTF.preload(url);
    }
  }, [url]);

  const pivot = useRef(new THREE.Vector3()).current;
  const contactRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);

  const initYaw = deg2rad(defaultRotationX);
  const initPitch = deg2rad(defaultRotationY);
  const camZ = Math.min(Math.max(defaultZoom, minZoomDistance), maxZoomDistance);

  const capture = () => {
    const renderer = rendererRef.current;
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    if (!renderer || !scene || !camera) return;
    renderer.shadowMap.enabled = false;
    const lights = [];
    scene.traverse((o) => {
      if (o.isLight && 'castShadow' in o) {
        lights.push({ light: o, castShadow: o.castShadow });
        o.castShadow = false;
      }
    });
    if (contactRef.current) contactRef.current.visible = false;
    renderer.render(scene, camera);
    const urlPNG = renderer.domElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'model.png';
    link.href = urlPNG;
    link.click();
    renderer.shadowMap.enabled = true;
    lights.forEach(({ light, castShadow }) => {
      light.castShadow = castShadow;
    });
    if (contactRef.current) contactRef.current.visible = true;
    invalidate();
  };

  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        touchAction: 'pan-y pinch-zoom'
      }}
    >
      {showScreenshotButton && (
        <button
          onClick={capture}
          style={{
            position: 'absolute',
            right: 16,
            top: 16,
            zIndex: 10,
            cursor: 'pointer',
            padding: '8px 16px',
            borderRadius: 10,
            border: '1px solid rgba(148, 163, 184, 0.35)',
            background: 'rgba(3,7,18,0.75)',
            color: '#e2e8f0'
          }}
        >
          Screenshot
        </button>
      )}

      <Canvas
        shadows
        frameloop="demand"
        gl={{ preserveDrawingBuffer: true }}
        onCreated={({ gl, scene, camera }) => {
          rendererRef.current = gl;
          sceneRef.current = scene;
          cameraRef.current = camera;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
        camera={{ fov: 50, position: [0, 0, camZ], near: 0.01, far: 100 }}
        style={{ touchAction: 'pan-y pinch-zoom' }}
      >
        {environmentPreset !== 'none' && <Environment preset={environmentPreset} background={false} />}

        <ambientLight intensity={ambientIntensity} />
        <directionalLight position={[5, 5, 5]} intensity={keyLightIntensity} castShadow />
        <directionalLight position={[-5, 2, 5]} intensity={fillLightIntensity} />
        <directionalLight position={[0, 4, -5]} intensity={rimLightIntensity} />

        <ContactShadows ref={contactRef} position={[0, -0.5, 0]} opacity={0.35} scale={10} blur={2} />

        <Suspense fallback={<Loader placeholderSrc={placeholderSrc} />}>
          <ModelInner
            url={url}
            xOff={modelXOffset}
            yOff={modelYOffset}
            pivot={pivot}
            initYaw={initYaw}
            initPitch={initPitch}
            minZoom={minZoomDistance}
            maxZoom={maxZoomDistance}
            scaleMultiplier={scaleMultiplier}
            enableMouseParallax={enableMouseParallax}
            enableManualRotation={enableManualRotation}
            enableHoverRotation={enableHoverRotation}
            enableManualZoom={enableManualZoom}
            autoFrame={autoFrame}
            fadeIn={fadeIn}
            autoRotate={autoRotate}
            autoRotateSpeed={autoRotateSpeed}
            onLoaded={onModelLoaded}
          />
        </Suspense>

        {!isTouch && <DesktopControls pivot={pivot} min={minZoomDistance} max={maxZoomDistance} zoomEnabled={enableManualZoom} />}
      </Canvas>
    </div>
  );
};

export default ModelViewer;
