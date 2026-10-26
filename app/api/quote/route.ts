import { NextResponse } from "next/server";

type QuotePayload = { name?: unknown; email?: unknown; phone?: unknown; projectType?: unknown; message?: unknown };
const isString = (value: unknown): value is string => typeof value === "string";

export async function POST(request: Request) {
  let payload: QuotePayload;
  try {
    payload = await request.json() as QuotePayload;
  } catch {
    return NextResponse.json({ error: "Datele trimise nu sunt valide." }, { status: 400 });
  }
  const name = isString(payload.name) ? payload.name.trim() : "";
  const email = isString(payload.email) ? payload.email.trim() : "";
  const message = isString(payload.message) ? payload.message.trim() : "";
  if (name.length < 2 || name.length > 100 || message.length < 10 || message.length > 5000) return NextResponse.json({ error: "Completează numele și descrierea proiectului cu informații valide." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return NextResponse.json({ error: "Adresa de e-mail nu este validă." }, { status: 400 });
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "Formularul nu este activ încă. Configurează Supabase pentru salvarea solicitărilor." }, { status: 503 });
  }
  return NextResponse.json({ error: "Persistența Supabase trebuie conectată înainte de activarea formularului." }, { status: 503 });
}
