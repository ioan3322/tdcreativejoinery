import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/data";

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number | string | null;
  image_url: string;
  description: string;
  tag: string | null;
};

export async function getCatalogProducts(): Promise<Product[]> {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) return [];
  const { data, error } = await getSupabaseServerClient().from("products").select("id,slug,name,category,price,image_url,description,tag").order("created_at", { ascending: false });
  if (error) {
    console.error("Supabase product catalog read failed:", error.message);
    return [];
  }
  return (data as ProductRow[]).map((product) => ({
    id: product.slug,
    name: product.name,
    category: product.category,
    price: product.price === null ? null : Number(product.price),
    image: product.image_url,
    description: product.description,
    tag: product.tag ?? undefined,
  }));
}
