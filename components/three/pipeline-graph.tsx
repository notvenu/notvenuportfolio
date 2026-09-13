"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
// Deep imports: drei's barrel pulls the entire library into the bundle.
import { Html } from "@react-three/drei/web/Html";
import { Line } from "@react-three/drei/core/Line";
import * as THREE from "three";
import { pipeEdges, pipeNodes } from "@/data/stack";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const ACCENT = "#e04e2e";
const PAPER = "#ece9e3";

const positions = new Map(
  pipeNodes.map((n) => [n.id, new THREE.Vector3(...n.pos)]),
);

function Node({ node, reduce }: { node: (typeof pipeNodes)[number]; reduce: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const isEntry = node.id === "client";

  useFrame(({ clock }) => {
    if (reduce || !ref.current) return;
    // Each node breathes on its own offset so the cluster never pulses in unison.
    const t = clock.elapsedTime + node.pos[0];
    ref.current.rotation.x = t * 0.12;
    ref.current.rotation.y = t * 0.18;
  });

  return (
    <group position={node.pos}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[isEntry ? 0.34 : 0.26, 0]} />
        <meshBasicMaterial
          color={isEntry ? ACCENT : PAPER}
          wireframe
          transparent
          opacity={isEntry ? 0.9 : 0.42}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[isEntry ? 0.09 : 0.06, 12, 12]} />
        <meshBasicMaterial color={isEntry ? ACCENT : PAPER} />
      </mesh>
      {/* Offset below the node so the label never sits on the mesh. */}
      <Html center position={[0, -0.52, 0]} distanceFactor={9} zIndexRange={[10, 0]}>
        <span className="pointer-events-none select-none whitespace-nowrap font-mono text-[11px] tracking-[0.12em] text-paper-dim">
          {node.label}
        </span>
      </Html>
    </group>
  );
}

/** One packet per edge. This is the whole point of the graph: a request
 *  visibly travelling through the services listed on the page. */
function Packet({ from, to, offset, reduce }: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  offset: number;
  reduce: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = reduce ? 0.5 : (clock.elapsedTime * 0.28 + offset) % 1;
    ref.current.position.lerpVectors(from, to, t);
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    // Fade in and out at the ends so packets do not pop at the nodes.
    mat.opacity = reduce ? 0.8 : Math.sin(t * Math.PI) * 0.95;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.055, 8, 8]} />
      <meshBasicMaterial color={ACCENT} transparent />
    </mesh>
  );
}

function Scene({ reduce }: { reduce: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { viewport, size } = useThree();
  const target = useRef({ x: 0, y: 0 });

  const edges = useMemo(
    () =>
      pipeEdges.map(([a, b], i) => ({
        a: positions.get(a)!,
        b: positions.get(b)!,
        offset: i / pipeEdges.length,
      })),
    [],
  );

  // Pointer parallax written straight to the object, never through React state.
  useFrame(({ pointer, clock }) => {
    if (!group.current) return;
    if (reduce) {
      group.current.rotation.set(0, 0, 0);
      return;
    }
    target.current.x = pointer.y * 0.18;
    target.current.y = pointer.x * 0.3 + Math.sin(clock.elapsedTime * 0.15) * 0.12;
    group.current.rotation.x += (target.current.x - group.current.rotation.x) * 0.04;
    group.current.rotation.y += (target.current.y - group.current.rotation.y) * 0.04;
  });

  // Fit the graph to narrow viewports instead of letting it crop.
  const scale = size.width < 768 ? Math.max(0.6, viewport.width / 12) : 1.0;

  return (
    <group ref={group} scale={scale}>
      {edges.map((e, i) => (
        <Line
          key={i}
          points={[e.a, e.b]}
          color={PAPER}
          transparent
          opacity={0.16}
          lineWidth={1}
        />
      ))}
      {edges.map((e, i) => (
        <Packet key={`p${i}`} from={e.a} to={e.b} offset={e.offset} reduce={reduce} />
      ))}
      {pipeNodes.map((n) => (
        <Node key={n.id} node={n} reduce={reduce} />
      ))}
    </group>
  );
}

export default function PipelineGraph() {
  const reduce = usePrefersReducedMotion();

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 13], fov: 44 }}
      frameloop={reduce ? "demand" : "always"}
    >
      <Scene reduce={reduce} />
    </Canvas>
  );
}
