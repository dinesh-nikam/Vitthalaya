'use client';

import * as React from 'react';
import * as THREE from 'three';
import { Play, Pause, Sparkles, Eye } from 'lucide-react';
import { DIURNAL_LIGHT_PRESETS } from '@/src/data/luxury-data';

interface ComplicationViewerProps {
  className?: string;
  initialPreset?: 'aube' | 'zenith' | 'crepuscule' | 'nocturne';
}

export function ThreeDComplicationViewer({
  className = '',
  initialPreset = 'nocturne',
}: ComplicationViewerProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const [activeLighting, setActiveLighting] = React.useState<'aube' | 'zenith' | 'crepuscule' | 'nocturne'>(initialPreset);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [speedMultiplier, setSpeedMultiplier] = React.useState(1.0);
  const [isWireframe, setIsWireframe] = React.useState(false);

  // References to Three.js objects
  const sceneRef = React.useRef<THREE.Scene | null>(null);
  const rendererRef = React.useRef<THREE.WebGLRenderer | null>(null);
  const coreMeshRef = React.useRef<THREE.Mesh | null>(null);
  const ring1Ref = React.useRef<THREE.Mesh | null>(null);
  const ring2Ref = React.useRef<THREE.Mesh | null>(null);
  const ring3Ref = React.useRef<THREE.Mesh | null>(null);
  const particlesRef = React.useRef<THREE.Points | null>(null);
  const dirLightRef = React.useRef<THREE.DirectionalLight | null>(null);
  const pointLightRef = React.useRef<THREE.PointLight | null>(null);

  // Drag interaction state
  const isDraggingRef = React.useRef(false);
  const previousMousePositionRef = React.useRef({ x: 0, y: 0 });
  const rotationVelocityRef = React.useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    if (!containerRef.current) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsPlaying(false);
    }

    const container = containerRef.current;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 7.8);

    // 3. Renderer with antialias and alpha
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xfff8ec, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffecd0, 2.5);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);
    dirLightRef.current = dirLight;

    const pointLight = new THREE.PointLight(0xc5a059, 3.0, 15);
    pointLight.position.set(-3, -2, 2);
    scene.add(pointLight);
    pointLightRef.current = pointLight;

    // 5. Materials
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      metalness: 0.92,
      roughness: 0.18,
      wireframe: false,
    });

    const platinumMaterial = new THREE.MeshStandardMaterial({
      color: 0xe8e6e2,
      metalness: 0.95,
      roughness: 0.12,
      wireframe: false,
    });

    const gemMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.9,
      thickness: 1.2,
      ior: 2.4, // Diamond index of refraction
      reflectivity: 0.9,
    });

    // 6. Geometries & Meshes
    // Outer Armillary Gimbal
    const ring1Geo = new THREE.TorusGeometry(3.1, 0.06, 16, 100);
    const ring1 = new THREE.Mesh(ring1Geo, goldMaterial);
    scene.add(ring1);
    ring1Ref.current = ring1;

    // Middle Orthogonal Gimbal
    const ring2Geo = new THREE.TorusGeometry(2.4, 0.05, 16, 90);
    const ring2 = new THREE.Mesh(ring2Geo, platinumMaterial);
    ring2.rotation.x = Math.PI / 3;
    scene.add(ring2);
    ring2Ref.current = ring2;

    // Inner Balance Wheel with Teeth
    const ring3Geo = new THREE.TorusGeometry(1.7, 0.04, 16, 80);
    const ring3 = new THREE.Mesh(ring3Geo, goldMaterial);
    ring3.rotation.y = Math.PI / 4;
    scene.add(ring3);
    ring3Ref.current = ring3;

    // Three radial balance spokes
    for (let i = 0; i < 3; i++) {
      const spokeGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.7, 8);
      const spoke = new THREE.Mesh(spokeGeo, goldMaterial);
      spoke.rotation.z = (i * Math.PI * 2) / 3;
      ring3.add(spoke);
    }

    // Faceted Polyhedral Core Gemstone
    const coreGeo = new THREE.IcosahedronGeometry(0.95, 1);
    const coreMesh = new THREE.Mesh(coreGeo, gemMaterial);
    scene.add(coreMesh);
    coreMeshRef.current = coreMesh;

    // 7. Ambient Celestial Starlight Dust
    const particleCount = 280;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 3.6 + Math.random() * 3.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = radius * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xc5a059,
      size: 0.035,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 8. Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isPlaying) {
        const delta = 0.008 * speedMultiplier;

        if (ring1) ring1.rotation.y += delta * 0.7;
        if (ring2) {
          ring2.rotation.x += delta * 1.1;
          ring2.rotation.z += delta * 0.4;
        }
        if (ring3) ring3.rotation.z += delta * 1.6;
        if (coreMesh) {
          coreMesh.rotation.y += delta * 0.9;
          coreMesh.rotation.x += delta * 0.5;
        }
        if (particles) particles.rotation.y += delta * 0.2;
      }

      // Apply drag inertia rotation
      if (coreMesh && (Math.abs(rotationVelocityRef.current.x) > 0.0001 || Math.abs(rotationVelocityRef.current.y) > 0.0001)) {
        scene.rotation.y += rotationVelocityRef.current.x;
        scene.rotation.x += rotationVelocityRef.current.y;
        // Dampen velocity
        rotationVelocityRef.current.x *= 0.92;
        rotationVelocityRef.current.y *= 0.92;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Listener
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 10. Pointer Interactions
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      rotationVelocityRef.current = {
        x: deltaX * 0.006,
        y: deltaY * 0.006,
      };

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      coreGeo.dispose();
      particleGeo.dispose();
      goldMaterial.dispose();
      platinumMaterial.dispose();
      gemMaterial.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [isPlaying, speedMultiplier]);

  // Handle Diurnal Lighting Updates
  React.useEffect(() => {
    if (!dirLightRef.current || !pointLightRef.current) return;
    const dir = dirLightRef.current;
    const pt = pointLightRef.current;

    switch (activeLighting) {
      case 'aube':
        dir.color.setHex(0xffb87a);
        dir.intensity = 2.0;
        dir.position.set(6, 2, 4);
        pt.color.setHex(0xe59842);
        pt.intensity = 2.4;
        break;
      case 'zenith':
        dir.color.setHex(0xffffff);
        dir.intensity = 3.2;
        dir.position.set(0, 10, 3);
        pt.color.setHex(0xffe8ba);
        pt.intensity = 1.8;
        break;
      case 'crepuscule':
        dir.color.setHex(0xd4753e);
        dir.intensity = 2.2;
        dir.position.set(-6, 1, 3);
        pt.color.setHex(0xb55a28);
        pt.intensity = 3.5;
        break;
      case 'nocturne':
      default:
        dir.color.setHex(0xc5a059);
        dir.intensity = 1.6;
        dir.position.set(4, 6, 5);
        pt.color.setHex(0xe5c378);
        pt.intensity = 2.6;
        break;
    }
  }, [activeLighting]);

  // Handle Wireframe Updates
  React.useEffect(() => {
    if (!coreMeshRef.current || !ring1Ref.current) return;
    const coreMat = coreMeshRef.current.material as THREE.Material & { wireframe?: boolean };
    const r1Mat = ring1Ref.current.material as THREE.Material & { wireframe?: boolean };
    if (coreMat) coreMat.wireframe = isWireframe;
    if (r1Mat) r1Mat.wireframe = isWireframe;
  }, [isWireframe]);

  return (
    <div
      className={`relative w-full rounded-2xl bg-card border border-[var(--dp-rule,rgba(197,160,89,0.3))] overflow-hidden shadow-2xl ${className}`}
      aria-label="Interactive 3D Celestial Tourbillon"
    >
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-[450px] sm:h-[560px] cursor-grab active:cursor-grabbing select-none"
      />

      {/* Top Overlay Badge & Header */}
      <div className="absolute top-6 left-6 right-6 flex items-start justify-between pointer-events-none">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-[var(--dp-gold,#c5a059)]/40 text-[10px] font-sans tracking-[0.2em] uppercase text-[var(--dp-gold,#c5a059)] font-medium">
            <Sparkles size={12} />
            <span>Interactive 3D Complication Simulator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-white tracking-tight drop-shadow-md">
            Tourbillon Céleste No. VIII
          </h3>
          <p className="text-xs text-white/70 font-sans max-w-sm drop-shadow">
            Click and drag to orbit three-axis armillary rings and observe refracted facet dispersion.
          </p>
        </div>

        {/* Diurnal Lighting Controls */}
        <div className="pointer-events-auto flex items-center gap-1 p-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 shadow-lg">
          {DIURNAL_LIGHT_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveLighting(p.id)}
              type="button"
              className={`px-3 py-1.5 rounded-full text-[10px] font-sans tracking-widest uppercase transition-all ${
                activeLighting === p.id
                  ? 'bg-[var(--dp-gold,#c5a059)] text-black font-semibold'
                  : 'text-white/70 hover:text-white'
              }`}
              title={p.description}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Instrumentation Bar */}
      <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-black/75 backdrop-blur-xl border border-white/10 text-xs text-white/90">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            type="button"
            className="p-2 rounded-full bg-[var(--dp-gold,#c5a059)] text-black hover:opacity-90 transition-opacity"
            aria-label={isPlaying ? 'Pause 3D rotation' : 'Resume 3D rotation'}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 font-mono text-[11px]">
            {[
              { label: '0.5x', val: 0.5 },
              { label: '1.0x', val: 1.0 },
              { label: '2.0x', val: 2.0 },
            ].map((spd) => (
              <button
                key={spd.label}
                onClick={() => setSpeedMultiplier(spd.val)}
                type="button"
                className={`px-2 py-1 rounded border text-[10px] transition-colors ${
                  speedMultiplier === spd.val
                    ? 'border-[var(--dp-gold,#c5a059)] bg-[var(--dp-gold,#c5a059)]/20 text-[var(--dp-gold,#c5a059)]'
                    : 'border-white/10 text-white/60 hover:text-white'
                }`}
              >
                {spd.label}
              </button>
            ))}
          </div>

          {/* Wireframe Inspector */}
          <button
            onClick={() => setIsWireframe(!isWireframe)}
            type="button"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded border text-[11px] font-sans transition-colors ${
              isWireframe
                ? 'border-[var(--dp-gold,#c5a059)] text-[var(--dp-gold,#c5a059)]'
                : 'border-white/10 text-white/70 hover:text-white'
            }`}
          >
            <Eye size={12} />
            <span>Wireframe</span>
          </button>
        </div>

        {/* Real-Time Mathematical Telemetry */}
        <div className="hidden md:flex items-center gap-6 text-[11px] text-white/60 font-mono">
          <span>Escapement: 18,000 vph</span>
          <span>•</span>
          <span>Refraction: IOR 2.42</span>
          <span>•</span>
          <span>Shader: ACES Filmic</span>
        </div>
      </div>
    </div>
  );
}
