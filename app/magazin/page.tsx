import ProductCard from "@/components/ProductCard";
import { categories, products } from "@/lib/data";

export default function Shop() {
  return <main className="container" style={{ paddingTop: 80 }}><p className="eyebrow">Colecția TD</p><h1 style={{ fontSize: 64, margin: "18px 0 60px" }}>Magazin</h1><div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 40 }}>{categories.map((category, index) => <button key={category} className={`btn ${index === 0 ? "dark" : ""}`} style={{ padding: "10px 16px" }}>{category}</button>)}</div><div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "55px 24px" }}>{products.map((product) => <ProductCard key={product.id} product={product} />)}</div></main>;
}
