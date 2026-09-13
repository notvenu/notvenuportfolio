import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { Facts } from "@/components/sections/facts";
import { Work } from "@/components/sections/work";
import { Stack } from "@/components/sections/stack";
import { About } from "@/components/sections/about";
import { Reading } from "@/components/sections/reading";
import { Hire } from "@/components/sections/hire";
import { Contact } from "@/components/sections/contact";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Facts />
        <Work />
        <Stack />
        <About />
        <Reading />
        <Hire />
      </main>
      <Contact />
    </>
  );
}
