import QuoteForm from "@/components/QuoteForm";
import Reveal from "@/components/Reveal";

export const metadata = { title: "Solicită o ofertă | TD Creative Joinery" };

export default function QuotePage() {
  return <main className="container" style={{ padding: "90px 0" }}><div className="quote-layout"><Reveal><div><p className="eyebrow">Proiect personalizat</p><h1 style={{ fontSize: "clamp(3rem, 7vw, 5.8rem)", lineHeight: 1.02 }}>Hai să îi găsim spațiului tău forma <em>potrivită.</em></h1><p style={{ color: "#6e675e", lineHeight: 1.8, maxWidth: 450 }}>Trimite-ne câteva detalii despre proiect, iar noi revenim cu întrebările potrivite și pașii următori.</p></div></Reveal><Reveal delay={120}><QuoteForm /></Reveal></div></main>;
}
