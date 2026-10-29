import ProductCard from "@/components/ProductCard";
import { getCatalogProducts } from "@/lib/catalog";
import Reveal from "@/components/Reveal";

export const dynamic = "force-dynamic";
export default async function Shop() {
  const products = await getCatalogProducts();
  const categories = ["Toate", ...Array.from(new Set(products.map((product) => product.category)))];
  return <main className="container" style={{ paddingTop: 80 }}><Reveal><p className="eyebrow">Colecția TD</p><h1 style={{ fontSize: 64, margin: "18px 0 60px" }}>Magazin <em className="accent-text">cu caracter.</em></h1><div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 40 }}>{categories.map((category, index) => <button key={category} className={`btn ${index === 0 ? "dark" : ""}`} style={{ padding: "10px 16px" }}>{category}</button>)}</div></Reveal><div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "55px 24px" }}>{products.map((product, index) => <Reveal key={product.id} delay={(index % 3) * 80}><ProductCard product={product} /></Reveal>)}</div></main>;
}
