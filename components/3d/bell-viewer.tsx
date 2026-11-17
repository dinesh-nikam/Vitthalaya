'use client';

import * as React from 'react';
import * as THREE from 'three';
import { Bell } from 'lucide-react';

/**
 * BellViewer — interactive 3D bronze temple bell.
 *
 * Physics: spring-damper pendulum model (dt-independent).
 * Acoustics: Web Audio 5-partial synthesis, struck only on swing peak
 *   (velocity sign-change past threshold) for realism.
 * Accessibility: canvas container is focusable (tabIndex=0, role=button),
 *   Enter/Space both ring the bell. Fallback button for reduced-motion.
 */
export function BellViewer() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const bellGroupRef = React.useRef<THREE.Group | null>(null);
  const clapperGroupRef = React.useRef<THREE.Group | null>(null);

  // Physics state kept as refs — read every rAF tick with no React re-renders.
  const swingAngleRef    = React.useRef(0);
  const swingVelocityRef = React.useRef(0);
  // Track previous velocity sign to detect zero-crossing (clapper strike)
  const prevVelocitySignRef = React.useRef(0);
  // Cooldown prevents rapid-fire chime spam (ms)
  const lastChimeTimeRef = React.useRef(0);

  // ── Web Audio bell synthesis ──────────────────────────────────────────────
  const playChime = React.useCallback(() => {
    const now = performance.now();
    if (now - lastChimeTimeRef.current < 300) return; // 300 ms cooldown
    lastChimeTimeRef.current = now;

    try {
      const CtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!CtxClass) return;

      const ctx = new CtxClass();
      const t = ctx.currentTime;
      const baseFreq = 261.63; // Middle C — Sa pitch

      // 5 partials: authentic Indian bronze bell resonance signature
      const partials: Array<{ ratio: number; decay: number; gain: number }> = [
        { ratio: 1.0, decay: 3.5, gain: 0.35 }, // Fundamental
        { ratio: 2.0, decay: 2.0, gain: 0.15 }, // Octave
        { ratio: 2.4, decay: 1.2, gain: 0.20 }, // Minor-third overtone (bell character)
        { ratio: 3.0, decay: 0.8, gain: 0.10 }, // Fifth
        { ratio: 4.2, decay: 0.4, gain: 0.08 }, // High shimmer
      ];

      // Spatial reverb via short delay
      const delay = ctx.createDelay(0.1);
      delay.delayTime.value = 0.055;
      const revGain = ctx.createGain();
      revGain.gain.value = 0.25;
      delay.connect(revGain);
      revGain.connect(ctx.destination);

      partials.forEach(({ ratio, decay, gain }) => {
        const osc = ctx.createOscillator();
        const env = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq * ratio, t);
        env.gain.setValueAtTime(gain, t);
        env.gain.exponentialRampToValueAtTime(0.0001, t + decay);
        osc.connect(env);
        env.connect(ctx.destination);
        env.connect(delay);
        osc.start(t);
        osc.stop(t + decay + 0.1);
      });
    } catch {
      // Audio autoplay policy or missing API — silent fallback
    }
  }, []);

  // ── Kick the pendulum ─────────────────────────────────────────────────────
  const kick = React.useCallback(() => {
    // Impulse in the direction that keeps energy building
    const addVel = swingAngleRef.current >= 0 ? 0.32 : -0.32;
    swingVelocityRef.current += addVel;
  }, []);

  // ── Three.js scene setup ──────────────────────────────────────────────────
  React.useEffect(() => {
    if (!containerRef.current) return;

    const width  = containerRef.current.clientWidth  || 300;
    const height = containerRef.current.clientHeight || 250;

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    // ── Bell geometry ───────────────────────────────────────────────────────
    const bellGroup = new THREE.Group();
    bellGroupRef.current = bellGroup;
    scene.add(bellGroup);

    const bronzeMat = new THREE.MeshStandardMaterial({
      color: 0xc8963e,
      roughness: 0.35,
      metalness: 0.85,
      flatShading: false,
    });
    const chainMat = new THREE.MeshStandardMaterial({
      color: 0x8a6524,
      roughness: 0.6,
      metalness: 0.7,
    });

    // Bell body — lathe profile
    const bellProfile: THREE.Vector2[] = [
      new THREE.Vector2(0,    1.8),
      new THREE.Vector2(0.4,  1.7),
      new THREE.Vector2(0.6,  1.5),
      new THREE.Vector2(0.7,  1.1),
      new THREE.Vector2(0.9,  0.5),
      new THREE.Vector2(1.2,  0.0),
      new THREE.Vector2(1.6, -0.6),
      new THREE.Vector2(1.8, -1.0),
      new THREE.Vector2(1.9, -1.2), // lip flare
      new THREE.Vector2(1.6, -1.2), // rim inner
      new THREE.Vector2(1.4, -0.8),
      new THREE.Vector2(1.0,  0.0),
      new THREE.Vector2(0.6,  0.8),
      new THREE.Vector2(0.3,  1.4),
      new THREE.Vector2(0,    1.5),
    ];
    const latheGeo = new THREE.LatheGeometry(bellProfile, 32);
    const bellMesh = new THREE.Mesh(latheGeo, bronzeMat);
    bellMesh.castShadow = true;
    bellMesh.receiveShadow = true;
    bellGroup.add(bellMesh);

    // Clapper assembly — hangs inside, provides visual strike cue
    const clapperGroup = new THREE.Group();
    clapperGroup.position.set(0, 1.2, 0);
    clapperGroupRef.current = clapperGroup;

    const rodGeo     = new THREE.CylinderGeometry(0.04, 0.04, 2.0, 8);
    const rodMesh    = new THREE.Mesh(rodGeo, chainMat);
    rodMesh.position.set(0, -1.0, 0);
    clapperGroup.add(rodMesh);

    const strikerGeo  = new THREE.SphereGeometry(0.3, 16, 16);
    const strikerMesh = new THREE.Mesh(strikerGeo, bronzeMat);
    strikerMesh.position.set(0, -2.1, 0);
    clapperGroup.add(strikerMesh);

    bellGroup.add(clapperGroup);

    // Hanging loop
    const loopGeo  = new THREE.TorusGeometry(0.25, 0.08, 8, 24);
    const loopMesh = new THREE.Mesh(loopGeo, bronzeMat);
    loopMesh.position.set(0, 2.0, 0);
    loopMesh.rotation.y = Math.PI / 2;
    bellGroup.add(loopMesh);

    // Chain
    const chainGeo  = new THREE.CylinderGeometry(0.06, 0.06, 1.5, 8);
    const chainMesh = new THREE.Mesh(chainGeo, chainMat);
    chainMesh.position.set(0, 2.9, 0);
    bellGroup.add(chainMesh);

    // ── Lighting ────────────────────────────────────────────────────────────
    const keyLight = new THREE.DirectionalLight(0xffeedd, 2.5);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffaa44, 2.0);
    rimLight.position.set(-4, -1, -3);
    scene.add(rimLight);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    // ── Animation loop ──────────────────────────────────────────────────────
    let animationId: number;
    const clock = new THREE.Clock();
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!prefersReducedMotion) {
        // Cap dt to avoid physics explosion after tab-switch
        const dt      = Math.min(clock.getDelta(), 0.05);
        const elapsed = clock.getElapsedTime();

        // Spring-damper: α = -k·θ − c·ω
        const k   = 7.5;   // spring stiffness
        const c   = 0.055; // damping coefficient
        const acc = -k * swingAngleRef.current - c * swingVelocityRef.current;
        swingVelocityRef.current += acc * dt;
        swingAngleRef.current    += swingVelocityRef.current;

        // Acoustic strike detection: velocity zero-crossing past min amplitude
        const velSign = Math.sign(swingVelocityRef.current);
        if (
          velSign !== 0 &&
          velSign !== prevVelocitySignRef.current &&
          Math.abs(swingAngleRef.current) > 0.06
        ) {
          playChime();
        }
        prevVelocitySignRef.current = velSign;

        // Apply to 3D objects
        bellGroup.rotation.z    = swingAngleRef.current;
        // Clapper lags the bell (inertia) — counter-rotates more slowly
        clapperGroup.rotation.z = -swingAngleRef.current * 1.4;
        // Gentle idle sway when at rest — bell breathes
        bellGroup.rotation.y    = Math.sin(elapsed * 0.4) * 0.12;
      }

      renderer.render(scene, camera);
    };

    animate();

    // ── Input handlers ──────────────────────────────────────────────────────
    const domElement = renderer.domElement;

    const onCanvasClick = () => kick();
    const onMouseEnter  = () => {
      // Gentle nudge on first hover if nearly still
      if (
        Math.abs(swingAngleRef.current) < 0.04 &&
        Math.abs(swingVelocityRef.current) < 0.02
      ) {
        swingVelocityRef.current = 0.1;
      }
    };
    // Keyboard: handled on the wrapper div (focusable, tabIndex=0)
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        kick();
      }
    };

    domElement.addEventListener('click', onCanvasClick);
    domElement.addEventListener('mouseenter', onMouseEnter);

    // ── Responsive resize ───────────────────────────────────────────────────
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 250;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Attach keyboard listener to the container div
    const container = containerRef.current;
    container.addEventListener('keydown', onKeyDown);

    // ── Cleanup ─────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationId);
      domElement.removeEventListener('click', onCanvasClick);
      domElement.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', handleResize);

      if (
        containerRef.current &&
        renderer.domElement.parentNode === containerRef.current
      ) {
        containerRef.current.removeChild(renderer.domElement);
      }
      chainGeo.dispose();
      loopGeo.dispose();
      latheGeo.dispose();
      rodGeo.dispose();
      strikerGeo.dispose();
      bronzeMat.dispose();
      chainMat.dispose();
      renderer.dispose();
    };
  }, [kick, playChime]);

  return (
    <div className="flex flex-col items-center gap-3">
      {/*
       * The wrapper div is the keyboard focus target — tabIndex=0 makes it
       * reachable via Tab; role=button communicates the interactive affordance.
       * Keydown is attached imperatively in useEffect so the listener has
       * direct access to physics refs without stale closure risk.
       */}
      <div
        ref={containerRef}
        tabIndex={0}
        role="button"
        aria-label="३डी घंटा — क्लिक किंवा Enter दाबा, नाद ऐका"
        className={[
          'w-full h-[250px] flex items-center justify-center',
          'cursor-pointer rounded outline-none',
          'focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)]',
          'motion-safe:active:scale-[0.98] motion-safe:transition-transform duration-100',
          'motion-reduce:transition-none',
        ].join(' ')}
      />

      {/* Fallback CTA — always visible; second interaction surface */}
      <button
        type="button"
        onClick={kick}
        className={[
          'inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full',
          'border border-[var(--dp-rule)] bg-[var(--dp-ground-well)]',
          'hover:border-[var(--dp-gold-celestial)] text-xs font-semibold',
          'text-[var(--dp-gold)] transition-colors',
          'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--dp-focus)]',
          'active:translate-y-px',
        ].join(' ')}
      >
        <Bell size={13} aria-hidden="true" />
        <span>घंटा नाद ऐका</span>
      </button>
    </div>
  );
}

export default BellViewer;
