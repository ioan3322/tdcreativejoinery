import QuoteForm from "@/components/QuoteForm";

export const metadata = { title: "Solicită o ofertă | TD Creative Joinery" };

export default function QuotePage() {
  return <main className="container" style={{ padding: "90px 0" }}><div className="quote-layout"><div><p className="eyebrow">Proiect personalizat</p><h1 style={{ fontSize: "clamp(3rem, 7vw, 5.8rem)", lineHeight: 1.02 }}>Hai să îi găsim spațiului tău forma potrivită.</h1><p style={{ color: "#6e675e", lineHeight: 1.8, maxWidth: 450 }}>Trimite-ne câteva detalii despre proiect, iar noi revenim cu întrebările potrivite și pașii următori.</p></div><QuoteForm /></div></main>;
}
