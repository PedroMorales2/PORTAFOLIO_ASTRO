import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, Torus } from "@react-three/drei";
import * as THREE from "three";

/**
 * Experiencia 3D del hero.
 * Núcleo distorsionado flotante + anillos orbitales + campo de partículas,
 * con parallax de mouse y rotación ligada al scroll.
 * Se pausa fuera del viewport y no se monta con reduced-motion o sin WebGL.
 */

const ACCENT = new THREE.Color("#6473f0");
const CYAN = new THREE.Color("#5cdfff");

function Particles({ count = 850 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribución esférica hueca alrededor del núcleo
      const r = 2.6 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      arr[i * 3 + 2] = r * Math.cos(phi) * 0.8;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.03;
    ref.current.rotation.x += delta * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#8b9dff"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Core() {
  const group = useRef<THREE.Group>(null);
  const scroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      scroll.current = Math.min(window.scrollY / window.innerHeight, 1.5);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    const g = group.current;
    // Parallax suave con el mouse + rotación ligada al scroll
    const targetX = state.pointer.y * 0.18 + scroll.current * 0.9;
    const targetY = state.pointer.x * 0.3 + state.clock.elapsedTime * 0.06;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 3, delta);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 3, delta);
    // El núcleo se aleja sutilmente al hacer scroll
    g.position.z = THREE.MathUtils.damp(g.position.z, -scroll.current * 1.2, 3, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, scroll.current * 0.6, 3, delta);
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.9}>
        {/* Núcleo orgánico */}
        <Icosahedron args={[1.15, 24]}>
          <MeshDistortMaterial
            color={ACCENT}
            emissive={new THREE.Color("#1a1f52")}
            roughness={0.18}
            metalness={0.85}
            distort={0.38}
            speed={1.7}
          />
        </Icosahedron>

        {/* Malla exterior de referencia */}
        <Icosahedron args={[1.75, 1]}>
          <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.07} />
        </Icosahedron>

        {/* Anillos orbitales */}
        <Torus args={[2.15, 0.012, 12, 120]} rotation={[Math.PI / 2.4, 0.4, 0]}>
          <meshBasicMaterial color="#8b9dff" transparent opacity={0.35} />
        </Torus>
        <Torus args={[2.55, 0.008, 12, 120]} rotation={[Math.PI / 1.9, -0.5, 0.3]}>
          <meshBasicMaterial color={CYAN} transparent opacity={0.18} />
        </Torus>
      </Float>
    </group>
  );
}

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function HeroScene() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!supportsWebGL()) return;
    setReady(true);
  }, []);

  // Pausa el render loop cuando el hero sale del viewport
  useEffect(() => {
    const el = wrapper.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry?.isIntersecting ?? true), {
      threshold: 0.02,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ready]);

  if (!ready) return null;

  return (
    <div ref={wrapper} className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.4], fov: 42 }}
        dpr={[1, 1.75]}
        frameloop={active ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 4, 5]} intensity={90} color="#8b9dff" />
        <pointLight position={[-5, -3, -4]} intensity={60} color="#5cdfff" />
        <pointLight position={[0, -4, 3]} intensity={30} color="#4be0c0" />
        <Core />
        <Particles />
        <fog attach="fog" args={["#05060b", 7, 14]} />
      </Canvas>
    </div>
  );
}
