import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Pong } from "@/components/pong";

export const metadata: Metadata = {
  title: "Playground - Pong",
  description: "One packet, two paddles, first to eleven.",
};

export default function PlaygroundPage() {
  return (
    <main className="flex h-[100dvh] flex-col overflow-hidden">
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-paper/10 px-5 py-4 md:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.1em] text-paper-dim transition-colors hover:text-paper"
        >
          <ArrowLeft size={14} weight="bold" />
          Back
        </Link>
        <p className="font-mono text-[11px] tracking-[0.14em] text-paper-faint uppercase">
          Mouse, touch or arrow keys. First to 11.
        </p>
      </header>

      <div className="relative min-h-0 flex-1">
        <Pong />
      </div>
    </main>
  );
}
