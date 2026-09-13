"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { clamp, paddleOffset, reflect } from "@/lib/pong-math";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

const WIN = 11;
const PAPER = "#efece6";
const ACCENT = "#e04e2e"; // you
const COLD = "#35c4d6"; // the machine
const FAINT = "#3a3833";

/** "idle" matters: without it the match starts with nobody at the controls and
 *  a visitor arrives to a game they have already lost 11-0. */
type Phase = "idle" | "serve" | "play" | "over";
type Particle = { x: number; y: number; vx: number; vy: number; life: number; c: string };

type Game = {
  w: number;
  h: number;
  pw: number;
  ph: number;
  r: number;
  you: number;
  cpu: number;
  ballX: number;
  ballY: number;
  vx: number;
  vy: number;
  speed: number;
  base: number;
  serveAt: number;
  rally: number;
  /** Per-rally aiming error, so the machine is beatable but never sloppy in
   *  the same way twice. */
  cpuErr: number;
  trail: { x: number; y: number }[];
  parts: Particle[];
  shake: number;
  keyUp: boolean;
  keyDown: boolean;
  pointerY: number | null;
};

function serve(g: Game, dir: 1 | -1) {
  g.ballX = g.w / 2;
  g.ballY = g.h / 2;
  g.speed = g.base;
  g.rally = 0;
  g.trail = [];
  g.cpuErr = (Math.random() - 0.5) * g.ph;
  const angle = (Math.random() - 0.5) * Math.PI * 0.3;
  g.vx = dir * Math.cos(angle) * g.speed;
  g.vy = Math.sin(angle) * g.speed;
  g.serveAt = performance.now() + 900;
}

