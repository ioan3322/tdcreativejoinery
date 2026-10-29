import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import CartIndicator from "@/components/CartIndicator";

export const metadata: Metadata = {
  title: "TD Creative Joinery | Mobilier creat pentru spațiul tău",
  description: "Mobilier personalizat, proiectat și realizat cu atenție pentru fiecare detaliu.",
};

function Header() {
  return <header className="line site-header" style={{ background: "#f5f2ec" }}><div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 78 }}>
    <Link href="/" style={{ letterSpacing: ".08em", fontSize: 14, fontWeight: 600 }}>TD <span style={{ color: "#936c4d" }}>CREATIVE</span> JOINERY</Link>
    <nav className="desktop-only" style={{ display: "flex", gap: 28, fontSize: 12, letterSpacing: ".04em" }}><Link href="/">Acasă</Link><Link href="/portofoliu">Portofoliu</Link><Link href="/magazin">Magazin</Link><Link href="/despre-noi">Despre noi</Link></nav>
    <div style={{ display: "flex", gap: 16, alignItems: "center", fontSize: 12 }}><Link href="/contact">Contact</Link><Link href="/cos" style={{ borderBottom: "1px solid #25231f", paddingBottom: 3 }}>Coș <CartIndicator /></Link></div>
  </div></header>;
}
function Footer() { return <footer style={{ background: "#25231f", color: "#f5f2ec", marginTop: 100, padding: "58px 0 30px" }}><div className="container"><div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 40, paddingBottom: 50 }}><div><p style={{ letterSpacing: ".1em", fontSize: 14 }}>TD CREATIVE JOINERY</p><p style={{ color: "#aaa39a", maxWidth: 310, lineHeight: 1.7, fontSize: 14 }}>Mobilier cu caracter, proiectat pentru felul în care trăiești.</p></div><div><p className="eyebrow">Explorează</p><p><Link href="/portofoliu">Portofoliu</Link></p><p><Link href="/magazin">Magazin</Link></p><p><Link href="/despre-noi">Despre noi</Link></p></div><div><p className="eyebrow">Contact</p><p>hello@tdcreativejoinery.ro</p><p>+40 740 000 000</p><p>România</p></div></div><div className="line" style={{ borderColor: "#48443f", paddingTop: 20, color: "#aaa39a", fontSize: 12 }}>© {new Date().getFullYear()} TD Creative Joinery. Toate drepturile rezervate.</div></div></footer>; }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ro"><body><Header />{children}<Footer /></body></html>;
}
