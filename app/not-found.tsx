import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-[1400px] flex-col justify-center px-5 md:px-10">
      <p className="font-mono text-[12px] tracking-[0.16em] text-accent uppercase">404</p>
      <h1 className="mt-5 max-w-[16ch] text-[2.2rem] leading-[1.05] font-medium tracking-[-0.03em] sm:text-[3.2rem]">
        This route was never defined.
      </h1>
      <p className="mt-5 max-w-[48ch] text-[15px] leading-relaxed text-paper-dim">
        Nothing lives at this path. The endpoints that do work are back on the
        home page.
      </p>
      <Link
        href="/"
        className="mt-9 inline-flex w-fit items-center rounded-[4px] bg-paper px-5 py-3 text-[14px] font-medium text-ink transition-transform hover:brightness-95 active:translate-y-[1px]"
      >
        Back to start
      </Link>
    </main>
  );
}
