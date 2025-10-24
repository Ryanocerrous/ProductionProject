import { Suspense, useRef, useLayoutEffect, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useLoader, useThree, invalidate } from '@react-three/fiber';
import { OrbitControls, Html, Environment, ContactShadows, useProgress } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
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

const loaderMap = {
  glb: GLTFLoader,
  gltf: GLTFLoader,
  fbx: FBXLoader,
  obj: OBJLoader
};

function useModelContent(url) {
  const extension = useMemo(() => url.split('.').pop().toLowerCase(), [url]);
  const LoaderClass = loaderMap[extension];

  useEffect(() => {
    if (!LoaderClass) {
      console.error(`ModelViewer: unsupported file format "${extension}". Falling back to GLTF loader.`);
    }
    if (LoaderClass && useLoader.preload) {
      useLoader.preload(LoaderClass, url);
    }
  }, [LoaderClass, url]);

  const resource = useLoader(LoaderClass ?? GLTFLoader, url);

  return useMemo(() => {
    if (!resource) return null;
    if (resource.scene) return resource.scene.clone();
    if (resource.isObject3D) return resource.clone();
    if (resource.clone) return resource.clone();
    const group = new THREE.Group();
    group.add(resource);
    return group;
  }, [resource]);
}

function Loader({ placeholderSrc }) {
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
}

function DesktopControls({ pivot, min, max, zoomEnabled }) {
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
}

