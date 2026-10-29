import { NextResponse } from "next/server";
import { getSupabaseServerClient, hasSupabaseServerConfig } from "@/lib/supabase/server";
import { createSupabaseServerAuthClient, hasSupabaseAuthConfig } from "@/lib/supabase/server-auth";

export const runtime = "nodejs";
const productsBucket = "Produse";

function isText(value: FormDataEntryValue | null): value is string {
  return typeof value === "string";
}

async function getAuthenticatedClient() {
  if (!hasSupabaseAuthConfig() || !hasSupabaseServerConfig()) return null;
  const auth = await createSupabaseServerAuthClient();
  const { data: { user } } = await auth.auth.getUser();
  return user ? getSupabaseServerClient() : null;
}

function getImagePath(imageUrl: string) {
  const marker = `/storage/v1/object/public/${productsBucket}/`;
  const path = imageUrl.split(marker)[1];
  return path ? decodeURIComponent(path) : null;
}

function getProductFields(form: FormData) {
  const name = form.get("name");
  const slug = form.get("slug");
  const category = form.get("category");
  const description = form.get("description");
  const priceValue = form.get("price");
  const tag = form.get("tag");
  const price = priceValue === "" || priceValue === null ? null : Number(priceValue);
  if (!isText(name) || !isText(slug) || !isText(category) || !isText(description) ||
      name.length < 2 || name.length > 150 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
      category.length < 2 || category.length > 80 || description.length < 10 || description.length > 5000 ||
      !Number.isFinite(price ?? 0) || (price !== null && price < 0)) {
    return null;
  }
  return { name, slug, category, description, price, tag: isText(tag) && tag ? tag : null };
}

export async function POST(request: Request) {
  const supabase = await getAuthenticatedClient();
  if (!supabase) return NextResponse.json({ error: "Autentificare necesară." }, { status: 401 });

  const form = await request.formData();
  const image = form.get("image");
  const fields = getProductFields(form);
  if (!fields || !(image instanceof File)) {
    return NextResponse.json({ error: "Completează toate câmpurile obligatorii." }, { status: 400 });
  }
  if (image.size === 0 || !image.type.startsWith("image/")) {
    return NextResponse.json({ error: "Datele produsului sau imaginea nu sunt valide." }, { status: 400 });
  }

  const extension = image.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${fields.slug}-${crypto.randomUUID()}.${extension}`;
  const upload = await supabase.storage.from(productsBucket).upload(path, await image.arrayBuffer(), { contentType: image.type, upsert: false });
  if (upload.error) {
    console.error("Supabase product image upload failed:", upload.error.message);
    return NextResponse.json({ error: `Imaginea nu a putut fi încărcată: ${upload.error.message}` }, { status: 500 });
  }
  const { data: publicUrl } = supabase.storage.from(productsBucket).getPublicUrl(path);
  const { error } = await supabase.from("products").insert({ ...fields, image_url: publicUrl.publicUrl });
  if (error) {
    await supabase.storage.from(productsBucket).remove([path]);
    console.error("Supabase product insert failed:", error.message);
    return NextResponse.json({ error: error.code === "23505" ? "Slug-ul există deja." : "Produsul nu a putut fi salvat." }, { status: 500 });
  }
  return NextResponse.json({ success: true }, { status: 201 });
}

export async function PATCH(request: Request) {
  const supabase = await getAuthenticatedClient();
  if (!supabase) return NextResponse.json({ error: "Autentificare necesară." }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  const form = await request.formData();
  const fields = getProductFields(form);
  const image = form.get("image");
  if (!id || !fields || (image && !(image instanceof File))) {
    return NextResponse.json({ error: "Datele produsului nu sunt valide." }, { status: 400 });
  }

  const { data: current, error: readError } = await supabase.from("products").select("image_url").eq("id", id).single();
  if (readError || !current) return NextResponse.json({ error: "Produsul nu a fost găsit." }, { status: 404 });

  let imageUrl = current.image_url;
  let newPath: string | null = null;
  if (image instanceof File && image.size > 0) {
    if (!image.type.startsWith("image/")) return NextResponse.json({ error: "Fișierul selectat nu este o imagine." }, { status: 400 });
    const extension = image.name.split(".").pop()?.toLowerCase() || "jpg";
    newPath = `${fields.slug}-${crypto.randomUUID()}.${extension}`;
    const upload = await supabase.storage.from(productsBucket).upload(newPath, await image.arrayBuffer(), { contentType: image.type, upsert: false });
    if (upload.error) return NextResponse.json({ error: `Imaginea nu a putut fi încărcată: ${upload.error.message}` }, { status: 500 });
    imageUrl = supabase.storage.from(productsBucket).getPublicUrl(newPath).data.publicUrl;
  }

  const { error } = await supabase.from("products").update({ ...fields, image_url: imageUrl, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) {
    if (newPath) await supabase.storage.from(productsBucket).remove([newPath]);
    console.error("Supabase product update failed:", error.message);
    return NextResponse.json({ error: error.code === "23505" ? "Slug-ul există deja." : "Produsul nu a putut fi actualizat." }, { status: 500 });
  }
  const oldPath = getImagePath(current.image_url);
  if (newPath && oldPath) await supabase.storage.from(productsBucket).remove([oldPath]);
  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const supabase = await getAuthenticatedClient();
  if (!supabase) return NextResponse.json({ error: "Autentificare necesară." }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Produsul nu a fost specificat." }, { status: 400 });
  const { data: product, error: readError } = await supabase.from("products").select("image_url").eq("id", id).single();
  if (readError || !product) return NextResponse.json({ error: "Produsul nu a fost găsit." }, { status: 404 });
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) {
    console.error("Supabase product delete failed:", error.message);
    return NextResponse.json({ error: "Produsul nu a putut fi șters." }, { status: 500 });
  }
  const imagePath = getImagePath(product.image_url);
  if (imagePath) await supabase.storage.from(productsBucket).remove([imagePath]);
  return NextResponse.json({ success: true });
}
