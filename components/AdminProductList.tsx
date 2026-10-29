"use client";

import { FormEvent, useState } from "react";

type AdminProduct = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number | string | null;
  image_url: string;
  description: string;
  tag: string | null;
};

export default function AdminProductList({ products: initialProducts }: { products: AdminProduct[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);

  async function update(event: FormEvent<HTMLFormElement>, id: string) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setSavingId(id); setError("");
    const response = await fetch(`/api/admin/products?id=${encodeURIComponent(id)}`, { method: "PATCH", body: formData });
    const result = await response.json() as { error?: string };
    if (!response.ok) setError(result.error ?? "Produsul nu a putut fi actualizat.");
    else {
      setProducts((current) => current.map((product) => product.id === id ? {
        ...product,
        name: String(formData.get("name")),
        slug: String(formData.get("slug")),
        category: String(formData.get("category")),
        price: formData.get("price") ? Number(formData.get("price")) : null,
        tag: String(formData.get("tag") || "") || null,
        description: String(formData.get("description")),
      } : product));
      setEditingId(null);
    }
    setSavingId(null);
  }

  async function remove(id: string) {
    if (!window.confirm("Sigur vrei să ștergi acest produs și imaginea lui?")) return;
    setSavingId(id); setError("");
    const response = await fetch(`/api/admin/products?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    const result = await response.json() as { error?: string };
    if (!response.ok) setError(result.error ?? "Produsul nu a putut fi șters.");
    else setProducts((current) => current.filter((product) => product.id !== id));
    setSavingId(null);
  }

  return <section style={{ marginTop: 70 }}><p className="eyebrow">Catalog existent</p><h2>Produse adăugate ({products.length})</h2>{error && <p role="alert" style={{ color: "#a33d2f" }}>{error}</p>}{products.length === 0 ? <p style={{ color: "#6e675e" }}>Nu există produse adăugate încă.</p> : <div style={{ display: "grid", gap: 20 }}>{products.map((product) => editingId === product.id ? <form key={product.id} onSubmit={(event) => update(event, product.id)} style={{ display: "grid", gap: 12, border: "1px solid var(--line)", padding: 20 }}><h3 style={{ margin: 0 }}>Editează {product.name}</h3><input name="name" required defaultValue={product.name} /><input name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" defaultValue={product.slug} /><input name="category" required defaultValue={product.category} /><input name="price" type="number" min="0" step="0.01" defaultValue={product.price ?? ""} /><input name="tag" defaultValue={product.tag ?? ""} /><textarea name="description" required minLength={10} rows={5} defaultValue={product.description} /><input name="image" type="file" accept="image/*" /><div style={{ display: "flex", gap: 10 }}><button className="btn dark" disabled={savingId === product.id}>{savingId === product.id ? "Se salvează..." : "Salvează"}</button><button type="button" className="btn" onClick={() => setEditingId(null)}>Anulează</button></div></form> : <article key={product.id} style={{ display: "grid", gridTemplateColumns: "120px 1fr auto", gap: 18, alignItems: "center", border: "1px solid var(--line)", padding: 14 }}><img src={product.image_url} alt={product.name} style={{ width: 120, height: 100, objectFit: "cover" }} /><div><h3 style={{ margin: 0 }}>{product.name}</h3><p style={{ margin: "6px 0", color: "#6e675e" }}>{product.category} · {product.price === null ? "La ofertă" : `${product.price} RON`}</p><p style={{ margin: 0, color: "#6e675e", fontSize: 13 }}>{product.description}</p></div><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><button className="btn" onClick={() => setEditingId(product.id)}>Editează</button><button className="btn" disabled={savingId === product.id} onClick={() => remove(product.id)}>Șterge</button></div></article>)}</div>}</section>;
}
