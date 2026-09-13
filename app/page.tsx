import { Nav } from "@/components/nav";
import { RequestRail } from "@/components/request-rail";
import { PanelCut } from "@/components/panel-cut";
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
      <RequestRail />
      <main>
        <Hero />
        <Facts />
        <PanelCut />
        <Work />
        <PanelCut flip />
        <Stack />
        <About />
        <PanelCut />
        <Reading />
        <Hire />
      </main>
      <Contact />
    </>
  );
}
