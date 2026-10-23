"use client";

import {
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
  type TargetAndTransition,
} from "motion/react";
import Image from "next/image";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { Project } from "@/data";

const ease = [0.22, 1, 0.36, 1] as const;

/** Whether the intro has handed off to the page. Hero animations wait on this instead of guessing timings. */
const IntroCtx = createContext({ done: true, finish: () => {} });
const useIntro = () => useContext(IntroCtx);

/** Starts on "show" once the intro is done (hero), otherwise when scrolled into view. */
function trigger(afterIntro: boolean | undefined, done: boolean, show: TargetAndTransition | string) {
  return afterIntro ? { animate: done ? show : undefined } : { whileInView: show, viewport: { once: true, margin: "0px 0px -10% 0px" } };
}

/** Honours the OS reduced-motion setting for every animation, and owns the intro state. */
export function Providers({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);
  // The head script marks reduced-motion visitors; they skip straight to the page.
  useEffect(() => void (document.documentElement.classList.contains("no-intro") && setDone(true)), []);
  return (
    <IntroCtx.Provider value={{ done, finish: () => setDone(true) }}>
      <MotionConfig reducedMotion="user">
        <LayoutGroup>{children}</LayoutGroup>
      </MotionConfig>
    </IntroCtx.Provider>
  );
}

// Where each client screenshot lands in the intro deck: x/y in "deck units" (see `u` in Intro), rotation in degrees.
const DECK = [
  { x: -30, y: 4, r: -12 },
  { x: -15, y: -1, r: -6 },
  { x: 0, y: -3, r: 0 },
  { x: 15, y: -1, r: 6 },
  { x: 30, y: 4, r: 12 },
];

/**
 * Plays on every load: a search for "notvenu" types itself, client sites deal in like results,
 * the portrait card drops on top, then morphs (shared layout) into the hero card as the deck scatters.
 * Click or Esc skips. A CSS failsafe hides it if JS never runs.
 */
