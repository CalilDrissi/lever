import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { InboxPreview } from "@/components/sections/inbox-preview";
import { ProviderMarquee } from "@/components/sections/provider-marquee";
import { TrustedBy } from "@/components/sections/trusted-by";
import { Pillars } from "@/components/sections/pillars";
import { Showcase } from "@/components/sections/showcase";
import { How } from "@/components/sections/how";
import { Manifesto } from "@/components/sections/manifesto";
import { Security } from "@/components/sections/security";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Newsletter } from "@/components/sections/newsletter";
import { Footer } from "@/components/sections/footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <InboxPreview />
        <ProviderMarquee />
        <TrustedBy />
        <Pillars />
        <Showcase />
        <How />
        <Manifesto />
        <Security />
        <Pricing />
        <FAQ />
        <FinalCta />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
