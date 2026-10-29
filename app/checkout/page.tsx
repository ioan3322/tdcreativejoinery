import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function Checkout() { return <main className="container" style={{ padding: "80px 0" }}><Reveal><p className="eyebrow">Finalizare comandă</p><h1 style={{ fontSize: 60, margin: "18px 0 50px" }}>Date de <em>livrare.</em></h1><div style={{ maxWidth: 650 }}><p style={{ color: "#6e675e", lineHeight: 1.7 }}>Checkout-ul este pregătit pentru conectarea la Stripe și Supabase. Înainte de lansare, administratorul trebuie să configureze metodele de plată, taxele și livrarea.</p><Link href="/contact" className="btn dark">Solicită o ofertă în schimb</Link></div></Reveal></main>; }
