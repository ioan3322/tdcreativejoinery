"use client";

import { FormEvent, useState } from "react";

export default function QuoteForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setError(null);
    setSubmitting(true);
    try {
      const response = await fetch("/api/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Solicitarea nu a putut fi trimisă.");
      setSent(true);
      form.reset();
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "A apărut o eroare. Încearcă din nou.");
    } finally {
      setSubmitting(false);
    }
  }
  if (sent) return <div style={{ padding: 30, background: "#e8eee6" }}><p className="eyebrow">Mulțumim</p><h3>Solicitarea ta a fost trimisă.</h3><p>Te vom contacta în cel mai scurt timp pentru a discuta proiectul.</p></div>;
  return <form onSubmit={submit} style={{ display: "grid", gap: 14 }}><input name="name" required minLength={2} placeholder="Nume și prenume" /><input name="email" required type="email" placeholder="Adresă de e-mail" /><input name="phone" placeholder="Telefon" /><select name="projectType" defaultValue=""><option value="" disabled>Tipul proiectului</option><option>Bucătărie</option><option>Dressing</option><option>Living</option><option>Alt tip de mobilier</option></select><textarea name="message" required minLength={10} placeholder="Spune-ne câteva lucruri despre proiectul tău" rows={5} />{error && <p role="alert" style={{ color: "#a33d2f", margin: 0 }}>{error}</p>}<button className="btn dark" type="submit" disabled={submitting}>{submitting ? "Se trimite..." : "Trimite solicitarea"}</button></form>;
}
