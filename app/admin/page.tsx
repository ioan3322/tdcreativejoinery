import { redirect, unstable_rethrow } from "next/navigation";
import { createSupabaseServerAuthClient, hasSupabaseAuthConfig } from "@/lib/supabase/server-auth";
import AdminProductForm from "@/components/AdminProductForm";
import AdminProductList from "@/components/AdminProductList";
import { getSupabaseServerClient, hasSupabaseServerConfig } from "@/lib/supabase/server";

export default async function AdminPage() {
  if (!hasSupabaseAuthConfig() || !hasSupabaseServerConfig()) {
    return <main className="container" style={{ maxWidth: 900, padding: "80px 0" }}><p className="eyebrow">Administrare</p><h1>Panoul de administrare nu este configurat</h1><p style={{ color: "#6e675e", lineHeight: 1.7 }}>Configurează credențialele Supabase în variabilele de mediu ale aplicației, apoi reîncarcă pagina.</p></main>;
  }

  try {
    const auth = await createSupabaseServerAuthClient();
    const authResult = await auth.auth.getUser();
    if (authResult.error) {
      logAdminError("Supabase admin authentication failed", authResult.error);
      return <AdminUnavailable />;
    }
    const user = authResult.data.user;
    if (!user) redirect("/admin/login");

    const { data: products, error } = await getSupabaseServerClient().from("products").select("id,slug,name,category,price,image_url,description,tag").order("created_at", { ascending: false });
    if (error) {
      console.error("Supabase admin product list failed:", error.message);
      return <AdminUnavailable />;
    }
    return <main className="container" style={{ maxWidth: 900, padding: "80px 0" }}><p className="eyebrow">Administrare produse</p><h1>Gestionează magazinul</h1><p style={{ color: "#6e675e", lineHeight: 1.7 }}>Adaugă, editează sau elimină produsele din catalog.</p><AdminProductForm /><AdminProductList products={products ?? []} /></main>;
  } catch (error) {
    unstable_rethrow(error);
    logAdminError("Admin page render failed", error);
    return <AdminUnavailable />;
  }
}

function logAdminError(context: string, error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`${context}: ${message}`);
}

function AdminUnavailable() {
  return <main className="container" style={{ maxWidth: 900, padding: "80px 0" }}><p className="eyebrow">Administrare</p><h1>Panoul de administrare nu este disponibil</h1><p style={{ color: "#6e675e", lineHeight: 1.7 }}>Serviciul de administrare nu a putut fi contactat. Verifică variabilele Supabase și încearcă din nou.</p></main>;
}
