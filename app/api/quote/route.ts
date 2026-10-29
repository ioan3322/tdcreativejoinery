import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

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
  const phone = isString(payload.phone) ? payload.phone.trim() : "";
  const projectType = isString(payload.projectType) ? payload.projectType.trim() : "";
  const message = isString(payload.message) ? payload.message.trim() : "";
  if (name.length < 2 || name.length > 100 || message.length < 10 || message.length > 5000) return NextResponse.json({ error: "Completează numele și descrierea proiectului cu informații valide." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return NextResponse.json({ error: "Adresa de e-mail nu este validă." }, { status: 400 });
  if (phone.length > 50 || projectType.length > 100) return NextResponse.json({ error: "Datele opționale trimise nu sunt valide." }, { status: 400 });
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: "Formularul nu este activ încă. Configurează Supabase pentru salvarea solicitărilor." }, { status: 503 });
  }

  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("quote_requests").insert({
      name,
      email,
      phone: phone || null,
      project_type: projectType || null,
      message,
    });

    if (error) {
      console.error("Supabase quote request insert failed:", error.message);
      return NextResponse.json({ error: "Solicitarea nu a putut fi salvată. Încearcă din nou." }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Supabase configuration failed:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Serviciul de solicitări nu este disponibil momentan." }, { status: 503 });
  }
}
