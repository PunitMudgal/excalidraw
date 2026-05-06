import {
  Header,
  Hero,
  Features,
  Collaboration,
  Pricing,
  Footer,
} from "@/components/homepage";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Header />
      <Hero />
      <Features />
      <Collaboration />
      <Pricing />
      <Footer />
    </main>
  );
}
