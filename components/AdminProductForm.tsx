"use client";

import { FormEvent, useState } from "react";

export default function AdminProductForm() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSaving(true); setMessage(""); setError("");
    const response = await fetch("/api/admin/products", { method: "POST", body: new FormData(form) });
    const result = await response.json() as { error?: string };
    if (!response.ok) setError(result.error ?? "Produsul nu a putut fi salvat.");
    else { setMessage("Produsul a fost adăugat."); form.reset(); }
    setSaving(false);
  }
  return <form onSubmit={submit} style={{ display: "grid", gap: 14, marginTop: 35 }}><input name="name" required placeholder="Nume produs" /><input name="slug" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="slug-produs" /><input name="category" required placeholder="Categorie" /><input name="price" type="number" min="0" step="0.01" placeholder="Preț în RON (opțional)" /><input name="tag" placeholder="Etichetă (opțional)" /><textarea name="description" required minLength={10} rows={6} placeholder="Descriere" /><input name="image" required type="file" accept="image/*" />{error && <p role="alert" style={{ color: "#a33d2f" }}>{error}</p>}{message && <p role="status" style={{ color: "#3f704a" }}>{message}</p>}<button className="btn dark" disabled={saving}>{saving ? "Se salvează..." : "Adaugă produsul"}</button></form>;
}
