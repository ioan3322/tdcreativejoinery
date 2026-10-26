"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/data";
import { useCart } from "@/lib/store";

export default function Cart() {
  const { items, remove, setQuantity } = useCart();
  const total = items.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0);
  return <main className="container" style={{ padding: "80px 0" }}><p className="eyebrow">Comanda ta</p><h1 style={{ fontSize: 64, margin: "18px 0 55px" }}>Coș</h1>{items.length === 0 ? <div style={{ padding: "60px 0", borderTop: "1px solid #dfd9cf" }}><p>Coșul tău este gol.</p><Link className="btn dark" href="/magazin">Descoperă colecția</Link></div> : <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 70 }}><div>{items.map((item) => <div key={item.id} className="line" style={{ display: "grid", gridTemplateColumns: "120px 1fr auto", gap: 18, padding: "20px 0", alignItems: "center" }}><img src={item.image} alt="" style={{ width: 120, height: 100, objectFit: "cover" }} /><div><p style={{ margin: 0 }}>{item.name}</p><p style={{ color: "#81786d", fontSize: 13 }}>{formatPrice(item.price ?? 0)}</p><div style={{ display: "flex", gap: 10, alignItems: "center" }}><button onClick={() => setQuantity(item.id, item.quantity - 1)}>-</button><span>{item.quantity}</span><button onClick={() => setQuantity(item.id, item.quantity + 1)}>+</button></div></div><button onClick={() => remove(item.id)} style={{ border: 0, background: "none", cursor: "pointer" }}>Șterge</button></div>)}</div><aside style={{ background: "#e9e4db", padding: 30, height: "fit-content" }}><p className="eyebrow">Sumar</p><div style={{ display: "flex", justifyContent: "space-between", margin: "25px 0" }}><span>Subtotal</span><strong>{formatPrice(total)}</strong></div><p style={{ fontSize: 12, color: "#81786d" }}>Costul livrării este calculat după confirmarea adresei.</p><Link href="/checkout" className="btn dark" style={{ width: "100%", marginTop: 16 }}>Continuă comanda</Link></aside></div>}</main>;
}
