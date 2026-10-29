"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const { error: signInError } = await createSupabaseBrowserClient().auth.signInWithPassword({
      email: String(form.get("email")), password: String(form.get("password")),
    });
    if (signInError) setError("Datele de autentificare sunt incorecte.");
    else router.push("/admin");
  }
  return <main className="container" style={{ maxWidth: 520, padding: "90px 0" }}><p className="eyebrow">Administrare</p><h1>Intră în panoul de administrare</h1><form onSubmit={submit} style={{ display: "grid", gap: 14 }}><input name="email" type="email" required placeholder="E-mail" /><input name="password" type="password" required placeholder="Parolă" />{error && <p role="alert" style={{ color: "#a33d2f" }}>{error}</p>}<button className="btn dark" type="submit">Autentificare</button></form></main>;
}