export function Intro({ results, shots, portrait }: { results: number; shots: string[]; portrait: string }) {
  const { done, finish } = useIntro();
  const [phase, setPhase] = useState(0); // 0 search · 1 deck · 2 portrait
  // 1vw, but capped by height so the deck stays together on ultrawide and landscape-phone screens
  const u = typeof window === "undefined" ? 0 : Math.min(innerWidth, innerHeight * 1.6) / 100;
  useEffect(() => {
    if (done) return void (document.documentElement.style.overflow = "");
    document.documentElement.style.overflow = "hidden";
    const ids = [setTimeout(() => setPhase(1), 1350), setTimeout(() => setPhase(2), 2100), setTimeout(finish, 3000)];
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && finish();
    window.addEventListener("keydown", onKey);
    return () => (ids.forEach(clearTimeout), window.removeEventListener("keydown", onKey));
  }, [done, finish]);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="intro"
          className="intro"
          aria-hidden
          onClick={finish}
          initial={{ backgroundColor: "rgba(13,13,13,1)" }}
          exit={{ backgroundColor: "rgba(13,13,13,0)", transition: { duration: 0.8, ease } }}
        >
          <motion.div
            className="intro-search"
            animate={phase ? { y: "-28vh", scale: 0.8, opacity: 0.5 } : { y: 0, scale: 1, opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="intro-box">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
              <span className="intro-q">notvenu</span>
              <span className="intro-caret" />
            </div>
            <span className="intro-bar"><i /></span>
            <p className="intro-meta">About {results} results <span>(0.42 seconds)</span></p>
          </motion.div>

          <div className="intro-stage">
            {phase >= 1 &&
              shots.map((src, i) => (
                <motion.div
                  key={src}
                  className="intro-shot"
                  initial={{ x: DECK[i].x * 0.2 * u, y: "70vh", rotate: 0, opacity: 0 }}
                  animate={{ x: DECK[i].x * u, y: DECK[i].y * u, rotate: DECK[i].r, opacity: 1 }}
                  exit={{ x: DECK[i].x * 3.2 * u, y: (DECK[i].y * 4 + 30) * u, rotate: DECK[i].r * 2.5, opacity: 0, transition: { duration: 0.7, ease } }}
                  transition={{ type: "spring", stiffness: 140, damping: 18, delay: Math.abs(i - 2) * 0.07 }}
                >
                  <Image src={src} alt="" width={720} height={450} sizes="24vw" />
                </motion.div>
              ))}
            {phase >= 2 && (
              <motion.div
                layoutId="herocard"
                className="intro-card"
                style={{ borderRadius: 24 }}
                initial={{ y: "60vh", rotate: 8 }}
                animate={{ y: 0, rotate: -3 }}
                transition={{ type: "spring", stiffness: 160, damping: 20 }}
              >
                <span className="intro-card-name">venu</span>
                <Image src={portrait} alt="" width={757} height={913} sizes="280px" priority />
              </motion.div>
            )}
          </div>
          <p className="intro-skip">click to skip</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  return <motion.div className="progress" style={{ scaleX }} />;
}

/** Slides away while scrolling down, back on the way up. */
export function Nav({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setHidden(y > 240 && y > (scrollY.getPrevious() ?? 0)));
  return (
    <motion.header className="nav" initial={{ y: -80 }} animate={{ y: hidden ? -90 : 0 }} transition={{ duration: 0.5, ease }}>
      {children}
    </motion.header>
  );
}

export function FadeUp({
  children,
  delay = 0,
  className,
  as = "div",
  afterIntro,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
  afterIntro?: boolean;
}) {
  const M = motion[as];
  const { done } = useIntro();
  return (
    <M className={className} initial={{ opacity: 0, y: 32 }} {...trigger(afterIntro, done, { opacity: 1, y: 0 })} transition={{ duration: 0.8, ease, delay }}>
      {children}
    </M>
  );
}

/** Lines that slide up out of a mask, one after another. */
export function Lines({ lines, as = "h2", className, delay = 0, afterIntro }: { lines: React.ReactNode[]; as?: "h1" | "h2"; className?: string; delay?: number; afterIntro?: boolean }) {
  const Tag = motion[as];
  const { done } = useIntro();
  return (
    <Tag className={className} initial="hidden" {...trigger(afterIntro, done, "show")} transition={{ staggerChildren: 0.12, delayChildren: delay }}>
      {lines.map((l, i) => (
        <span key={i} className="line">
          <motion.span variants={{ hidden: { y: "105%" }, show: { y: 0, transition: { duration: 1, ease } } }}>{l}</motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** A highlighter stroke that swipes across the words once they're on screen, like a matched search term. */
export function Mark({ children, tone = "lime", delay = 0.6, afterIntro }: { children: React.ReactNode; tone?: "lime" | "blue" | "ink"; delay?: number; afterIntro?: boolean }) {
  const { done } = useIntro();
  return (
    <motion.mark
      className={`mark ${tone}`}
      initial={{ backgroundSize: "0% 100%" }}
      {...trigger(afterIntro, done, { backgroundSize: "100% 100%" })}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.mark>
  );
}

// "a *bold phrase*" -> words with a bold flag
function parseBold(text: string) {
  return text.split("*").flatMap((seg, i) => seg.split(" ").filter(Boolean).map((w) => ({ w, b: i % 2 === 1 })));
}

/**
 * A search box that types a query, "thinks", then streams an AI-overview style answer. Click to finish instantly.
 * The full query and answer are also in the HTML for crawlers and screen readers.
 */
export function Ask({ query, answer, children, afterIntro }: { query: string; answer: string; children?: React.ReactNode; afterIntro?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const { done: introDone } = useIntro();
  const inView = seen && (!afterIntro || introDone);
  const reduce = useReducedMotion();
  const words = parseBold(answer);
  const [typed, setTyped] = useState(0);
  const [thinking, setThinking] = useState(false);
  const [shown, setShown] = useState(0);
  const timers = useRef<number[]>([]);
  const done = shown >= words.length;

  const finish = () => {
    timers.current.forEach((id) => (clearInterval(id), clearTimeout(id)));
    setTyped(query.length);
    setThinking(false);
    setShown(words.length);
  };

  useEffect(() => {
    if (!inView) return;
    if (reduce) return finish();
    const ids = timers.current;
    const later = (fn: () => void, ms: number) => ids.push(window.setTimeout(fn, ms));
    // runs fn every ms until it returns true
    const every = (fn: () => boolean, ms: number) => {
      const id = window.setInterval(() => fn() && clearInterval(id), ms);
      ids.push(id);
    };
    later(() => {
      let t = 0;
      every(() => {
        setTyped(++t);
        if (t < query.length) return false;
        setThinking(true);
        later(() => {
          setThinking(false);
          let w = 0;
          every(() => (setShown(++w), w >= words.length), 28);
        }, 550);
        return true;
      }, 30);
    }, 300);
    return () => ids.forEach((id) => (clearInterval(id), clearTimeout(id)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);

  return (
    <div ref={ref} className="ask" onClick={done ? undefined : finish}>
      <div className="ask-bar">
        <svg viewBox="0 0 24 24" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
        <span className="ask-q">
          <span aria-hidden>{query.slice(0, typed)}</span>
          <span className="caret" aria-hidden />
          <span className="sr-only">{query}</span>
        </span>
        <kbd aria-hidden>↵</kbd>
      </div>
      <AnimatePresence>
        {(thinking || shown > 0) && (
          <motion.div className="ask-answer" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
            <p className="ask-label"><span className="spark">✦</span> AI overview</p>
            {thinking ? (
              <div className="shimmer" aria-hidden><i /><i /><i /></div>
            ) : (
              <p className="ask-text" aria-hidden>
                {words.slice(0, shown).map(({ w, b }, i) => (
                  <motion.span key={i} initial={{ opacity: 0, filter: "blur(4px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} className={b ? "hit" : undefined}>
                    {w}{" "}
                  </motion.span>
                ))}
              </p>
            )}
            {done && children && <div className="ask-extra">{children}</div>}
          </motion.div>
        )}
      </AnimatePresence>
      <p className="sr-only">{answer.replaceAll("*", "")}</p>
    </div>
  );
}

// `x` is measured from the left, or from the right when `right` is set, so chips never poke past the card.
const CHIPS = [
  { t: "● Available for projects", x: "4%", y: "6%", depth: 26, tone: "ink" },
  { t: "Next.js", x: "4%", y: "22%", depth: 46, tone: "", right: true },
  { t: "WordPress", x: "0%", y: "44%", depth: 38, tone: "" },
  { t: "SEO · AEO · GEO", x: "2%", y: "60%", depth: 58, tone: "blue", right: true },
  { t: "Razorpay", x: "8%", y: "74%", depth: 32, tone: "" },
];

/**
 * The hero is one big lime card: copy on the left, the cut-out portrait breaking out of the card's top edge,
 * a giant name behind the shoulders, chips floating at different depths. Pointer and scroll both add parallax.
 */
export function HeroCard({ src, alt, children }: { src: string; alt: string; children: React.ReactNode }) {
  const { done } = useIntro();
  const d = 0.4; // lets the card morph settle before the person rises
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 110, damping: 18 });
  const sy = useSpring(py, { stiffness: 110, damping: 18 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const personX = useTransform(sx, (v) => v * -18);
  const personY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const nameX = useTransform(sx, (v) => v * 30);
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  return (
    <motion.div
      ref={ref}
      className="hero-card"
      initial="hidden"
      animate={done ? "show" : "hidden"}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => (px.set(0), py.set(0))}
    >
      {/* Mounts when the intro ends and morphs out of the intro's portrait card (same layoutId). */}
      {done && (
        <motion.div layoutId="herocard" className="hc-bg" style={{ borderRadius: 36 }} transition={{ duration: 0.9, ease }}>
          <motion.span className="hc-name" aria-hidden style={{ x: nameX, y: nameY }}>
            <motion.span style={{ display: "block" }} variants={{ hidden: { y: "70%", opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 1.1, ease, delay: d + 0.4 } } }}>
              venu
            </motion.span>
          </motion.span>
        </motion.div>
      )}

      <div className="hc-copy">{children}</div>

      <div className="hc-art">
        <div className="hc-clip">
          <motion.div className="hc-person" style={{ x: personX, y: personY }}>
            <motion.div variants={{ hidden: { y: "30%", opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 1.3, ease, delay: d } } }}>
              <Image src={src} alt={alt} width={757} height={913} sizes="(min-width: 900px) 42vw, 90vw" priority />
            </motion.div>
          </motion.div>
        </div>
        {CHIPS.map((c, i) => (
          <FloatChip key={c.t} {...c} i={i} sx={sx} sy={sy} delay={d + 1 + i * 0.1} />
        ))}
        <motion.p className="hc-tag" variants={{ hidden: { opacity: 0, y: 14, rotate: -8 }, show: { opacity: 1, y: 0, rotate: -3, transition: { duration: 0.6, ease, delay: d + 1.5 } } }}>
          notvenu <span>freelance developer · India</span>
        </motion.p>
      </div>
    </motion.div>
  );
}

function FloatChip({ t, x, y, right, depth, tone, i, sx, sy, delay }: { t: string; x: string; y: string; right?: boolean; depth: number; tone: string; i: number; sx: MotionValue<number>; sy: MotionValue<number>; delay: number }) {
  const tx = useTransform(sx, (v) => v * depth);
  const ty = useTransform(sy, (v) => v * depth);
  return (
    <motion.span className="hc-chip-pos" style={{ [right ? "right" : "left"]: x, top: y, x: tx, y: ty }} aria-hidden>
      <motion.span
        className={`hc-chip ${tone}`}
        variants={{ hidden: { opacity: 0, scale: 0.4 }, show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 320, damping: 18, delay } } }}
      >
        <motion.span animate={{ y: [0, -7, 0] }} transition={{ duration: 3 + i * 0.45, repeat: Infinity, ease: "easeInOut" }} style={{ display: "block" }}>
          {t}
        </motion.span>
      </motion.span>
    </motion.span>
  );
}

const NEEDS = ["Website", "Online store", "Custom software", "SEO / AEO / GEO", "Not sure yet"];
const BUDGETS = ["Under ₹25k", "₹25k – ₹75k", "₹75k – ₹2L", "₹2L+", "Not sure"];

/** No backend: the brief is composed into a WhatsApp or email message the client sends themselves. */
export function Brief({ email, whatsapp }: { email: string; whatsapp: string }) {
  const [sent, setSent] = useState(false);
  const send = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const text = encodeURIComponent(
      [
        `Hi Venu, I'm ${d.get("name")}${d.get("business") ? ` from ${d.get("business")}` : ""}.`,
        `I need: ${d.get("need")}. Budget: ${d.get("budget")}.`,
        String(d.get("details") || ""),
      ]
        .filter(Boolean)
        .join("\n"),
    );
    const via = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value;
    window.open(via === "email" ? `mailto:${email}?subject=New%20project&body=${text}` : `${whatsapp}?text=${text}`, "_blank");
    setSent(true);
  };
  return (
    <form className="brief" onSubmit={send}>
      <p className="ask-label">Quick brief · takes 30 seconds</p>
      <div className="brief-row">
        <label>Your name<input name="name" required autoComplete="name" /></label>
        <label>Business or website<input name="business" autoComplete="organization" /></label>
      </div>
      <fieldset>
        <legend>What do you need?</legend>
        <div className="pills">
          {NEEDS.map((n, i) => (
            <label key={n} className="pill"><input type="radio" name="need" value={n} defaultChecked={i === 0} /><span>{n}</span></label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend>Rough budget</legend>
        <div className="pills">
          {BUDGETS.map((b, i) => (
            <label key={b} className="pill"><input type="radio" name="budget" value={b} defaultChecked={i === BUDGETS.length - 1} /><span>{b}</span></label>
          ))}
        </div>
      </fieldset>
      <label><span>Anything else? <span className="muted">(optional)</span></span><textarea name="details" rows={3} /></label>
      <div className="brief-send">
        <button className="btn" value="whatsapp">Send on WhatsApp →</button>
        <button className="btn ghost" value="email">Send by email</button>
      </div>
      <AnimatePresence>
        {sent && (
          <motion.p className="brief-ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} role="status">
            ✓ Your message is ready in the app that just opened. Hit send there.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

/** Floating WhatsApp button on phones, once the hero is out of view. */
export function FloatWhatsApp({ href }: { href: string }) {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 700));
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener"
          className="float-wa"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileTap={{ scale: 0.92 }}
        >
          WhatsApp me
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/** "Build": a page wireframe that assembles itself block by block. */
export function BuildDemo() {
  const blocks = ["nav", "hero", "cta", "c1", "c2", "c3"];
  return (
    <motion.div className="demo build" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-20% 0px" }} transition={{ staggerChildren: 0.14 }}>
      <div className="demo-chrome"><i /><i /><i /></div>
      <div className="wire">
        {blocks.map((b) => (
          <motion.span
            key={b}
            className={`w-${b}`}
            variants={{ hidden: { opacity: 0, scale: 0.85, y: 10 }, show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 20 } } }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/** "Rank": your site climbs a results page one spot at a time, holds at #1, then loops. */
export function RankDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? 4 : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => setStep((s) => (s + 1) % 8), 900);
    return () => clearInterval(id);
  }, [inView, reduce]);
  const others = ["r1", "r2", "r3", "r4"];
  const pos = Math.max(0, 4 - step);
  const order = [...others.slice(0, pos), "you", ...others.slice(pos)];
  return (
    <div ref={ref} className="demo rank">
      <ol>
        {order.map((k) => (
          <motion.li key={k} layout transition={{ type: "spring", stiffness: 300, damping: 28 }} className={k === "you" ? "you" : undefined}>
            {k === "you" ? (
              <>
                <b>yourbusiness.com</b>
                <span>The answer people were searching for</span>
              </>
            ) : (
              <>
                <i />
                <i />
              </>
            )}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

/** "Get cited": an assistant answers and names your business as the source. */
export function CiteDemo() {
  return (
    <motion.div className="demo chat" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-20% 0px" }} transition={{ staggerChildren: 0.5 }}>
      <motion.p className="bubble me" variants={pop}>Who&apos;s good for this near me?</motion.p>
      <motion.p className="bubble bot" variants={pop}>
        <b>Your Business</b> is a strong pick: clear prices, great reviews, open late.
      </motion.p>
      <motion.span className="source" variants={pop}>↗ yourbusiness.com</motion.span>
    </motion.div>
  );
}
const pop = { hidden: { opacity: 0, y: 12, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease } } };

/** Client sites in browser frames on a track that scrolls sideways as you scroll down (stacks vertically on small screens). */
export function WorkTrack({ items, children }: { items: Project[]; children: React.ReactNode }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const measure = () => (setWide(mq.matches), setDist(track.current ? track.current.scrollWidth - window.innerWidth : 0));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <section ref={section} id="work" className="work" style={wide ? { height: `calc(100vh + ${dist}px)` } : undefined}>
      <div className="work-sticky">
        <div className="wrap work-head">
          {children}
          <div className="work-bar" aria-hidden><motion.span style={{ width: bar }} /></div>
        </div>
        <motion.div ref={track} className="track" style={wide ? { x } : undefined}>
          {items.map((p, i) => (
            <article key={p.name} className="panel">
              <a href={p.url} target="_blank" rel="noopener" className="frame">
                <div className="frame-bar">
                  <i /><i /><i />
                  <span className="url"><span aria-hidden>🔒 </span>{p.url!.replace(/^https?:\/\//, "")}</span>
                </div>
                <div className="frame-shot">
                  <Image src={p.shot!} alt={`${p.name} homepage`} width={1440} height={900} sizes="(min-width: 900px) 52vw, 100vw" />
                </div>
              </a>
              <div className="panel-body">
                <p className="mono">0{i + 1} — {p.kind}</p>
                <h3>{p.name}</h3>
                <p className="summary">{p.summary}</p>
                <ul>
                  {p.did.slice(0, 3).map((d) => <li key={d}>{d}</li>)}
                </ul>
                <p className="mono muted">{p.stack.join(" / ")}</p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const TONES = ["blue", "lime", "ink"];

/** Projects without a URL render as plain rows instead of dead links. */
function Row({ href, ...rest }: React.HTMLAttributes<HTMLElement> & { href?: string }) {
  return href ? <a href={href} target="_blank" rel="noopener" {...rest} /> : <div tabIndex={0} {...rest} />;
}

/** Index of smaller projects; hovering a row floats a preview that trails the cursor. */
export function HoverList({ items }: { items: (Project & { group: string })[] }) {
  const [active, setActive] = useState<number | null>(null);
  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });
  const p = active === null ? null : items[active];
  return (
    <div className="hlist" onPointerMove={(e) => (x.set(e.clientX), y.set(e.clientY))} onPointerLeave={() => setActive(null)}>
      {items.map((it, i) => (
        <FadeUp key={it.name} delay={i * 0.05}>
          <Row
            href={it.url}
            className="hrow"
            onPointerEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
          >
            <span className="mono muted">{it.group}</span>
            <span className="hname">{it.name}</span>
            <span className="hkind">{it.kind}</span>
            <span className={`status ${it.status === "Live" ? "live" : ""}`}>{it.status}</span>
            <span className="harrow" aria-hidden>{it.url ? "↗" : ""}</span>
          </Row>
        </FadeUp>
      ))}
      <motion.div className="preview" style={{ x, y }} aria-hidden>
        <AnimatePresence mode="wait">
          {p && (
            <motion.div
              key={p.name}
              className={`preview-card ${p.shot ? "" : TONES[active! % 3]}`}
              initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease }}
            >
              {p.shot ? <Image src={p.shot} alt="" width={720} height={450} /> : <><b>{p.name}</b><span>{p.summary}</span></>}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/** Accordion that keeps answers in the DOM (good for answer engines) and animates their height. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-list">
      {items.map((f, i) => (
        <div key={f.q} className={`qa ${open === i ? "open" : ""}`}>
          <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{f.q}</span>
            <motion.span className="plus" animate={{ rotate: open === i ? 45 : 0 }} aria-hidden>+</motion.span>
          </button>
          <motion.div initial={false} animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }} transition={{ duration: 0.45, ease }} style={{ overflow: "hidden" }}>
            <p>{f.a}</p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

/** Client domains drifting sideways; scrolling speeds them up and flips their direction. */
export function Marquee({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-1500, 0, 1500], [-5, 0, 5], { clamp: false });
  const dir = useRef(1);
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);
  useAnimationFrame((_, delta) => {
    if (reduce) return;
    if (boost.get() < 0) dir.current = -1;
    else if (boost.get() > 0) dir.current = 1;
    const step = dir.current * -1.4 * (delta / 1000);
    base.set(base.get() + step + step * Math.abs(boost.get()));
  });
  return (
    <div className="marquee" aria-hidden>
      <motion.div style={{ x }}>
        {[...items, ...items].map((n, i) => (
          <span key={i}>{n} <i>↗</i></span>
        ))}
      </motion.div>
    </div>
  );
}

const wrap = (min: number, max: number, v: number) => ((((v - min) % (max - min)) + (max - min)) % (max - min)) + min;

/** Follows the pointer a little, then springs home. */
export function Magnetic({ children }: { children: React.ReactNode }) {
  const x = useSpring(0, { stiffness: 250, damping: 18 });
  const y = useSpring(0, { stiffness: 250, damping: 18 });
  return (
    <motion.span
      className="magnet"
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.4);
      }}
      onPointerLeave={() => (x.set(0), y.set(0))}
    >
      {children}
    </motion.span>
  );
}

/** Giant footer wordmark, letters rising in sequence, ending on a blinking cursor. */
export function Wordmark({ text }: { text: string }) {
  return (
    <motion.p className="wordmark" aria-hidden initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ staggerChildren: 0.06 }}>
      {[...text].map((c, i) => (
        <span key={i} className="line">
          <motion.span variants={{ hidden: { y: "100%" }, show: { y: 0, transition: { duration: 0.9, ease } } }}>{c}</motion.span>
        </span>
      ))}
      <span className="block-caret" />
    </motion.p>
  );
}

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button className="btn ghost" onClick={() => navigator.clipboard?.writeText(email).then(() => (setCopied(true), setTimeout(() => setCopied(false), 1600)))}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={String(copied)} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }}>
          {copied ? "Copied ✓" : "Copy email"}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{t || "--:--"} IST</span>;
}
