"use client";

import { useEffect } from "react";

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Admin route error:", error);
  }, [error]);

  return <main className="container" style={{ maxWidth: 900, padding: "80px 0" }}><p className="eyebrow">Administrare</p><h1>Panoul de administrare nu este disponibil</h1><p style={{ color: "#6e675e", lineHeight: 1.7 }}>A apărut o eroare la încărcarea panoului. Încearcă din nou.</p><button className="btn dark" onClick={() => reset()}>Reîncearcă</button></main>;
}