function ModelInner({
  url,
  xOff,
  yOff,
  pivot,
  initYaw,
  initPitch,
  minZoom,
  maxZoom,
  defaultDistance,
  enableMouseParallax,
  enableManualRotation,
  enableHoverRotation,
  enableManualZoom,
  autoFrame,
  fadeIn,
  autoRotate,
  autoRotateSpeed,
  onLoaded
}) {
  const outer = useRef(null);
  const inner = useRef(null);
  const { camera, gl } = useThree();

  const vel = useRef({ x: 0, y: 0 });
  const tPar = useRef({ x: 0, y: 0 });
  const cPar = useRef({ x: 0, y: 0 });
  const tHov = useRef({ x: 0, y: 0 });
  const cHov = useRef({ x: 0, y: 0 });

  const content = useModelContent(url);

  const pivotW = useRef(new THREE.Vector3());
  useLayoutEffect(() => {
    if (!content) return;
    const group = inner.current;
    group.clear();
    group.add(content);
    group.updateWorldMatrix(true, true);

    const sphere = new THREE.Box3().setFromObject(group).getBoundingSphere(new THREE.Sphere());
    const safeRadius = Math.max(sphere.radius, 1e-4);
    const scale = 1 / (safeRadius * 2);
    group.position.set(-sphere.center.x, -sphere.center.y, -sphere.center.z);
    group.scale.setScalar(scale);

    group.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        if (fadeIn) {
          obj.material.transparent = true;
          obj.material.opacity = 0;
        }
      }
    });

    group.getWorldPosition(pivotW.current);
    pivot.copy(pivotW.current);
    outer.current.rotation.set(initPitch, initYaw, 0);

    if (autoFrame && camera.isPerspectiveCamera) {
      const persp = camera;
      const fitRadius = safeRadius * scale;
      const distance = (fitRadius * 1.2) / Math.sin((persp.fov * Math.PI) / 180 / 2);
      const targetDistance = defaultDistance ?? distance;
      persp.position.set(pivotW.current.x, pivotW.current.y, pivotW.current.z + targetDistance);
      persp.near = distance / 10;
      persp.far = distance * 10;
      persp.updateProjectionMatrix();
    }

    if (fadeIn) {
      let t = 0;
      const id = setInterval(() => {
        t += 0.05;
        const opacity = Math.min(t, 1);
        group.traverse((obj) => {
          if (obj.isMesh) obj.material.opacity = opacity;
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
    const canvas = gl.domElement;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const handleDown = (event) => {
      if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      window.addEventListener('pointerup', handleUp);
    };

    const handleMove = (event) => {
      if (!dragging) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
      outer.current.rotation.y += dx * ROTATE_SPEED;
      outer.current.rotation.x += dy * ROTATE_SPEED;
      vel.current = { x: dx * ROTATE_SPEED, y: dy * ROTATE_SPEED };
      invalidate();
    };

    const handleUp = () => {
      dragging = false;
      window.removeEventListener('pointerup', handleUp);
    };

    canvas.addEventListener('pointerdown', handleDown);
    canvas.addEventListener('pointermove', handleMove);
    return () => {
      canvas.removeEventListener('pointerdown', handleDown);
      canvas.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [gl, enableManualRotation]);

  useEffect(() => {
    if (!enableManualRotation || !isTouch) return;
    const canvas = gl.domElement;
    const touches = new Map();

    let mode = 'idle';
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastY = 0;
    let startDist = 0;
    let startZoom = 0;

    const handleDown = (event) => {
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
      }
      invalidate();
    };

    const handleMove = (event) => {
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
            canvas.setPointerCapture(event.pointerId);
          } else {
            mode = 'idle';
            touches.clear();
          }
        }
      }

      if (mode === 'rotate') {
        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;
        lastX = event.clientX;
        lastY = event.clientY;
        outer.current.rotation.y += dx * ROTATE_SPEED;
        outer.current.rotation.x += dy * ROTATE_SPEED;
        vel.current = { x: dx * ROTATE_SPEED, y: dy * ROTATE_SPEED };
        invalidate();
      } else if (mode === 'pinch' && touches.size === 2) {
        const [a, b] = [...touches.values()];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);
        const ratio = startDist / Math.max(distance, 0.001);
        camera.position.z = THREE.MathUtils.clamp(startZoom * ratio, minZoom, maxZoom);
        invalidate();
      }
    };

    const handleUp = (event) => {
      touches.delete(event.pointerId);
      if (mode === 'rotate' && touches.size === 0) mode = 'idle';
      if (mode === 'pinch' && touches.size < 2) mode = 'idle';
    };

    canvas.addEventListener('pointerdown', handleDown, { passive: true });
    window.addEventListener('pointermove', handleMove, { passive: false });
    window.addEventListener('pointerup', handleUp, { passive: true });
    window.addEventListener('pointercancel', handleUp, { passive: true });

    return () => {
      canvas.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('pointercancel', handleUp);
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

    const projected = pivotW.current.clone().project(camera);
    projected.x += xOff + cPar.current.x;
    projected.y += yOff + cPar.current.y;
    outer.current.position.copy(projected.unproject(camera));

    outer.current.rotation.x += cHov.current.x - prevHoverX;
    outer.current.rotation.y += cHov.current.y - prevHoverY;

    if (autoRotate) {
      outer.current.rotation.y += autoRotateSpeed * dt;
      needsUpdate = true;
    }

    outer.current.rotation.y += vel.current.x;
    outer.current.rotation.x += vel.current.y;
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
      <group ref={inner} />
    </group>
  );
}

function ModelViewer({
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
  defaultDistance,
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
  placeholderSrc,
  showScreenshotButton = true,
  fadeIn = false,
  autoRotate = false,
  autoRotateSpeed = 0.35,
  dprRange = [1, 1.5],
  showContactShadows = false,
  onModelLoaded
}) {
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
    const prevTone = renderer.toneMappingExposure;
    renderer.toneMappingExposure = 1.0;
    const wasShadowEnabled = renderer.shadowMap.enabled;
    if (wasShadowEnabled) renderer.shadowMap.enabled = false;
    const cache = [];
    scene.traverse((object) => {
      if (object.isLight && 'castShadow' in object) {
        cache.push({ light: object, castShadow: object.castShadow });
        object.castShadow = false;
      }
    });
    const hadContact = contactRef.current?.visible;
    if (contactRef.current) contactRef.current.visible = false;
    renderer.render(scene, camera);
    const dataURL = renderer.domElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'model.png';
    link.href = dataURL;
    link.click();
    renderer.toneMappingExposure = prevTone;
    if (wasShadowEnabled) renderer.shadowMap.enabled = true;
    cache.forEach(({ light, castShadow }) => (light.castShadow = castShadow));
    if (contactRef.current && hadContact !== undefined) contactRef.current.visible = hadContact;
    invalidate();
  };

  useEffect(() => {
    if (typeof width === 'number' || typeof height === 'number') return;
    invalidate();
  }, [width, height]);

  return (
    <div
      style={{
        width,
        height,
        touchAction: 'pan-y pinch-zoom',
        position: 'relative'
      }}
    >
      {showScreenshotButton && (
        <button
          type="button"
          onClick={capture}
          style={{
            position: 'absolute',
            border: '1px solid rgba(255,255,255,0.6)',
            color: '#fff',
            background: 'rgba(15, 23, 42, 0.65)',
            right: 16,
            top: 16,
            zIndex: 10,
            cursor: 'pointer',
            padding: '8px 16px',
            borderRadius: 10,
            backdropFilter: 'blur(6px)'
          }}
        >
          Take Screenshot
        </button>
      )}

      <Canvas
        shadows={showContactShadows}
        frameloop="demand"
        dpr={dprRange}
        gl={{
          preserveDrawingBuffer: showScreenshotButton,
          powerPreference: 'high-performance',
          antialias: true
        }}
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

        {showContactShadows && (
          <ContactShadows ref={contactRef} position={[0, -0.5, 0]} opacity={0.35} scale={10} blur={2} />
        )}

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

        {!isTouch && (
          <DesktopControls pivot={pivot} min={minZoomDistance} max={maxZoomDistance} zoomEnabled={enableManualZoom} />
        )}
      </Canvas>
    </div>
  );
}

export default ModelViewer;
