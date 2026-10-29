"use client";

import Link from "next/link";
import { useCart } from "@/lib/store";
import { formatPrice, type Product } from "@/lib/data";

export default function ProductCard({ product }: { product: Product }) {
  const add = useCart((state) => state.add);
  return <article className="product-card"><Link href={`/magazin/${product.id}`}><div className="product-card-image" style={{ aspectRatio: "1 / 1", background: "#e8e2d9" }}><img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div></Link><div style={{ paddingTop: 14 }}><div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}><div><p style={{ margin: 0, fontSize: 15 }}>{product.name}</p><p style={{ margin: "6px 0 0", color: "#81786d", fontSize: 12 }}>{product.category}</p></div>{product.price ? <strong style={{ fontSize: 13 }}>{formatPrice(product.price)}</strong> : <span style={{ color: "#936c4d", fontSize: 12 }}>La ofertă</span>}</div>{product.price && <button onClick={() => add(product)} style={{ marginTop: 14, background: "none", border: 0, borderBottom: "1px solid #936c4d", padding: "0 0 4px", color: "#936c4d", cursor: "pointer", fontSize: 11, textTransform: "uppercase", letterSpacing: ".1em" }}>Adaugă în coș</button>}</div></article>;
}
