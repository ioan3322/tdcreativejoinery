import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function hasSupabaseServerConfig() {
  return Boolean(supabaseUrl && supabaseServiceRoleKey);
}

export function getSupabaseServerClient() {
  if (!hasSupabaseServerConfig()) {
    throw new Error("Supabase server credentials are not configured.");
  }

  return createClient(supabaseUrl!, supabaseServiceRoleKey!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
