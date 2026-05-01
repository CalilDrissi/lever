import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";

/**
 * Landing — sticky nav + hero are live.
 *
 * The remaining sections (trusted-by, four pillars, "comment ça marche",
 * manifesto, security inverted, FAQ, final CTA, footer) are intentionally
 * deferred until the design tokens & components are validated on /styleguide
 * and against this hero, per the build order.
 */
export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
      </main>
    </>
  );
}
