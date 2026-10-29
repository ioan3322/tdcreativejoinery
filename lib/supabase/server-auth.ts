import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function hasSupabaseAuthConfig() {
  return Boolean(
    (process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL) &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export async function createSupabaseServerAuthClient() {
  if (!hasSupabaseAuthConfig()) {
    throw new Error("Supabase authentication credentials are not configured.");
  }

  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Server components cannot always mutate cookies; route handlers can.
          }
        },
      },
    },
  );
}