function draw(
  ctx: CanvasRenderingContext2D,
  g: Game,
  youY: number,
  cpuY: number,
  phase: Phase,
) {
  ctx.save();
  if (g.shake > 0.2) {
    ctx.translate((Math.random() - 0.5) * g.shake, (Math.random() - 0.5) * g.shake);
  }

  ctx.clearRect(-30, -30, g.w + 60, g.h + 60);

  // centre line
  ctx.strokeStyle = FAINT;
  ctx.lineWidth = 1;
  ctx.setLineDash([6, 12]);
  ctx.beginPath();
  ctx.moveTo(g.w / 2, 0);
  ctx.lineTo(g.w / 2, g.h);
  ctx.stroke();
  ctx.setLineDash([]);

  // ball trail
  const n = g.trail.length;
  for (let i = 0; i < n; i++) {
    const t = g.trail[i];
    ctx.globalAlpha = (i / n) * 0.4;
    ctx.fillStyle = COLD;
    ctx.beginPath();
    ctx.arc(t.x, t.y, g.r * (0.3 + (i / n) * 0.6), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // impact particles
  for (const p of g.parts) {
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.fillStyle = p.c;
    ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);
  }
  ctx.globalAlpha = 1;

  // paddles
  ctx.fillStyle = ACCENT;
  ctx.fillRect(30, youY, g.pw, g.ph);
  ctx.fillStyle = COLD;
  ctx.fillRect(g.w - 30 - g.pw, cpuY, g.pw, g.ph);

  // the ball is a packet, same diamond the rail uses
  ctx.save();
  ctx.translate(g.ballX, g.ballY);
  ctx.rotate(Math.PI / 4);
  ctx.fillStyle = COLD;
  ctx.shadowColor = COLD;
  ctx.shadowBlur = 18;
  ctx.fillRect(-g.r, -g.r, g.r * 2, g.r * 2);
  ctx.restore();

  if (phase === "serve") {
    ctx.globalAlpha = 0.45;
    ctx.fillStyle = PAPER;
    ctx.font = "500 12px ui-monospace, monospace";
    ctx.textAlign = "center";
    ctx.fillText("serving", g.w / 2, g.h / 2 - 44);
    ctx.globalAlpha = 1;
  }

  ctx.restore();
}

export function Pong() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);
  const reduce = usePrefersReducedMotion();
  // Mirrored through an effect, not assigned during render: the game loop
  // needs the current value without re-running the whole loop effect.
  const reduceRef = useRef(reduce);
  useEffect(() => {
    reduceRef.current = reduce;
  }, [reduce]);

  const [score, setScore] = useState({ you: 0, cpu: 0 });
  // Moving the pointer off the canvas used to leave the paddle frozen while
  // the machine farmed the score to 11. Stepping away now just pauses.
  const [standby, setStandby] = useState(false);
  const standbyRef = useRef(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");

  const setPhaseBoth = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  const reset = useCallback(() => {
    const g = gameRef.current;
    if (!g) return;
    g.you = 0;
    g.cpu = 0;
    setScore({ you: 0, cpu: 0 });
    serve(g, Math.random() > 0.5 ? 1 : -1);
    setPhaseBoth("serve");
  }, [setPhaseBoth]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const g: Game = {
      w: 0, h: 0, pw: 11, ph: 90, r: 7,
      you: 0, cpu: 0,
      ballX: 0, ballY: 0, vx: 0, vy: 0, speed: 0, base: 0,
      serveAt: 0, rally: 0, cpuErr: 0,
      trail: [], parts: [], shake: 0,
      keyUp: false, keyDown: false, pointerY: null,
    };
    gameRef.current = g;

    let youY = 0;
    let cpuY = 0;
    let raf = 0;
    let last = performance.now();
    let paused = false;

    const layout = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      g.w = rect.width;
      g.h = rect.height;
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      g.ph = clamp(g.h * 0.19, 56, 150);
      g.pw = clamp(g.w * 0.009, 9, 14);
      g.r = clamp(Math.min(g.w, g.h) * 0.014, 5, 9);
      g.base = Math.min(g.w, g.h) * 0.85;
      youY = clamp(youY || g.h / 2 - g.ph / 2, 0, g.h - g.ph);
      cpuY = clamp(cpuY || g.h / 2 - g.ph / 2, 0, g.h - g.ph);
      if (g.speed === 0) {
        // Park it. The first serve waits for the player.
        g.speed = g.base;
        g.ballX = g.w / 2;
        g.ballY = g.h / 2;
        g.vx = 0;
        g.vy = 0;
      }
    };

    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(canvas);

    const start = () => {
      if (phaseRef.current !== "idle") return;
      serve(g, Math.random() > 0.5 ? 1 : -1);
      setPhaseBoth("serve");
    };

    const onPointer = (e: PointerEvent) => {
      g.pointerY = e.clientY - canvas.getBoundingClientRect().top;
      setStandbyBoth(false);
      start();
    };
    const setStandbyBoth = (v: boolean) => {
      if (standbyRef.current === v) return;
      standbyRef.current = v;
      setStandby(v);
      if (!v) {
        last = performance.now();
        // Give the serve its full countdown back rather than firing instantly.
        if (phaseRef.current === "serve") g.serveAt = performance.now() + 600;
      }
    };

    const onLeave = () => {
      g.pointerY = null;
      if (phaseRef.current === "serve" || phaseRef.current === "play") {
        setStandbyBoth(true);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "w") g.keyUp = true;
      if (e.key === "ArrowDown" || e.key === "s") g.keyDown = true;
      if (g.keyUp || g.keyDown) setStandbyBoth(false);
      if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();
      if (phaseRef.current === "idle") start();
      if (phaseRef.current === "over" && (e.key === "Enter" || e.key === " ")) reset();
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "w") g.keyUp = false;
      if (e.key === "ArrowDown" || e.key === "s") g.keyDown = false;
    };
    const onVisibility = () => {
      paused = document.hidden;
      last = performance.now();
    };

    canvas.addEventListener("pointermove", onPointer);
    canvas.addEventListener("pointerleave", onLeave);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    document.addEventListener("visibilitychange", onVisibility);

    const burst = (x: number, y: number, count: number, c: string) => {
      if (reduceRef.current) return;
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = 60 + Math.random() * 260;
        g.parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, c });
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      if (paused || g.w === 0) return;
      if (standbyRef.current) {
        draw(ctx, g, youY, cpuY, phaseRef.current);
        return;
      }

      // --- player paddle ---
      if (g.pointerY !== null) {
        youY = clamp(g.pointerY - g.ph / 2, 0, g.h - g.ph);
      } else {
        const kb = (g.keyDown ? 1 : 0) - (g.keyUp ? 1 : 0);
        youY = clamp(youY + kb * g.h * 1.35 * dt, 0, g.h - g.ph);
      }

      // --- machine paddle ---
      // Tracks only while the ball is inbound, and its speed is capped, so it
      // cannot simply mirror the ball and become unbeatable.
      const cpuSpeed = g.h * (0.8 + 0.055 * Math.min(g.you, 6));
      const want =
        g.vx > 0 && phaseRef.current === "play"
          ? g.ballY + g.cpuErr - g.ph / 2
          : g.h / 2 - g.ph / 2;
      cpuY = clamp(
        cpuY + clamp(want - cpuY, -cpuSpeed * dt, cpuSpeed * dt),
        0,
        g.h - g.ph,
      );

      if (phaseRef.current === "serve" && now >= g.serveAt) setPhaseBoth("play");

      if (phaseRef.current === "play") {
        g.ballX += g.vx * dt;
        g.ballY += g.vy * dt;

        if (g.ballY - g.r < 0 && g.vy < 0) {
          g.ballY = g.r;
          g.vy *= -1;
          burst(g.ballX, g.ballY, 5, FAINT);
        }
        if (g.ballY + g.r > g.h && g.vy > 0) {
          g.ballY = g.h - g.r;
          g.vy *= -1;
          burst(g.ballX, g.ballY, 5, FAINT);
        }

        const youX = 30;
        const cpuX = g.w - 30 - g.pw;

        if (
          g.vx < 0 &&
          g.ballX - g.r <= youX + g.pw &&
          g.ballX >= youX - g.pw &&
          g.ballY >= youY &&
          g.ballY <= youY + g.ph
        ) {
          g.speed = Math.min(g.speed * 1.045, g.base * 2.15);
          const v = reflect(paddleOffset(g.ballY, youY, g.ph), 1, g.speed);
          g.vx = v.vx;
          g.vy = v.vy;
          g.ballX = youX + g.pw + g.r;
          g.rally++;
          g.shake = reduceRef.current ? 0 : 5;
          burst(g.ballX, g.ballY, 12, ACCENT);
        }

        if (
          g.vx > 0 &&
          g.ballX + g.r >= cpuX &&
          g.ballX <= cpuX + g.pw * 2 &&
          g.ballY >= cpuY &&
          g.ballY <= cpuY + g.ph
        ) {
          g.speed = Math.min(g.speed * 1.045, g.base * 2.15);
          const v = reflect(paddleOffset(g.ballY, cpuY, g.ph), -1, g.speed);
          g.vx = v.vx;
          g.vy = v.vy;
          g.ballX = cpuX - g.r;
          g.rally++;
          g.cpuErr = (Math.random() - 0.5) * g.ph * 1.5;
          g.shake = reduceRef.current ? 0 : 5;
          burst(g.ballX, g.ballY, 12, COLD);
        }

        if (g.ballX < -g.r * 4) {
          g.cpu++;
          setScore({ you: g.you, cpu: g.cpu });
          burst(0, g.ballY, 26, COLD);
          g.shake = reduceRef.current ? 0 : 14;
          if (g.cpu >= WIN) {
            setPhaseBoth("over");
          } else {
            serve(g, -1);
            setPhaseBoth("serve");
          }
        } else if (g.ballX > g.w + g.r * 4) {
          g.you++;
          setScore({ you: g.you, cpu: g.cpu });
          burst(g.w, g.ballY, 26, ACCENT);
          g.shake = reduceRef.current ? 0 : 14;
          if (g.you >= WIN) {
            setPhaseBoth("over");
          } else {
            serve(g, 1);
            setPhaseBoth("serve");
          }
        }

        if (!reduceRef.current) {
          g.trail.push({ x: g.ballX, y: g.ballY });
          if (g.trail.length > 14) g.trail.shift();
        }
      }

      for (let i = g.parts.length - 1; i >= 0; i--) {
        const p = g.parts[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 220 * dt;
        p.life -= dt * 1.7;
        if (p.life <= 0) g.parts.splice(i, 1);
      }
      g.shake = Math.max(0, g.shake - dt * 40);

      draw(ctx, g, youY, cpuY, phaseRef.current);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [setPhaseBoth, reset]);

  return (
    <div className="relative h-full w-full">
      <canvas
        ref={canvasRef}
        className="h-full w-full touch-none"
        aria-label="Pong. Move your paddle with the mouse, touch, or the arrow keys."
      />

      <div className="pointer-events-none absolute inset-x-0 top-5 flex justify-center gap-9 font-[family-name:var(--font-display)] text-[3rem] leading-none sm:text-[4.5rem]">
        <span style={{ color: ACCENT }}>{score.you}</span>
        <span className="text-paper/15">/</span>
        <span style={{ color: COLD }}>{score.cpu}</span>
      </div>

      {phase === "idle" ? (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 px-5 text-center">
          <p className="font-[family-name:var(--font-display)] text-[2rem] uppercase sm:text-[3rem]">
            Move to start
          </p>
          <p className="font-mono text-[12px] tracking-[0.1em] text-paper-dim">
            You are the red paddle. The packet is the ball.
          </p>
        </div>
      ) : null}

      {standby && phase !== "over" ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <p className="font-mono text-[12px] tracking-[0.18em] text-paper-dim uppercase">
            Paused. Move back in to continue.
          </p>
        </div>
      ) : null}

      {phase === "over" ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-ink/85 px-5 text-center">
          <p className="font-[family-name:var(--font-display)] text-[2.4rem] uppercase sm:text-[4rem]">
            {score.you > score.cpu ? "You win" : "The machine wins"}
          </p>
          <button
            onClick={reset}
            className="rounded-[4px] bg-paper px-5 py-3 text-[14px] font-medium text-ink transition-transform hover:brightness-95 active:translate-y-[1px]"
          >
            Play again
          </button>
        </div>
      ) : null}
    </div>
  );
}
